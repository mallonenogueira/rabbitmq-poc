export class NotifyUserQueue {
  constructor(broker, sendEmailToUserUseCase) {
    this.broker = broker;
    this.sendEmailToUserUseCase = sendEmailToUserUseCase;
  }

  queue() {
    this.broker.consume(this.broker.queues.notifyUser, (user, message) => {
      this.sendEmailToUserUseCase.execute(user);
      message.ack();
    });
  }
}
