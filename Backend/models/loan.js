const {Schema, model, default:mongoose}  =require("mongoose");
const loanSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user's ObjectId
        ref: 'User', // Reference to the User model
        required: true, // Ensure this field is required
      },
      loan_amount: {
        type: Number, // Loan amount
        required: [true, "Loan amount is required"], // Validation message
      },
      loan_type: {
        type: String, // Purpose of the loan
        required: [true, "Loan purpose is required"], // Validation message
      },
      loan_status: {
        type: String, // Status of the loan (e.g., pending, approved, rejected)
        enum: ['pending', 'approved', 'rejected'], // Specify valid options
        default: 'pending', // Default value
      },
      requested_tenure: {
        type: Number, // Requested tenure in months
        required: [true, "Requested tenure is required"], // Validation message
      },
      model_status: {
        type: Boolean,
        default: false
      },
      model_probability:{
        type: Number,
        default: null,
      },
      model_interest_rate: {
        type: Number, // Approved tenure in months
        default: null, // Default value
      },
      approved_tenure: {
        type: Number, // Approved tenure in months
        default: null, // Default value
      },
      approved_interest_rate: {
        type: Number, // Approved interest rate
        default: null, // Default value
      },
      is_approved_by_admin: {
        type: Boolean, // Indicates if the loan is approved by admin
        default: false, // Default value
      },
      admin_action: {
        admin_id: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the admin's ObjectId
          ref: 'admin', // Reference to the User model
          default: null, // Default value
        },
        decision: {
          type: String, // Admin's decision (approve/reject)
          enum: ['approved', 'rejected'], // Specify valid options
          default: null, // Default value
        },
        justification: {
          type: String, // Justification for the admin's decision
          default: null, // Default value
        },
        action_timestamp: {
          type: Date, // Timestamp of the admin's action
          default: null, // Default value
        },
      }, 
})

const Loan = mongoose.model('Loan',  loanSchema);
module.exports =  Loan;