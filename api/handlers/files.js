const generatePDF = require("../utils/generatePDF");
const {
  putFile,
  getFilesByUserId,
  deleteFile,
  getFile,
} = require("../utils/dynamo");
const { delinquency_notice, statement, receipt } = require("../utils/html");
const {
  delinquency_notice_schema,
  statement_schema,
  receipt_schema,
} = require("../utils/validations");
const { v4: uuid } = require("uuid");
const { normalizeEventBody } = require("../utils/methods");

/**
 * POST /files
 *
 * body:
 * * category: "delinquency_notice" | "statement" | "receipt"
 * * values: DelinquencyNoticeFormValues | StatementFormValues | ReceiptFormValues *See: /ui/src/lib/createTypes
 *
 * Generates html from template and supplied values
 * Generates PDF using puppeteer then writes to S3
 * Inserts file data into DynamoDB
 * Returns the file object
 *
 */
const files_post = async (event, context, cb) => {
  event.body = normalizeEventBody(event.body);
  const { category, values } = event.body;

  try {
    let html;
    // HTML
    switch (category) {
      case "delinquency_notice":
        delinquency_notice_schema.validateSync(values);
        html = delinquency_notice(values);
        break;
      case "statement":
        statement_schema.validateSync(values);
        html = statement(values);
        break;
      case "receipt":
        receipt_schema.validateSync(values);
        html = receipt(values);
        break;
      default:
        console.log(event.body);
        throw "OOB category";
    }
    const key = await generatePDF(html);
    const userId = uuid(); //temp
    const file = await putFile({
      userId,
      category: category,
      key,
      formValues: JSON.stringify(values),
    });
    console.log(file);
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        file: {
          id: file.id.S,
          userId: file.userId.S,
          category: file.category.S,
          key: file.key.S,
          timestamp: file.timestamp.S,
          formValues: file.formValues.S,
        },
      }),
    });
  } catch (err) {
    console.log(err, "err files_post");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

/**
 * PATCH /files/{patchId}
 *
 * body:
 * * category: "delinquency_notice" | "statement" | "receipt"
 * * values: DelinquencyNoticeFormValues | StatementFormValues | ReceiptFormValues *See: ui/src/lib/createTypes
 *
 * Generates html from template and supplied values
 * Generates PDF using puppeteer then writes to S3
 * Updates DynamoDB entry
 * Returns the updated file object
 *
 * Does not delete the old file
 */

const files_patch = async (event, context, cb) => {
  event.body = normalizeEventBody(event.body);
  const { category, values } = event.body;

  try {
    let html;
    switch (category) {
      case "delinquency_notice":
        delinquency_notice_schema.validateSync(values);
        html = delinquency_notice(values);
        break;
      case "statement":
        statement_schema.validateSync(values);
        html = statement(values);
        break;
      case "receipt":
        receipt_schema.validateSync(values);
        html = receipt(values);
        break;
      default:
        console.log(event.body);
        throw "OOB category";
    }
    const key = await generatePDF(html);
    const userId = uuid(); //temp
    const file = await putFile({
      id: event.pathParameters.patchId,
      userId,
      category: category,
      key,
      formValues: JSON.stringify(values),
    });
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        file: {
          id: file.id.S,
          userId: file.userId.S,
          category: file.category.S,
          key: file.key.S,
          timestamp: file.timestamp.S,
          formValues: file.formValues.S,
        },
      }),
    });
  } catch (err) {
    console.log(err, "err files_patch");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

/**
 * DELETE /files/{patchId}
 *
 * Deletes the file from S3
 * Deletes the file from Dynamo
 */
const files_delete = async (event, context, cb) => {
  const deleteId = event.pathParameters.deleteId;
  try {
    const file = await getFile(deleteId);
    await deleteFile(deleteId, file.key.S);
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.log(err, "err files_delete");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

module.exports = {
  files_post,
  files_patch,
  files_delete,
};
