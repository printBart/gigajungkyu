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
                creator{
                    _id
                    username
                }
                latitude
                longitude
                emoji
                date
                isNightmode
            }
        }`
    }
}

export function createCommentQuery(description, creator, latitude, longitude, postId, parentCommentId){
    parentCommentId ? parentCommentId = '"' + parentCommentId + '"' : parentCommentId = null;
    return{
        query:
        `mutation{
            createComment(description: "${description}", creator: "${creator}", latitude: ${latitude}, longitude: ${longitude}, postId: "${postId}", parentComment: ${parentCommentId}){
                _id
                description
                creator{
                    _id
                    username
                }
                latitude
                longitude
                date
                post{
                    _id
                    title
                    description
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
                creator{
                    _id
                    username
                }
                latitude
                longitude
                date
                post{
                    _id
                }
                childComments{
                    _id
                    description
                    creator{
                        _id
                        username
                    }
                    latitude
                    longitude
                    date
                    post{
                        _id
                    }
                    childComments{
                        _id
                        description
                        creator{
                            _id
                            username
                        }
                        latitude
                        longitude
                        date
                        post{
                            _id
                        }
                        childComments{
                            _id
                        }
                    }
                }
            }
        }`
    }
}

export function getChildCommentsByCommentId(commentId){
    return{
        query:
        `query{
            getChildCommentsByCommentId(commentId: "${commentId}"){
                _id
                description
                creator{
                    _id
                    username
                }
                latitude
                longitude
                date
                post{
                    _id
                }
                childComments{
                    _id
                    description
                    creator{
                        _id
                        username
                    }
                    latitude
                    longitude
                    date
                    post{
                        _id
                    }
                    childComments{
                        _id
                        description
                        creator{
                            _id
                            username
                        }
                        latitude
                        longitude
                        date
                        post{
                            _id
                        }
                        childComments{
                            _id
                        }
                    }
                }
            }
        }`
    }
}

export function getAllRecentCommentsQuery(){
    return{
        query:
        `query{
            getAllRecentComments{
                _id
                description
                creator{
                    _id
                    username
                }
                latitude
                longitude
                date
                post{
                    _id
                    title
                    description
                    creator{
                        _id
                        username
                    }
                    latitude
                    longitude
                    date
                }
            }
        }`
    }
}

export function registerUserQuery(token, email, faculty){
    return{
        query:
        `mutation{
            registerUser(token: "${token}", email: "${email}", faculty: "${faculty}"){
                _id
                token
                username
                faculty
            }
        }`
    }
}

export function getUserByTokenQuery(token){
    return{
        query:
        `query{
            getUserByToken(token: "${token}"){
                _id
                token
                email
                username
                faculty
            }
        }`
    }
}