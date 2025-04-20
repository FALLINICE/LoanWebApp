const AdminService = require('../services/adminService'); // Updated service reference
const cookies = require('cookie-parser');
const adminService = new AdminService(); // Updated service instance

const create = async (req, res) => {
    try {
        const response = await adminService.create({
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });

        return res.status(201).json({
            message: 'Successfully created a new admin.',
            data: response,
            success: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
};

const signIn = async (req, res) => {
    try {
        console.log("Started");
        const response = await adminService.signIn(req.body.email, req.body.password);
        res.cookie('token', response);
        console.log("Response Id ", response);
        return res.status(201).json({
            message: 'Successfully Signed In',
            data: response,
            success: true
        });
    } catch (error) {
        console.log(error);
        console.log("Error At Controller Layer.");
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        console.log("REQUEST COOKIE TOKEN:- ", req.cookies);
        const token = req.cookies.token; // Access token from cookies
        if (!token) {
            console.log("We need to provide JSON Token");
        }
        console.log("Token:-> ", token);
        const response = await adminService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: "Admin is authenticated and token is valid"
        });
    } catch (error) {
        console.log(error);
        console.log("Error At Controller Layer.");
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
};

module.exports = {
    create,
    signIn,
    isAuthenticated
};
