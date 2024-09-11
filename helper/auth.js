const jwt = require('jsonwebtoken')
const user = require('../models/user.models')

exports.auth = (roles) => {
    return async (req, res, next) => {
        try {
            let authorization = req.headers["authorization"]

            if (!authorization) {
                return res.status(401).json({ status: 401, message: 'Authorize Token Is Required' })
            }

            let token = await authorization.split(' ')[1]

            const checkToken = jwt.verify(token, process.env.SECRET_KEY)

            const chekUser = await user.findById(checkToken)

            let userData = await chekUser.populate('role')
            
            if (!userData) {
                return res.status(404).json({ status: 404, message: "User Not Found" })
            }

            req.user = userData;

            if (!roles.includes(userData.role.roleName)) {
                return res.status(403).json({ status: 403, message: "Unauthorized Access" });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
}