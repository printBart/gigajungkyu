const userResolver = require('./users');
const postResolver = require('./post');
const commentResolver = require('./comment');
const voteResolver = require('./vote');

const rootResolver = {
    ...userResolver,
    ...postResolver,
    ...commentResolver,
    ...voteResolver
};

module.exports = rootResolver;