const User = require("../../models/User");
const Post = require("..//../models/Post");
const Vote = require("../../models/Vote");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    voteThread: async({ voter, thread, value }) => {
        try{
            const voterUser = await User.findById(voter);
            const post = await Post.findById(thread);
            const posterUser = await User.findById(post.creator);
            if(!voterUser){
                throw new Error('User not found in database');
            }

            let alreadyVote = await Vote.aggregate([{$match: {post: ObjectId(thread), voter: ObjectId(voter)  }}]);
            let result;
            if(alreadyVote.length > 0){
                const vote = await Vote.findById(alreadyVote[0]._id);
                vote.value = vote.value + value;
                if(vote.value > 1){
                    vote.value = 1;
                }
                else if(vote.value < -1) {
                    vote.value = -1
                }
                else{
                    posterUser.points = await posterUser.points + value;
                    await posterUser.save();
                }
                result = await vote.save();
            } else{
                const vote = await Vote({
                    voter: voter,
                    post: thread,
                    value: value,
                    date: new Date().toISOString(),
                });

                result = await vote.save();

                const post = await Post.findById(thread);

                if(!post){
                    throw new Error('User not found in database');
                }
                post.votes.push(result);
                await post.save();
                posterUser.points = await posterUser.points + value;
                await posterUser.save();
            }

            return result;
            
        } catch(err){
            throw(err);
        }
    }
}