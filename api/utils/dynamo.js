const {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { v4: uuid } = require("uuid");

const filesTable = process.env.DYNAMO_FILES_TABLE;

const client = new DynamoDBClient({});

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

const deleteFile = (fileId) =>
  new Promise(async (resolve, reject) => {
    try {
      await client.send(
        new DeleteItemCommand({
          TableName: filesTable,
          Key: fileId,
        })
      );
      resolve();
    } catch (err) {
      console.log(err, "deleteFile error", err);
      reject(err);
    }
  });

module.exports = {
  putFile,
  getFilesByUserId,
  deleteFile,
};
