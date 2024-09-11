// const user = require('../models/user.models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// exports.userlogin = async (req, res) => {
//     try {
//         let { email, password } = req.body;

//         let chekEmail = await user.findOne({ email: email });

//         if (!chekEmail) {
//             return res.json({ status: 400, message: "Email Not Found " })
//         }

//         let passwordComapre = await bcrypt.compare(password, chekEmail.password);

//         if (!passwordComapre) {
//             return res.json({ status: 400, message: "Password Not Match" })
//         }

//         let token = await jwt.sign({ _id: chekEmail._id }, process.env.SECRET_KEY, { expiresIn: "1H" });

//         let refreshToken = await jwt.sign({ _id: chekEmail._id }, process.env.REFRESH_TOEKN)
//         return res.json({ status: 200, message: "User Login SuccessFully...", user: chekEmail, AccessToken: token, refreshToken: refreshToken });
//     } catch (error) {
//         res.json({ status: 500, message: error.message });
//         console.log(error);
//     }
// };

const user = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.changePassword = async (req, res) => {
    try {

        let id = req.params.id

        let userId = await user.findById(id);

        let { currentPassword, newPassword, confirmPassword } = req.body;

        let passwordCompare = await bcrypt.compare(currentPassword, userId.password);

        if (!passwordCompare) {
            return res.json({ status: 400, message: "Current Password Not Match" })
        }
        if (newPassword !== confirmPassword) {
            return res.json({ status: 400, message: "New Password And Confirm Password Not Match" })
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        let updatePassword = await user.findByIdAndUpdate(id, { password: hashPassword }, { new: true })


        return res.json({ status: 200, message: "Password Changed SuccessFully...", user: updatePassword })
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
}
exports.userlogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        let chekEmail = await user.findOne({ email: email });

        if (!chekEmail) {
            return res.json({ status: 400, message: "Email Not Found " })
        }

        let passwordComapre = await bcrypt.compare(password, chekEmail.password);

        if (!passwordComapre) {
            return res.json({ status: 400, message: "Password Not Match" })
        }

        let token = await jwt.sign({ _id: chekEmail._id }, process.env.SECRET_KEY, { expiresIn: "1H" });

        let refreshToken = await jwt.sign({ _id: chekEmail._id }, process.env.REFRESH_TOEKN)

        chekEmail.refreshToken = refreshToken;
        await chekEmail.save();

        return res.json({ status: 200, message: "User Login SuccessFully...", user: chekEmail, AccessToken: token, refreshToken: refreshToken });
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
};
exports.userLogout = async (req, res) => {
    try {
        // Clear the cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(200).json({
            message: "Logged out successfully",
            data: { isLoggedOut: true }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
exports.refreshToken = async (req, res) => {
    try {
        let checkToken = req.body.refreshToken;

        if (!checkToken) {
            return res.json({ status: 401, message: "Unauthorized" })
        }

        const decodedToken = jwt.verify(checkToken, process.env.REFRESH_TOEKN)

        let userId = await user.findById(decodedToken._id);

        if (!userId) {
            return res.json({ status: 401, message: "Invalid Refrsh Token" })
        }

        if (checkToken !== userId.refreshToken) {
            return res.json({ status: 401, message: "Refresh token is expired" })
        }

        let token = await jwt.sign({ _id: userId._id }, process.env.SECRET_KEY);

        let refreshToken = await jwt.sign({ _id: userId._id }, process.env.REFRESH_TOEKN, { expiresIn: "1H" });

        userId.refreshToken = refreshToken;
        await userId.save();
        return res.json({ status: 200, message: "Access Token Refreshed", accessToken: token, refreshToken: refreshToken })
    } catch (error) {
        res.json({ status: 500, message: error.message });
        console.log(error);
    }
}