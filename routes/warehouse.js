const router = require('express').router();
const { resolve } = require('path');
const {addWarehouse, deleteWarehouse, getAllWarehouses } = require('../controller/warehouse.js');

router.get('/', async (req, res) => {
    try{} catch(err) {}

});





app.METHOD(PATH, HANDLER);
router.METHOD(PATH, HANDLER);


router.get('/users/:name', (req, res) => {
    console.log(req.params.name);
});

router.get('/users/id', (req, res) => {
    console.log('Get ID');
});