export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return {
            'x-access-token': user.accessToken,
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        };
    } else {
        return {};
    }
}
