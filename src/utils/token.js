import { jwtDecode } from "jwt-decode";

function saveToken(token)
{
    localStorage.setItem("access_token", token);
}
function destroyToken()
{
    localStorage.removeItem("access_token")
}

 function getToken()
 {
    try
    {
        return jwtDecode(localStorage.getItem("access_token"))
    }
    catch(error)
    {
        console.log(error);
    }
 }

export {saveToken, destroyToken , getToken}