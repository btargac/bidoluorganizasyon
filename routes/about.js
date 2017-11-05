const express = require('express');
const router = express.Router();

const subPages = new Map([
    ['biz-kimiz', 'about-us'],
    ['fiyatlar', 'about-prices'],
    ['rezervasyon', 'about-reservation'],
    [undefined, 'about-us']
]);

/* GET about page. */
router.get('/:pageType?', (req, res, next) => {
    let pageType = req.params.pageType;

    pageType = subPages.get(pageType);

    res.render(pageType, {
        title: 'Bidolu Organizasyon'
    });
});

module.exports = router;
