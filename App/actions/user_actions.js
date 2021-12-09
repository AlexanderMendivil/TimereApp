import {GET_USER} from "./types"
import { USE_USER } from "./types"

export const getUser = (userId) =>(
    {
        type: GET_USER,
        data: userId
    }
)

export const useUser = (key) =>(
    {
        type: USE_USER,
        key: key
    }
)