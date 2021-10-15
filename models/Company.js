const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Warehouses are embedded into their parent company's document
// Items are embedded into the warehouse document
// A company should only contain up to 3(?) embedded warehouses
// Past 3, any warehouses should be stored in a separate warehouses collection, each warehouse having a reference to its company 
const companySchema = new Schema({
    name: {type: String, required: true, unique: true},
    desc: String,
    img: String,
    warehouses: [{id:{type: Number, required: true},
        location:String,
        parent_company:{type: String, required: true},
        wh_name: String,
        wh_desc: String,
        max_capacity: {type: Number, required: true},
        items:[{
            item_name:{type: String, required: true},
            count:{type: Number, required: true},
            price:Number,
            item_size:{type:Number, required:true}
        }]
    }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;