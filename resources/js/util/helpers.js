function authCheck() {
    return localStorage.hasOwnProperty('user-token') && localStorage.hasOwnProperty('user-info');
}

function getAuth() {
    if (authCheck()) {
        return JSON.parse(localStorage.getItem('user-info'))
    }
    return [];
}

export { authCheck, getAuth }
