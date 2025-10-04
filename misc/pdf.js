const fs = require("fs");

const categories = ["delinquency_notice", "statement", "receipt"];

fs.writeFileSync(
  __dirname + "/pdfs.json",
  JSON.stringify(
    fs.readdirSync("/home/bernard/Documents/misc/pdfs").map((file, index) => ({
      id: index + 1,
      category: categories[Math.floor(Math.random() * categories.length)],
      key: file,
      timestamp: new Date().toISOString(),
    }))
  )
);
