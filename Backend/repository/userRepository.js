const User = require("../models/user");
class UserRepository{
    async createUser(data){
        try{
            const user = await User.create(data);
            return user;
        }catch(error){
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const result = await User.deleteOne({ _id: userId });
            return result.deletedCount > 0; // Return true if a user was deleted
        } catch (error) {
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findById(userId, {
                name: 1,
                email: 1,
                _id: 1
            });
            return user;
        } catch (error) {
            console.log("Something went Wrong in Repo Layer");
            throw error;
        }
    }

    async getByEmail(emailId) {
        try {
            const user = await User.findOne({ email: emailId });
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer.");
            throw error;
        }
    }
}

module.exports =UserRepository;