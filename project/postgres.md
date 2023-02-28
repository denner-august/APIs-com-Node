docker run \
    --name postgres \
    -e POSTGRES_USER=denner \
    -e POSTGRES_PASSWORD=denner12 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

    docker run \
    --name adminer \
    -p  8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

status: sudo systemctl status postgresql
iniciar sudo systemctl start postgresql

## -- mongodb

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=denner \
    -e MONGO_INITDB_ROOT_PASSWORD=denner12 \
    -e MONGO_INITDB_DATABASE=heroes \
    -p 27017:27017 \
    -d \
    mongo:4

docker run \
--name mongoclient \
-p:3000:3000 \
--link mongodb:mongodb \
-d \
mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u denner -p denner12 --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'denner', pwd: 'denner12', roles: [{role: 'readWrite', db: 'herois'}]})"