import { EventBridgeHandler } from "aws-lambda";

export const handler: EventBridgeHandler<any, any, any> = async (event) => {
  console.log(JSON.stringify(event));
};
