const Comment = require('../../models/Comment');
const User = require('../../models/User');
const { transformComment } = require('./transformer');

module.exports = {
    //register single user
    createComment: async({ description, creator, latitude, longitude, postId, parentComment}) => {
        try{
            const creatorObj = await User.findOne({token: creator});
            
            if(description.length < 3){
                throw "Comment description must have a greater length than 3 characters";
            }
            if(latitude < -90 || latitude > 90){
                throw "Invalid latitude";
            }
            if(longitude < -180 || longitude > 180){
                throw "Invalid longitude"
            }

            const comment = new Comment({
                description: description,
                creator: creatorObj,
                latitude: latitude,
                longitude: longitude,
                date: new Date(),
                post: postId,
                parentComment: parentComment,
                childComments: []
            });

            if(parentComment){
                const parentCommentObj = await Comment.findById(parentComment);
                parentCommentObj.childComments.push(comment);
                await parentCommentObj.save();
            }

            const createdComment = await comment.save();

            return transformComment(createdComment);

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
    },

    getChildCommentsByCommentId: async({ commentId }) => {
        try{
            var comments = await Comment.find({_id: commentId});

            return comments.map(comment => {
                return transformComment(comment);
            });

        } catch(err){
            throw(err);
        }
    },

    getAllRecentComments: async() => {
        try{
            var comments = await Comment.find({"date": {
                "$gte": new Date()- 86400000, //24 hours, begin date
                "$lt": new Date() //end date
            }});
            return comments.map(comment => {
                return transformComment(comment);
            });

        } catch(err){
            throw err;
        }
    },
}