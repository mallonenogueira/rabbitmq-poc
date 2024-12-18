export class CreateWalletQueue {
  constructor(broker, createWalletUseCase) {
    this.broker = broker;
    this.createWalletUseCase = createWalletUseCase;
  }

  queue() {
    this.broker.consume(this.broker.queues.createWallet, (user, message) => {
      this.createWalletUseCase.execute(user);
      message.ack();
    });
  }
}
