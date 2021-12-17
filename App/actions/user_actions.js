import {GET_USER} from "./types"
import { USE_USER } from "../actions/types";

export const getUser = (userId) =>(
    {
        type: GET_USER,
        data: userId
    }
    )
    
    export const useUser = (user) => (
    {
        type: USE_USER,
        data: user
    }
)
