const User = require('../../models/User');

module.exports = {
    //register single user
    registerUser: async({ token, email, faculty }) => {
        try{
            var username;
            while (true){
                username = ((email.split("@")[0]).substring(0, 3) + Math.floor(10000 + Math.random() * 90000)).toLowerCase();
                var uniqueUsername = await User.findOne({username: username});
                if(!uniqueUsername){
                    break;
                }
            }

            const user = new User({
                token: token,
                email: email,
                faculty: faculty,
                username: username,
                points: 0,
            });

            //store user variable of type User to db
            const registeredUser = await user.save();

            return registeredUser;
        } catch(err){
            throw(err);
        }
    },

    getUserByToken: async({ token }) => {
        try{
            const user = await User.findOne({token: token});
            return user;

        } catch(err){
            throw(err);
        }
    }
}