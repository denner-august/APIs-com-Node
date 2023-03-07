// docker exec -it 81d914c69eec mongo -u denner -p denner12 --authenticationDatabase herois

show dbs 
use herois 
show collections

db.herois.insert({
    nome: 'batman',
    poder: "inteligencia",
    dataNascimento: "1999-12-02"
})

db.herois.find()
db.herois.find().pretty()