import express from "express";
import { createRouter } from "./route.js";
import { createQueues } from "./queues.js";

export class App {
  constructor(broker) {
    this.broker = broker;
  }

  async build() {
    const app = express();

    app.use(createRouter(this.broker));

    return app;
  }
}
