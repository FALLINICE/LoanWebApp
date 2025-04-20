const Loan = require('../models/loan'); // Assuming the Loan model is in the models folder
const User = require('../models/user'); // Assuming the User model exists
const Admin = require('../models/admin'); // Assuming the Admin model exists

// Function to create a new loan
const createLoan = async (req, res) => {
    try {
        // Extract loan details from the request body
        const { userId, loan_amount, loan_type, requested_tenure } = req.body;
        console.log("Request Body: ",req.body);
        // Check if the user exists
        const user = await User.findById(userId);

        console.log(userId, " ", user);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Create a new loan object
        const newLoan = new Loan({
            userId,
            loan_amount,
            loan_type,
            requested_tenure
        });

        // Save the loan to the database
        const loan = await newLoan.save();

        // Return success response
        return res.status(201).json({
            message: "Loan created successfully",
            data: loan,
            success: true
        });
    } catch (error) {
        console.error("Error creating loan:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};

// Function to update a loan (e.g., admin approves/rejects a loan)
const updateLoan = async (req, res) => {
    try {
        // Extract loan ID and admin decision details from the request
        const { loan_id, admin_id, decision, justification, approved_tenure, approved_interest_rate } = req.body;

        // Find the loan by its ID
        const loan = await Loan.findById(loan_id);
        if (!loan) {
            return res.status(404).json({
                message: "Loan not found",
                success: false
            });
        }

        // Find the admin by their ID
        const admin = await Admin.findById(admin_id);
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
                success: false
            });
        }

        // Update the loan's status and admin action
        loan.loan_status = decision; // 'approved' or 'rejected'
        loan.is_approved_by_admin = decision === 'approved';
        loan.approved_tenure = approved_tenure || loan.approved_tenure; // Update if provided
        loan.approved_interest_rate = approved_interest_rate || loan.approved_interest_rate; // Update if provided
        loan.admin_action = {
            admin_id: admin._id,
            decision,
            justification,
            action_timestamp: new Date()
        };

        // Save the updated loan
        const updatedLoan = await loan.save();

        // Return success response
        return res.status(200).json({
            message: `Loan has been ${decision}`,
            data: updatedLoan,
            success: true
        });
    } catch (error) {
        console.error("Error updating loan:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};


// Function to get loans by user ID
const getLoanByUserId = async (req, res) => {
    try {
        // Extract user ID from the request parameters
        const { userId } = req.params; // Assuming userId is passed as a URL parameter
        console.log("User Id: ",userId);
        // Fetch loans associated with the user
        const loans = await Loan.find({ userId });
        console.log("LOAANANANAN: ",loans);
        // Check if loans exist for the user
        if (loans.length === 0) {
            return res.status(404).json({
                message: "No loans found for this user",
                success: false
            });
        }

        // Return success response with the loan data
        return res.status(200).json({
            message: "Loans fetched successfully",
            data: loans,
            success: true
        });
    } catch (error) {
        console.error("Error fetching loans by user ID:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
};




module.exports = {
    createLoan,
    updateLoan,
    getLoanByUserId
};
