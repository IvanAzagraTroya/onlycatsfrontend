import { jwtDecode } from "jwt-decode";

export default function decodeJwt(jwt){
    const decodedToken = jwtDecode(jwt)
    return {
        "userId": decodedToken.id,
        "username": decodedToken.username,
        "role": decodedToken.role
    }
}