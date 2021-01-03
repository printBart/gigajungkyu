const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const post = async postId => {
    try{
        const post = await Post.findById(postId);
        return{
            ...post._doc,
            _id: post.id
        }
    } catch(err){
        throw err;
    }
}

const comments = async commentIds => {
    try{
        const comments = await Comment.find({_id: {$in: commentIds}});
        return comments.map(comment => {
            return transformComment(comment);
        })
    } catch(err){
        throw err;
    }
}

const transformComment = comment => {
    return{
        ...comment._doc,
        _id: comment.id,
        post: post.bind(this, comment._doc.post),
        childComments: comments.bind(this, comment._doc.childComments)

    }
}

exports.transformComment = transformComment;