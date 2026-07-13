
## Cliente Gateway
The gateway is the communication point between our clients and our services. It is responsible for receiving requests, routing them to the appropriate services, and returning the response to the client.


## Dev

1. Clone the repository
2. Install dependencies
3. Create a `.env` file based on `env.template`
4. Make sure the microservices to be consumed are up and running
5. Start the project with `npm run start:dev`


## Nats
```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```

## PROD
```
docker build -f dockerfile.prod -t client-gateway .
```