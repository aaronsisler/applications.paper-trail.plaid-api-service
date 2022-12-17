# Local DynamoDB instance

## Docker Commands

Start the DynamoDB container

```
docker-compose -f ./docker-dynamodb/docker-compose.yml up -d
```

Stop the DynamoDB container

```
docker-compose -f ./docker-dynamodb/docker-compose.yml down
```

## AWS CLI Commands

List out the items in a table. Best to use this if the table count is small.

```
aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name PAPER_TRAIL_RECORD_DATA_LOCAL
```
