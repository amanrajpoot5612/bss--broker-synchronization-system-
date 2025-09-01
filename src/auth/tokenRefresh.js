const userTokens = {};

function storeToken(userId, token, expiresIn = 3600){
    userTokens[userId] = {
        token,
        expiresAt: Date.now() + expiresIn * 1000
    };
}

function refreshToken(userId){
    const newToken = `refreshed-token-for-${Date.now()}`;
    storeToken(userId, newToken);
    return newToken;
}

function getToken(userId){
    const tokenData = userTokens[userId];
    if(!tokenData){
        throw new Error("No token found for user");
    }

    if(Date.now() > tokenData.expiresAt){
        const newToken = refreshToken(userId);
        return newToken;
    }
}