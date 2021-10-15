const Company = require('../models/Company.js');
const mongoose = require('mongoose');


/**
 * Each inventory has a limit, set as a base to 10,000
 *  
 */

// const getInventory = async({}) => {};
// const getAllInventories = async({}) => {};


const addCompany = async ({name, desc, img}) => {
    try {
        // Open connection
        await mongoose.connect(process.env.ATLAS_URI);
        
        // TODO Fix behavior after error, so that it only displays an error
        // Deny duplicate companies
        const isInDB = await Company.findOne({name});
        if(isInDB){
            alert("Company already exists, did not create.");
            mongoose.connection.close();
            return {status: 409, message: "Duplicate company, did not create"};
        } else {
            const company = new Company({name, desc, img});
            await company.save();
            // Close connection
            mongoose.connection.close();
            return {status: 201, message: `${name} successfully created`};  // Resolved Promise 
        }
        
    } catch (err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not create company'}; // Rejected Promise
    }
}

const deleteCompany = async(name) => {
    try{
        console.log("Attempting to delete " + name);
        await mongoose.connect(process.env.ATLAS_URI);
        await Company.deleteOne({name});
        mongoose.connection.close();
        return;
    } catch(err) {
        mongoose.connection.close();
        throw err;
    }
}

const getAllCompanies = async () => {
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Connected to database");
        const companies = await Company.find({});
        if(companies.length === 0) throw {status:500, error: 'Could not find any companies'};
        mongoose.connection.close();
        return companies;
    } catch(err){
        console.log("Controller error: " + err.message);
        mongoose.connection.close();
        throw err;
    }
}

const getOneCompany = async(name) => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        const warehouses = await Company.findOne({name: name}).exec();
        if(warehouses.length === 0) throw {status:500, error: 'Could not find any warehouses'};
        mongoose.connection.close();
        return warehouses;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

const updateCompany = async({name, desc, img}) => {
    try{} catch(err) {

    }
};

module.exports = {
    addCompany,
    deleteCompany,
    getOneCompany,
    getAllCompanies,
    updateCompany
}