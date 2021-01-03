export function createPostQuery(title, description, creator, latitude, longitude, date){
    return{
        query:
        `mutation{
            createPost(title: "${title}", description:"${description}", creator: "${creator}", latitude: ${latitude}, longitude: ${longitude}, date: "${date}"){
                _id
                title
                description
                creator
                latitude
                longitude
                date
            }
        }`
    }
}

export function getAllPostsQuery(){
    return{
        query:
        `query{
            getAllPosts{
                _id
                title
                description
                creator
                latitude
                longitude
                date
            }
        }`
    }
}

export function createCommentQuery(description, creator, latitude, longitude, postId, parentCommentId){
    parentCommentId ? parentCommentId = '"' + parentCommentId + '"' : parentCommentId = null;
    return{
        query:
        `mutation{
            createComment(description: "${description}", creator: "${creator}", latitude: ${latitude}, longitude: ${longitude}, post: "${postId}", parentComment: ${parentCommentId}){
                _id
                description
                creator
                latitude
                longitude
                date
                post{
                    _id
                }
                parentComment{
                    _id
                }
                childComments{
                    _id
                }
            }
        }`
    }
}

export function getAllCommentsByPostIdQuery(postId){
    return{
        query:
        `query{
            getAllCommentsByPostId(postId: "${postId}"){
                _id
                description
                creator
                latitude
                longitude
                date
                post{
                    _id
                }
                childComments{
                    _id
                    description
                    creator
                    latitude
                    longitude
                    date
                    post{
                        _id
                    }
                    childComments{
                        _id
                        description
                        creator
                        latitude
                        longitude
                        date
                        post{
                            _id
                        }
                        childComments{
                            _id
                            description
                            creator
                            latitude
                            longitude
                            date
                            post{
                                _id
                            }
                        }
                    }
                }
            }
        }`
    }
}