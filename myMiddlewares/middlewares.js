module.exports = function(req, res, next) {
    console.log(`time: ${Date.now()}`);
    next();
}