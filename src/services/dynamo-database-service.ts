import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { LOCAL_DDB_ENDPOINT, TABLE_NAME } from "../config";

class DynamoDatabaseService {
  ddbDocClient: DynamoDBDocument;

  constructor() {
    const ddbClient = new DynamoDBClient({ endpoint: LOCAL_DDB_ENDPOINT });
    this.ddbDocClient = DynamoDBDocument.from(ddbClient);
  }
  async create(item: any) {
    await this.ddbDocClient.put({
      TableName: TABLE_NAME,
      Item: item,
    });
  }

  async getItem(partitionKey: string, sortKey: string): Promise<any> {
    try {
      var params = {
        Key: { PartitionKey: partitionKey, SortKey: sortKey },
        TableName: TABLE_NAME,
      };
      const { Item } = await this.ddbDocClient.get(params);

      return Item;
    } catch (error) {
      console.log(error);
      console.error("Try again from DatabaseService::getItem");
    }
  }

  async getItems(partitionKey: string, sortKey: string): Promise<any> {
    try {
      const params = {
        KeyConditionExpression:
          "partitionKey = :partitionKey AND begins_with ( sortKey , :sortKey )",
        ExpressionAttributeValues: {
          ":partitionKey": partitionKey,
          ":sortKey": sortKey,
        },
        TableName: TABLE_NAME,
      };
      const { Items } = await this.ddbDocClient.query(params);

      return Items;
    } catch (error) {
      console.log(error);
      console.error("Try again from DatabaseService::getItems");
    }
  }
}

export { DynamoDatabaseService };
