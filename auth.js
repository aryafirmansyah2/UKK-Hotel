const jwt = require('jsonwebtoken');

auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ "msg": "Couldnt Authenticate" });
    }

};

module.exports = auth;