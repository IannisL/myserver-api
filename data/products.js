const express = require('express');

const router = express.Router();


router.get('/' , (req , res) => {
    console.log(req.url);
    res.send('sending New Products!');
});

router.post('/' , (req , res) => {
    console.log(req.url);
    res.send('Adding New Products!');
});

module.exports = router;