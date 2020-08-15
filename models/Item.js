const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new schema
const itemSchema = new Schema ({

   name: {
       type: String,
       required: true
   },
   date:{
       type: Date,
       default: Date.now
   }

});

module.exports = Item = mongoose.model('items_sample', itemSchema);