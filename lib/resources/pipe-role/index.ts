import { Construct } from "constructs";

import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as events from "aws-cdk-lib/aws-events";
import * as iam from "aws-cdk-lib/aws-iam";

export const constructPipeRole = (
  scope: Construct,
  table: dynamodb.Table,
  eventBus: events.EventBus
): iam.Role => {
  const sourcePolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        resources: [table.tableStreamArn!],
        actions: [
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator",
          "dynamodb:ListStreams",
        ],
        effect: iam.Effect.ALLOW,
      }),
    ],
  });

  const targetPolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        resources: [eventBus.eventBusArn],
        actions: ["events:PutEvents"],
        effect: iam.Effect.ALLOW,
      }),
    ],
  });

  return new iam.Role(scope, "PipeRole", {
    roleName: "PipeRole",
    assumedBy: new iam.ServicePrincipal("pipes.amazonaws.com"),
    inlinePolicies: {
      sourcePolicy,
      targetPolicy,
    },
  });
};
