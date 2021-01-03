const userResolver = require('./users');
const postResolver = require('./post');
const commentResolver = require('./comment');

const rootResolver = {
    ...userResolver,
    ...postResolver,
    ...commentResolver
};

module.exports = rootResolver;