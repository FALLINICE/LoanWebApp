const {Schema, model, default:mongoose}  =require("mongoose");
const adminSchema = new Schema({
    full_name: {
        type: String,
        required:"Name is required"
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
    }
})

const Admin = mongoose.model('Admin',  adminSchema);
module.exports =  Admin;