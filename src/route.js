import { Router } from "express";
import { UserController } from "./controllers/user-controller.js";
import { CreateUserUseCase } from "./use-cases/create-user-use-case.js";

function createRouter(broker) {
  const router = Router();
  const createUserUseCase = new CreateUserUseCase(broker);
  const userController = new UserController(createUserUseCase);

  router.post("/user", userController.create);

  return router;
}

export { createRouter };
