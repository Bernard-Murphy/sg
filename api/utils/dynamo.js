const {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  DeleteItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { v4: uuid } = require("uuid");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const filesTable = process.env.DYNAMO_FILES_TABLE;

const client = new DynamoDBClient({});
const s3 = new S3Client({});

/**
 * Upserts a file entry to dynamo, and writes the file to s3.
 * If it is updating an existing entry, the old file will still exist.
 *
 * @param {string} id
 * @param {string} userId
 * @param {"delinquency_notice" | "statement" | "receipt"} category
 * @param {string} key // AWS s3 Key
 * @param {DelinquencyNoticeFormValues | StatementFormValues | ReceiptFormValues} formValues // See: /ui/src/lib/createTypes
 * @returns Dynamo entry
 */

const putFile = async ({ id, userId, category, key, formValues }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id) id = uuid();

      const Item = {
        id: { S: id },
        userId: { S: userId },
        category: { S: category },
        key: { S: key },
        timestamp: { S: new Date().toISOString() },
        formValues: { S: formValues },
      };
      await client.send(
        new PutItemCommand({
          TableName: filesTable,
          Item,
        })
      );

      resolve(Item);
    } catch (err) {
      console.log(err, "putFile error");
      reject(err);
    }
  });

/**
 * Fetches a list of files with the supplied userId
 *
 * @param {string} userId
 * @returns The list of files
 */

const getFilesByUserId = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await client.send(
        new QueryCommand({
          TableName: filesTable,
          IndexName: "userId",
          KeyConditionExpression: "userId = :userId",
          ExpressionAttributeValues: {
            ":userId": { S: userId },
          },
        })
      );
      resolve(result.Items);
    } catch (err) {
      console.log("getFilesByUserId error", err);
      reject(err);
    }
  });

/**
 * Deletes the dynamo entry identified by the supplied fileId
 * Deletes the s3 object with the supplied key
 *
 * @param {*} fileId
 * @param {*} Key
 * @returns void
 */

const deleteFile = (fileId, Key) =>
  new Promise(async (resolve, reject) => {
    try {
      await client.send(
        new DeleteItemCommand({
          TableName: filesTable,
          Key: {
            id: { S: fileId },
          },
        })
      );
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.ASSET_BUCKET,
          Key,
        })
      );
      resolve();
    } catch (err) {
      console.log(err, "deleteFile error", err);
      reject(err);
    }
  });

/**
 * Fetches the dynamo entry identified by the supplied fileId
 */

/**
 *
 * @param {string} fileId
 * @returns dynamo entry
 */

const getFile = (fileId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await client.send(
        new GetItemCommand({
          TableName: filesTable,
          Key: {
            id: { S: fileId },
          },
        })
      );
      if (!result.Item) throw `Not found - ${fileId}`;

      const Item = {
        id: id.S,
        userId: userId.S,
        category: category.S,
        key: key.S,
        timestamp: timestamp.S,
        formValues: formValues.S,
      };
      resolve(Item);
    } catch (err) {
      console.log(err, "getFile error", err);
      reject(err);
    }
  });

module.exports = {
  putFile,
  getFilesByUserId,
  deleteFile,
  getFile,
};
