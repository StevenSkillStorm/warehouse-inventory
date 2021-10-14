const router = require('express').Router();
const { resolve } = require('path');
const {addCompany, deleteCompany, getAllCompanies} = require('../../controller/company.js');

// GET all companies
router.get('/companies', async (req, res) => {
    try{
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch(err) {
        res.status(500).json(err);
    }

});

module.exports = router;