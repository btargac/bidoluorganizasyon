const express = require('express');
const router = express.Router();

/* GET services page. */
router.get('/', (req, res, next) => {
    res.render('services', { title: 'Bidolu Organizasyon' });
});

module.exports = router;
