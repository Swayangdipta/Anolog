export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage){
        let jwt = localStorage.getItem("ano_jwt")
        if(jwt){
            return JSON.parse(jwt)
        }else{
            return false
        }
    }

    return false
}

export const authenticateUser = user => {
    if(localStorage){
        localStorage.setItem("ano_jwt",JSON.stringify(user))
    }
}

export const deAuthenticateUser = () => {
    if(localStorage && localStorage.getItem("ano_jwt")){
        localStorage.removeItem("ano_jwt")
        return true
    }

    return false
}