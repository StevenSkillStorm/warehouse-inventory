const router = require('express').Router();
const { resolve } = require('path');
const {addInventory, deleteInventory, getAllInventories } = require('../../controller/inventory.js');

// GET all companies
router.get('/inventories', async (req, res) => {
    try{
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch(err) {
        res.status(500).json(err);
    }

});

router.get('/users/:name', (req, res) => {
    console.log(req.params.name);
});

router.get('/users/id', (req, res) => {
    console.log('Get ID');
});

module.exports = router;