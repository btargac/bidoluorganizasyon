const express = require('express');
const router = express.Router();

/* GET shop page. */
router.get('/', (req, res, next) => {
    res.render('shop', { title: 'Bidolu Organizasyon' });
});

module.exports = router;
