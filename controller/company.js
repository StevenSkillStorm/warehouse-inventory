const Company = require('../models/Company.js');
const mongoose = require('mongoose');


/**
 * Each inventory has a limit, set as a base to 
 *  
 */

// const getInventory = async({}) => {};
// const getAllInventories = async({}) => {};


const addCompany = async ({name, desc, img}) => {
    try {
        console.log('In addCompany()');
        // Open connection
        await mongoose.connect(process.env.ATLAS_URI);
        const company = new Company({name, desc, img});
        await company.save();
        // Close connection
        mongoose.connection.close();
        return {status: 201, message: `${name} successfully created`};  // Resolved Promise 
    } catch (err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not create company'}; // Rejected Promise
    }
}

const deleteCompany = async({id}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        await Company.deleteOne({id});
        mongoose.connection.close();
        return;
    } catch(err) {
        mongoose.connection.close();
        throw err;
    }
}

const getAllCompanies = async () => {
    try{
        console.log("Attempting to connect to database");
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Connection created");
        const companies = await Company.find({});
        if(companies.length === 0) throw {status:500, error: 'Could not find any companies'};
        console.log("Got companies");
        console.log("Companies" + companies);
        mongoose.connection.close();
        return companies;
    } catch(err){
        console.log("Controller error: " + err.message);
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
    getAllCompanies,
    // updateCompany
}