# Local RDS instance

## Docker Commands

Start the DynamoDB container

```
docker-compose -f ./docker-rds/docker-compose.yml --env-file ./docker-rds/.env.local up -d
```

Stop the DynamoDB container

```
docker-compose -f ./docker-rds/docker-compose.yml --env-file ./docker-rds/.env.local down
```

--env-file ./config/.env.dev
