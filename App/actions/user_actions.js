import {GET_USER} from "./types"

export const getUser = (userId) =>(
    {
        type: GET_USER,
        data: userId
    }
)
