# applications.paper-trail.api-service

## Docker Commands

Start the DynamoDB

```
docker-compose -f ./docker/docker-compose.yml up -d
```

Stop the DynamoDB

```
docker-compose -f ./docker/docker-compose.yml down
```

## AWS CLI Commands

List out the items in a table. Best to use this if the table count is small.

```
aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE

```

Check the count of a table

```
aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE \
 --select "COUNT"
```

Single Items from a file

```
aws dynamodb put-item \
 --endpoint-url=http://dynamo-db-local:8000 \
 --table-name $TABLE_NAME \
 --item file:///init-scripts/data_single.json
```

Collection of items from a file

```
aws dynamodb batch-write-item \
 --endpoint-url=http://localhost:8000 \
 --item file:///init-scripts/data_collection.json
```
