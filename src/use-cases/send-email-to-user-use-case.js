export class SendEmailToUserUseCase {
  async execute(user) {
    console.log('Email enviado: ', user);
  }
}
