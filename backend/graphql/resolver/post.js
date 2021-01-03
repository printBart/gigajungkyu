const Post = require('../../models/Post');

module.exports = {
    //create post
    createPost: async({ title, description, creator, latitude, longitude, date }) => {
        try{
            const post = new Post({
                title: title,
                description: description,
                creator: creator,
                latitude: latitude,
                longitude: longitude,
                date: date,
            });
            const createdPost = await post.save();

            return createdPost;
        } catch(err){
            throw(err);
        }
    },

    getAllPosts: async() => {
        try{
            var posts = await Post.find();
            return posts;

        } catch(err){
            throw err;
        }
    },
}