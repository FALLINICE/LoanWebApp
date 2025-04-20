const UserService = require('../services/userService');
const cookies =require('cookie-parser')
const userService = new UserService();
const Loan = require('../models/loan'); // Assuming the Loan model is in the models folder
const User = require('../models/user'); // Assuming the User model exists
const Admin = require('../models/admin'); 

const create = async (req,res) =>{
    try{
         console.log(req.body);
        const response = await userService.create({
            full_name: req.body.full_name,
            martial_status: req.body.martial_status,
            month_of_employment: req.body.month_of_employment,
            bank_name: req.body.bank_name,
            dob: req.body.dob,
            years_of_employment: req.body.years_of_employment,
            ifsc_code: req.body.ifsc_code,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            credit_score: req.body.credit_score,
            employment_status: req.body.employment_status,
            income: req.body.income,
            gender: req.body.gender
         }); 
        
         return res.status(201).json({
            message: 'Successfully created a new user.',
            data: response,
            success: true,
            err: {}
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const signIn = async (req,res)=>{
    try{
        console.log("Started");
        const response = await userService.signIn(req.body.email, req.body.password);
        res.cookie('token',response);
        console.log("Response Id ", response)
        return res.status(201).json({
            message: 'Sucessfully SignIN',
            data: response,
            success: true
        })
    } catch(error){
        console.log(error);
        console.log("Error At Controller Layer.")
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const isAuthenticated = async (req,res) =>{
    try{
        console.log("REQUEST COOKE TOKEN:- ",req.cookies);
        const token = req.cookies.token; // Access token from cookies; 
        if(!token){
            console.log("We need to provide JSON Token")
        }
        console.log("Token:-> ", token);
        const response =await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: "User is authenticated and token is Valid"
        });
    }catch(error){
        console.log(error);
        console.log("Error At Controller Layer.")
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

// Function to get a user by their ID
const getUserById = async (req, res) => {
    try {
      // Extract user ID from request parameters
      const id = req.params.id; // Get the id from params
      console.log("ID: ", id);
      
      // Fetch the user by their ID
      const user = await User.findById(id);
      console.log("User: ", user);
      
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      // Return success response with the user data
      return res.status(200).json({
        message: "User fetched successfully",
        data: user,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  };
  
// Function to get all users
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Return success response with users data
        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
            success: true
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};




module.exports= {
    create,
    signIn,
    isAuthenticated,
    getAllUsers, // Export the function to get all users
    getUserById  // Export the function to get a user by their ID
}