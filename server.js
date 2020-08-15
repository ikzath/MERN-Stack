const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//bodyparser middleware
app.use(bodyParser.json());

const items = require('./routes/api/items');

//DB connection
const db = "mongodb+srv://ikzath:uhk12345@shopping-iy0fg.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const db = require("./config/keys");


//connect to mongo
mongoose.connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true 
})
.then(()=>  console.log('mongoose connected...'))
.catch(err => console.log(err));


//use routes
app.use('/api/items', items);


// serve static assets  if in production
if(process.env.NODE_ENV === 'production') {
// serve static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res)=> {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  } ); 
}


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started on ${port}`)); 