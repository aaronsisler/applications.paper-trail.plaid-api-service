# applications.paper-trail.api-service

## Docker

Start the DynamoDB

```
docker-compose -f ./docker/docker-compose.yml up -d
```

Stop the DynamoDB

```
docker-compose -f ./docker/docker-compose.yml down
```

aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE

aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE \
 --select "COUNT"

aws dynamodb batch-write-item \
 --endpoint-url=http://localhost:8000 \
 --request-items file://request-items.json \
