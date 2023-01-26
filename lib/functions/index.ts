import { Construct } from "constructs";
import * as events from "aws-cdk-lib/aws-events";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as eventTargets from "aws-cdk-lib/aws-events-targets";

export const constructHandleMessageChanged = (
  scope: Construct,
  eventBus: events.IEventBus
): lambda.NodejsFunction => {
  const lambdaFunction = new lambda.NodejsFunction(
    scope,
    "HandleMessageChanged",
    {
      functionName: "handle-message-changed",
      entry: `${__dirname}/handler.ts`,
      handler: "handler",
      logRetention: logs.RetentionDays.ONE_MONTH,
    }
  );

  new events.Rule(scope, "LambdaHandleMessageChanged", {
    eventBus,
    eventPattern: {
      source: ["app.messages"],
      detailType: ["changed"],
    },
    targets: [new eventTargets.LambdaFunction(lambdaFunction)],
  });

  eventBus.grantPutEventsTo(lambdaFunction);

  return lambdaFunction;
};
