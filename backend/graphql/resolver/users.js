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
            
            console.log(username);

            const user = new User({
                token: token,
                email: email,
                faculty: faculty,
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