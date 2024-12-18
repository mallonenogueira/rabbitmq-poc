import amqp from "amqplib";
import { config } from "../config.js";

const Exchanges = {
  user: "user_exchange",
};

const Queues = {
  notifyUser: "notify_user",
  createWallet: "create_wallet",
};

const RoutingKeys = {
  userCreated: "user.created",
};

export class BrokerFactory {
  async build() {
    const connection = await amqp.connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await this.createExchanges(channel);
    await this.createNotifyQueue(channel);
    await this.createCreateWalletQueue(channel);

    return new BrokerAmqplib(channel);
  }

  async createExchanges(channel) {
    await channel.assertExchange(Exchanges.user, "direct", { durable: true });
  }

  async createNotifyQueue(channel) {
    await channel.assertQueue(Queues.notifyUser, { durable: true });
    await channel.bindQueue(
      Queues.notifyUser,
      Exchanges.user,
      RoutingKeys.userCreated
    );
  }

  async createCreateWalletQueue(channel) {
    await channel.assertQueue(Queues.createWallet, { durable: true });
    await channel.bindQueue(
      Queues.createWallet,
      Exchanges.user,
      RoutingKeys.userCreated
    );
  }
}

class BrokerAmqplib {
  exchanges = Exchanges;
  queues = Queues;
  routingKeys = RoutingKeys;

  constructor(channel) {
    this._channel = channel;
  }

  publish(exchange, routingKey, message) {
    this._channel.publish(exchange, routingKey, this.toBroker(message));
  }

  consume(message, onMessage) {
    this._channel.consume(message, (message) => {
      onMessage(this.fromBroker(message), {
        ack: () => this._channel.ack(message),
      });
    });
  }

  toBroker(message) {
    return Buffer.from(
      JSON.stringify({
        timestamp: Date.now(),
        data: message,
      })
    );
  }

  fromBroker(message) {
    return JSON.parse(message.content.toString());
  }
}
