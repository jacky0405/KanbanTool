import axios from "axios";
import jwtDecode from "jwt-decode";
import setJWTToken from "../securityUtil/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            "type": GET_ERRORS,
            "payload": {}
        })
    } catch (err) {
        dispatch({
            "type": GET_ERRORS,
            "payload": err.response.data
        })
    }
}

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("api/users/login", LoginRequest);
        const {token} = res.data;
        // store token in localStorage
        localStorage.setItem("token",token);
        // set token in header
        setJWTToken(token);
        // decode token
        const decode = jwtDecode(token);
        dispatch({
            "type": SET_CURRENT_USER,
            "payload": decode
        })  
    } catch (err) {
        dispatch({
            "type": GET_ERRORS,
            "payload": err.response.data
        })
    }
}

export const logout = () => async dispatch => {
    localStorage.removeItem("token");
    setJWTToken(false);
    dispatch({
        "type": SET_CURRENT_USER,
        "payload": {}
    })
}
    