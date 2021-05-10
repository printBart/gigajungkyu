const userResolver = require('./users');
const postResolver = require('./post');
const commentResolver = require('./comment');
const voteResolver = require('./vote');
const messageResolver = require('./message');

const rootResolver = {
    ...userResolver,
    ...postResolver,
    ...commentResolver,
    ...voteResolver,
    ...messageResolver
};

module.exports = rootResolver;