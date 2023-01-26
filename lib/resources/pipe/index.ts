import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as events from "aws-cdk-lib/aws-events";
import * as iam from "aws-cdk-lib/aws-iam";

import * as pipes from "aws-cdk-lib/aws-pipes";
import { Construct } from "constructs";

export const constructPipe = (
  scope: Construct,
  table: dynamodb.Table,
  eventBus: events.EventBus,
  role: iam.Role
): pipes.CfnPipe => {
  return new pipes.CfnPipe(scope, "Pipe", {
    name: "dynamodb-to-eventbridge",
    roleArn: role.roleArn,
    source: table.tableStreamArn!,
    sourceParameters: {
      dynamoDbStreamParameters: {
        startingPosition: "LATEST",
        batchSize: 10,
        maximumBatchingWindowInSeconds: 10,
        maximumRetryAttempts: 3,
      },
    },
    target: eventBus.eventBusArn,
    targetParameters: {
      eventBridgeEventBusParameters: {
        detailType: "changed",
        source: "app.messages",
      },
    },
  });
};
