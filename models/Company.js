const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Warehouses are embedded into their parent company's document
const companySchema = new Schema({
    name: {type: String, required: true},
    desc: String,
    warehouses: [{id:{type: Number, required: true},
        location:String,
        wh_name: String,
        wh_desc: String,
        max_capacity: {type: Number, required: true},
        items:[{
            item_name:{type: String, required: true},
            count:{type: Number, required: true},
            price:Number
        }]
    }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;