import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRout = (props) =>
{
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")
    useEffect(() =>
    {
        if(!token)
        {
            navigate("/")
        }
    } , [navigate , token])

    return props.children;
}
export default ProtectedRout