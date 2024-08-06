import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthCheck = (props) =>
{
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")

    useEffect(() =>
    {
        if(token)
        {
            navigate("/dashboard")
        }
    } , [navigate , token])

    return props.children;
}

export default AuthCheck