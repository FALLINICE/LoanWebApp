const Admin = require("../models/admin");
class AdminRepository{
    async createAdmin(data){
        try{
            const admin = await Admin.create(data);
            return admin;
        }catch(error){
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async destroy(adminId) {
        try {
            const result = await User.deleteOne({ _id: adminId });
            return result.deletedCount > 0; // Return true if a user was deleted
        } catch (error) {
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async getById(adminId) {
        try {
            const admin = await Admin.findById(adminId, {
                name: 1,
                email: 1,
                _id: 1
            });
            return admin;
        } catch (error) {
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async getByEmail(emailId) {
        try {
            // Find the admin by email
            const admin = await Admin.findOne({ email });
      
            // Check if the admin exists and the password matches
            if (!admin || admin.password !== password) {
              throw new Error('Invalid email or password');
            }
      
            return admin; // Return the admin document if the email and password are valid
          } catch (error) {
            throw new Error(`Error fetching admin: ${error.message}`);
          }
    }
}

module.exports =AdminRepository;