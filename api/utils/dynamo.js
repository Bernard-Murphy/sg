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

const putFile = async ({ id, userId, category, key }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id) id = uuid();

      const Item = {
        id: { S: id },
        userId: { S: userId },
        category: { S: category },
        key: { S: key },
        timestamp: { S: new Date().toISOString() },
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
      resolve(result.Item);
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
