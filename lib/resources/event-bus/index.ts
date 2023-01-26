import { Construct } from "constructs";
import * as events from "aws-cdk-lib/aws-events";

export const constructEventBus = (scope: Construct): events.EventBus => {
  const eventBus = new events.EventBus(scope, "EventBus", {
    eventBusName: "app-event-bus",
  });
  return eventBus;
};
