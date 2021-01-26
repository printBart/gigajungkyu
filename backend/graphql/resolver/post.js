const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = {
    //create post
    createPost: async({ title, description, creator, latitude, longitude, emoji, date, isNightmode }) => {
        try{
            const creatorObj = await User.findOne({token: creator});
            const post = new Post({
                title: title,
                description: description,
                creator: creatorObj,
                latitude: latitude,
                longitude: longitude,
                emoji,
                date: new Date(),
                isNightmode: isNightmode
            });
            const createdPost = await post.save();

            return createdPost;
        } catch(err){
            throw(err);
        }
    },

    getAllPosts: async() => {
        try{
            const posts = await Post.find().populate('creator');
            return posts;

        } catch(err){
            throw err;
        }
    },
}