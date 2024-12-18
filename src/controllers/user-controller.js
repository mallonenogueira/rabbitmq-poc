export class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    const data = await this.createUserUseCase.execute({
      userId: crypto.randomUUID(),
      userName: req.query.userName,
    });

    res.status(201).json(data);
  }
}
