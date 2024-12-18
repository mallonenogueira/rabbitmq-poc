export class CreateUserUseCase {
  constructor(broker) {
    this.broker = broker;
  }

  async execute(user) {
    console.log("Usuário criado.", user);

    const published = this.broker.publish(
      this.broker.exchanges.user,
      this.broker.routingKeys.userCreated,
      user
    );

    return {
      published,
      data: user,
    };
  }
}
