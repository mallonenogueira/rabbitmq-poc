import { App } from "./app.js";
import { BrokerFactory } from "./broker/broker.js";
import { config } from "./config.js";
import { createQueues } from "./queues.js";

const broker = await new BrokerFactory().build();
const app = await new App(broker).build();

createQueues(broker);

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}`)
);
