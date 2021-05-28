function userLikes(userData: any, numberoflikes: string) {
    return {
        username: userData.name,
        total_likes: numberoflikes
    };
}

function userNumberOfLikes(userData: any) {
    return {
        user_id: userData.source_user_id,
        total_likes: userData.numberoflikes
    };
}

export default { userLikes, userNumberOfLikes };
