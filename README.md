# DynamoDB Data Stream to EventBridge

PoC to demonstrate how to use DynamoDB Streams to send events to EventBridge using EventBridge Pipes using CDK V2.

# Architecture

![Architecture](https://github.com/skaznowiecki/dynamodb-eventbridge-pipe/blob/main/assets/architecture.png)

# Step to deploy

1. Clone the repo
2. Run `npm install`
3. Run `cdk bootstrap` to bootstrap your AWS account
4. Set up your environment variables in `bin/dynamodb-eventbridge-pipe.ts`
5. Run `cdk deploy` to deploy the stack

# Step to test

1. Move to the `test` directory
2. Run `npm ts-node test.ts` to test the stack
3. Check the CloudWatch's lambda log to see the logs
