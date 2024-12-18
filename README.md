# Proof of Concept (PoC) with JavaScript and RabbitMQ

This repository contains a simple Proof of Concept (PoC) that demonstrates the integration of **JavaScript** with **RabbitMQ**.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**
- **RabbitMQ**

### Installation


1. Install the dependencies:

    ```bash
    npm install
    ```

2. Configure the environment variables in a `.env` file:

    ```bash
    RABBITMQ_USER=admin
    RABBITMQ_PASSWORD=admin
    RABBITMQ_URL=amqp://admin:admin@localhost:5672
    PORT=3000
    ```

3. Run rabbitmq on docker compose:

    ```bash
    docker compose up -d
    ```

    Make sure that RabbitMQ is running locally and the credentials match the ones in your `.env` file.

### Running the Application

Start the application by running:

```bash
npm start
```


## Example

```bash
curl -X POST http://localhost:3000/user?userName=Mallone
```

#### console.log
```
Usuário criado. {
  "userId": "4a97c775-3d5d-4725-baae-c81dcf82e30a",
  "userName": "Mallone"
}

Carteira criada para o usuário. {
  "timestamp": 1734557412270,
  "data": {
    "userId": "4a97c775-3d5d-4725-baae-c81dcf82e30a",
    "userName": "Mallone"
  }
}

Email enviado:  {
  "timestamp": 1734557412270,
  "data": {
    "userId": "4a97c775-3d5d-4725-baae-c81dcf82e30a",
    "userName": "Mallone"
  }
}
```
