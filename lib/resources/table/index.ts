import { Construct } from "constructs";

import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export const constructTable = (scope: Construct): dynamodb.Table => {
  const table = new dynamodb.Table(scope, "MessagesTable", {
    partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
    stream: dynamodb.StreamViewType.NEW_IMAGE,
    tableName: "Messages",
  });
  return table;
};
