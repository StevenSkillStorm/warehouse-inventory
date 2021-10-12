// const Inventory = require('../models/inventory.js');
const mongoose = require('mongoose');

/**
 *  Each inventory has a limit, don't know if 1000 items or a number of entries
 *  
 *  
 */

// const getInventory = async({}) => {};
// const getAllInventories = async({}) => {};


const addInventory = async ({}) => {
    try {
        console.log('In addInventory()');
        // Open connection
        await mongoose.connect(process.env.ATLAS_URI);
        const inventory = new Inventory();
        await Inventory.save();
        // Close connection
        mongoose.connection.close();
        // return {status: 201, message: `${} successfully created`}; 
    } catch (err){
        mongoose.connection.close();
        throw {status: 500, error: 'Could not create inventory'}; // Rejected Promise
    }
};

const deleteInventory = async({}) => {
    try{

    } catch(err) {

    }

};

const updateInventory = async({}) => {
    try{} catch(err) {

    }
};

module.exports = {
    addInventory,
    deleteInventory,
    updateInventory
}