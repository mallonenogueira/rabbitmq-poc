export class CreateWalletUseCase {
  async execute(user) {
    console.log("Carteira criada para o usuário.", user);

    return {
      data: {
        walletId: 123456789,
      },
    };
  }
}
