const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://kevsavage:ke@cluster0.f4fux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "todo"; 

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('todomessages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {todomessages: result})
  })
})

app.post('/todomessages', (req, res) => {
  db.collection('todomessages').insertOne({
    task: req.body.task, marked: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/todomessages', (req, res) => {
  db.collection('todomessages')
  .findOneAndUpdate({task: req.body.task, marked: req.body.marked}, {
    $set: {
      marked: !req.body.marked  
 
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/thumbDown', (req, res) => {
  db.collection('todomessages')
  .findOneAndUpdate({task: req.body.task, marked: req.body.marked}, {
    $set: {
      thumbDown:req.body.thumbDown + 1
       
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/todomessages', (req, res) => {
  db.collection('todomessages').deleteMany({})
    res.send('Message deleted!')
})

app.delete('/todomessages', (req, res) => {
  db.collection('todomessages').deleteMany({marked: true})
    res.send('Message deleted!')
})
