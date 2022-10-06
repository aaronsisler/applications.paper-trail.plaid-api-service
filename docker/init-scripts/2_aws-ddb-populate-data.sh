aws configure set aws_access_key_id "access_key_id"
aws configure set aws_secret_access_key "secret_access_key"
aws configure set region "us-east-1"

TABLE_NAME="POC_QUERY_TABLE"
PRIMARY_KEY=1
SORT_KEY=1


for PRIMARY_KEY in {1..10}
do
  for SORT_KEY in {1..10}
  do
    aws dynamodb put-item \
      --endpoint-url=http://dynamo-db-local:8000 \
      --table-name $TABLE_NAME \
      --item "{\"partitionKey\":{\"S\":\"$PRIMARY_KEY\"},\"sortKey\":{\"S\":\"$SORT_KEY\"},\"data\":{\"S\":\"I am data-$PRIMARY_KEY-$SORT_KEY!\"}}"

  done
done

# aws dynamodb batch-write-item \
#   --endpoint-url=http://dynamo-db-local:8000 \
#   --request-items file://$FILE_DATA

