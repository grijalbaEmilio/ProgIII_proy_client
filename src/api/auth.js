import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import jwtDecode from "jwt-decode";
import { basePath, apiVersion } from "./config"

export function userLogued(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const {user_name, lastname, role} = jwtDecode(accessToken)
    return {name : user_name, lastname : lastname, ROLE : role}
}


export function getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken || accessToken === "null") return null;

    return expireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken || refreshToken === "null") return null;
    return expireToken(refreshToken) ? null : refreshToken;
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

const expireToken = (token) => {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    //console.log(metaToken);
    const { fecha_expitacion } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > fecha_expitacion;
    ;
};

export function refreshAccessToken(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-token`
    const bodyObject= {
        refreshToken : refreshToken
    }
    const params ={
        method : "POST",
        body : JSON.stringify(bodyObject),
        headers : {
            "Content-Type" : "application/json"
        }
    }

    fetch(url, params).then((response)=>{
         if(response.status !== 200){
             return null
         }
         return response.json()
    }).then((result)=>{
        if(!result){
            logout();
        }else{
            const { accessToken, refreshToken} = result
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)
        }
    })
}