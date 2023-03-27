class UserManager {

    loggedUser = null;

    constructor(){
        this.loggedUser 
    }


    register = (username, password) => {
        return makeAPICall(SERVER_URL + '/users', {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
    }

    logIn = (username, password) => {
        return makeAPICall(SERVER_URL + '/login', {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(({sessionId, username}) => {
                localStorage.setItem('loggedUser', JSON.stringify({sessionId, username}))
        })
    }

    logOut = (sessionId) => {

        localStorage.setItem('loggedUser', null);

        return makeAPICall(SERVER_URL + "/logout", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                id: sessionId
            })
        })
        
    }

}