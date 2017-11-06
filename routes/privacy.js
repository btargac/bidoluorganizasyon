const express = require('express');
const router = express.Router();

/* GET privacy page. */
router.get('/', (req, res, next) => {
  res.render('privacy', { title: 'Bidolu Organizasyon' });
});

module.exports = router;
