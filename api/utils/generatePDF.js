const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");
const crypto = require("crypto");
const {
  S3Client,
  // GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const fs = require("fs");

const assetUrl = process.env.ASSET_URL;
console.log("assets", assetUrl);

const s3 = new S3Client({});

const generatePDF = async (html, options) => {
  console.log("START");
  if (!options) options = {};
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      process.env.CHROMIUM_TAR_SOURCE
    ),
    headless: true,
    ignoreHTTPSErrors: true,
  });
  console.log("launched");
  const page = await browser.newPage();
  page.on("console", (message) => console.log(message.text()));
  const fullPageHTML = `
        <head>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="${assetUrl}/styles/utilities.css" />
            <link rel="stylesheet" href="${assetUrl}/styles/index.css" />
            <link rel="stylesheet" href="${assetUrl}/styles/mdb.min.css" />
            <title>PDF</title>
            <style>
                body {
                  font-family: Roboto, Helvetica, Arial, sans-serif;
                }
                  @media print {
                  .page-break {page-break-after: always;}
                }
            </style>
        </head>
        <body>
            ${html}
        </body>
    `;
  const hash = crypto
    .createHash("md5")
    .update(fullPageHTML + new Date().toISOString())
    .digest("hex");
  // console.log(fullPageHTML);
  const Key = process.env.PDF_FOLDER + "/" + hash + ".pdf";
  // console.log(Key);
  await page.setJavaScriptEnabled(true);
  page.on("console", (message) => console.log(message.text()));
  await page.setContent(fullPageHTML, {
    waitLoad: true,
    waitNetworkIdle: true,
  });
  console.log("loaded");
  const data_uint8 = await page.pdf({
    timeout: 300000000,
    format: "A4",
    printBackground: true,
    margin: {
      top: "1in",
      right: "1in",
      bottom: "1in",
      left: "1in",
    },
    ...options,
    // timeout: 300000000,
    // format: "A4",
    // printBackground: true,
    // margin: {
    //   top: "1in",
    //   right: "0.5in",
    //   bottom: "1in",
    //   left: "0.5in",
    // },
  });
  browser.close();
  console.log("res", data_uint8);
  // fs.writeFileSync("/home/bernard/Documents/work/sg/test.pdf", data_uint8);
  const buffer = Buffer.from(data_uint8);
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.ASSET_BUCKET,
      Key,
      ContentType: "application/pdf",
      Body: buffer,
      ACL: "public-read",
    })
  );
  console.log("s3");
  // const getObjectCommand = new GetObjectCommand({
  //   Bucket: process.env.ASSET_BUCKET,
  //   Key,
  // });
  // const signedUrl = await getSignedUrl(s3, getObjectCommand, {
  //   expiresIn: 3600,
  // });
  return Key;
};

module.exports = generatePDF;
