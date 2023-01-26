#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DynamodbEventbridgePipesStack } from "../lib/dynamodb-eventbridge-pipes-stack";

const app = new cdk.App();
new DynamodbEventbridgePipesStack(app, "DynamodbEventbridgePipesStack", {
  env: {
    account: process.env.ACCOUNT_ID,
    region: process.env.REGION,
  },
});
