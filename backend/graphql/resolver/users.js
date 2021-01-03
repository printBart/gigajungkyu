const User = require('../../models/User');

module.exports = {
    //register single user
    registerUser: async({ username }) => {
        try{
            const user = new User({
                username: username
            });

            //store user variable of type User to db
            const registeredUser = await user.save();

            return registeredUser;
        } catch(err){
            throw(err);
        }
    },
}