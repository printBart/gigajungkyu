const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const { transformComment } = require('./transformer');

module.exports = {
    //register single user
    createComment: async({ description, creator, latitude, longitude, post, parentComment}) => {
        try{
            const comment = new Comment({
                description: description,
                creator: creator,
                latitude: latitude,
                longitude: longitude,
                date: new Date(),
                post: post,
                parentComment: parentComment,
                childComments: []
            });

            if(parentComment){
                const parentCommentObj = await Comment.findById(parentComment);
                parentCommentObj.childComments.push(comment);
                await parentCommentObj.save();
            }

            const createdComment = await comment.save();

            return createdComment;

        } catch(err){
            throw(err);
        }
    },

    getAllCommentsByPostId: async({ postId }) => {
        try{
            var comments = await Comment.find({post: postId, parentComment: null});

            return comments.map(comment => {
                return transformComment(comment);
            });
        } catch(err){
            throw(err);
        }
    }
}