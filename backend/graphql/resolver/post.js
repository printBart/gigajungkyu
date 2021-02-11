const { PossibleTypeExtensionsRule } = require('graphql');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = {
    //create post
    createPost: async({ title, description, creator, latitude, longitude, emoji, isNightmode }) => {
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

    getAllRecentPosts: async() => {
        try{
            var posts = await Post.find({"date": {
                "$gte": new Date()- 86400000, //24 hours, begin date
                "$lt": new Date() //end date
            }}).populate('creator');
            return posts;
        } catch(err){
            throw err;
        }
    }
}