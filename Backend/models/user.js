const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    full_name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    phone: {
        type: String,
        required: "Phone Number is Required" 
    },
    password: {
        type: String,
        required: "Password is required."
    },
    credit_score: {
        type: Number, // Credit score of the user
        required: [true, "Credit score is required"], // Validation message
    },
    employment_status: {
        type: String, // e.g., employed, self-employed, unemployed
        enum: ['full-time', 'self-employed', 'unemployed', 'part-time'], // Specify valid options
        required: [true, "Employment status is required"], // Validation message
    },
    income: {
        type: Number, // Annual income of the applicant
        required: [true, "Income is required"], // Validation message
    },
    gender: {
        type: String, // Gender of the applicant
        enum: ['male', 'female', 'other'], // Specify valid options
        required: [true, "Gender is required"], // Validation message
    },
    martial_status: {
        type: String, // Marital status of the applicant
        enum: ['single', 'married', 'divorced', 'widowed'], // Specify valid options
        required: [true, "Marital status is required"], // Validation message
    },
    month_of_employment: {
        type: Number, // Month of employment (1-12)
        required: [true, "Month of employment is required"], // Validation message
    },
    bank_name: {
        type: String, // Name of the bank
        required: [true, "Bank name is required"], // Validation message
    },
    ifsc_code: {
        type: String, // IFSC code of the bank
        required: [true, "IFSC code is required"], // Validation message
        match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please fill a valid IFSC code'] // Basic IFSC code validation
    },
    dob: {
        type: Date, // Date of birth
        required: [true, "Date of birth is required"], // Validation message
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
