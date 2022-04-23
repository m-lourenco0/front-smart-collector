const parseJWT = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
        return null;
    }
};

export default parseJWT;