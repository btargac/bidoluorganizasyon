const setCurrentRoute = (req, res, next) => {
    res.locals.url = req.url;
    next();
};

module.exports = setCurrentRoute;