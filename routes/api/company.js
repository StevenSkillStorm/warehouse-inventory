const router = require('express').Router();
const { resolve } = require('path');
const {addCompany, deleteCompany, getAllCompanies} = require('../../controller/company.js');

// GET all companies
router.get('/', async (req, res) => {
    try {
        console.log("In router");
        const companies = await getAllCompanies();
        console.log("Got all companies");
        res.status(200).json(companies);
    } catch (err) {
        console.log("Router error");
        res.status(500).json(err);
    }
});


// GET specific company

// Add company

// Delete company

module.exports = router;