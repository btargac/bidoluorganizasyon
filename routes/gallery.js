const express = require('express');
const router = express.Router();

const subPages = new Map([
    ['dugun-nisan', ['dugun', 'nisan']],
    ['baby-shower', ['baby-shower']],
    ['dogum-gunu', ['dogum-gunu','birthday']],
    ['acilis-kutlama', ['acilis','kutlama', 'celebration']],
    ['bebek-mevludu', ['bebek-mevludu']],
    [undefined, 'all']
]);

/* GET gallery page. */
router.get('/:pageType?', (req, res, next) => {
    let pageType = req.params.pageType;

    pageType = subPages.get(pageType);
    // TODO: filter the database entries to show only the desired results
    console.log('pageType', pageType);

    res.render('gallery', {
        title: 'Bidolu Organizasyon'
    });
});

module.exports = router;
