const router = require('express').Router();
const { resolve } = require('path');
const {addCompany, deleteCompany, getAllCompanies} = require('../../controller/company.js');

// GET all companies
router.get('/', async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (err) {
        console.log("Router error");
        res.status(500).json(err);
    }
});

// GET specific company

// Add company
router.post('/', async (req, res) => {
    try{
        const data = await addCompany(req.body);
        res.sendFile(resolve('public', 'views', 'index.html')); // ./public/views/index.html
    } catch(err) {
        res.status(500).json(err);
    }
});

// Delete company
router.delete('/:name', async(req, res) => {
    try {
        console.log("Routed to /" + req.params.name);
        await deleteCompany(req.params.name);
        res.status(200).json({message: `${req.params.name} successfully deleted`});
    } catch (err) {
        res.status(500).json({err: 'Unable to delete company'});
    }
});

module.exports = router;