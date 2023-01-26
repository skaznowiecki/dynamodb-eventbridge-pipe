import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { constructHandleMessageChanged } from "./functions";
import { constructTable } from "./resources/table";
import { constructEventBus } from "./resources/event-bus";
import { constructPipeRole } from "./resources/pipe-role";
import { constructPipe } from "./resources/pipe";

export class DynamodbEventbridgePipesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const eventBus = constructEventBus(this);

    const table = constructTable(this);

    const role = constructPipeRole(this, table, eventBus);

    constructPipe(this, table, eventBus, role);

    constructHandleMessageChanged(this, eventBus);
  }
}
