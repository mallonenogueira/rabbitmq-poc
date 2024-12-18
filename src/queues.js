import { NotifyUserQueue } from "./queues/notify-user-queue.js";
import { SendEmailToUserUseCase } from "./use-cases/send-email-to-user-use-case.js";
import { CreateWalletUseCase } from "./use-cases/create-wallet-use-case.js";
import { CreateWalletQueue } from "./queues/create-wallet-queue.js";

export function createQueues(broker) {
  const sendEmailToUserUseCase = new SendEmailToUserUseCase();
  const createWalletUseCase = new CreateWalletUseCase();
  const notifyUserQueue = new NotifyUserQueue(broker, sendEmailToUserUseCase);
  const createWalletQueue = new CreateWalletQueue(broker, createWalletUseCase);

  notifyUserQueue.queue();
  createWalletQueue.queue();
}
