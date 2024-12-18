import { AppFactory } from "./app.js";
import { BrokerFactory } from "./broker/broker.js";
import { config } from "./config.js";
import { NotifyUserQueue } from "./queues/notify-user-queue.js";
import { UserController } from "./controllers/user-controller.js";
import { CreateUserUseCase } from "./use-cases/create-user-use-case.js";
import { SendEmailToUserUseCase } from "./use-cases/send-email-to-user-use-case.js";
import { CreateWalletUseCase } from "./use-cases/create-wallet-use-case.js";
import { CreateWalletQueue } from "./queues/create-wallet-queue.js";

const app = await new AppFactory().build();
const broker = await new BrokerFactory().build();

const createUserUseCase = new CreateUserUseCase(broker);
const sendEmailToUserUseCase = new SendEmailToUserUseCase();
const createWalletUseCase = new CreateWalletUseCase();

const userController = new UserController(createUserUseCase);
const notifyUserQueue = new NotifyUserQueue(broker, sendEmailToUserUseCase);
const createWalletQueue = new CreateWalletQueue(broker, createWalletUseCase);

try {
  notifyUserQueue.queue();
  createWalletQueue.queue();

  app.post("/user", userController.create);

  app.listen(config.PORT, () =>
    console.log(`Example app listening on port ${config.PORT}`)
  );
} catch (error) {
  console.error(error);
}
