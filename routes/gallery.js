const express = require('express');
const router = express.Router();

const subPages = new Map([
    ['dugun-nisan', {keyword: 'Düğün Nişan', categories: ['dugun', 'nisan']}],
    ['baby-shower', {keyword: 'Baby Shower', categories: ['baby-shower']}],
    ['dogum-gunu', {keyword: 'Doğum Günü', categories: ['dogum-gunu','birthday']}],
    ['acilis-kutlama', {keyword: 'Açılış - Kutlama', categories: ['acilis','kutlama', 'celebration']}],
    ['bebek-mevludu', {keyword: 'Bebek Mevlüdü', categories: ['bebek-mevludu']}],
    [undefined, {keyword: 'Tümü', categories: 'all'}]
]);

/* GET gallery page. */
router.get('/:pageType?', (req, res, next) => {
    let pageType = req.params.pageType;

    let {keyword} = subPages.get(pageType);

    res.render('gallery', {
        title: 'Bidolu Organizasyon',
        keyword
    });
});

module.exports = router;
