const express = require('express');
const productRouter = require('../routes/products');
const router = express.Router();



router.get('/', (req, res,) => {
    res.send('sending product info.....');
});


router.post('/create', (req, res) => {
    res.send('Creating a new product ....');
});


module.exports = router;