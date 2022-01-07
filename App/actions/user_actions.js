import {GET_USER, GET_USER_IMAGE} from "./types"
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

export const getUserImage = (image) => (
    {
        type: GET_USER_IMAGE,
        data: image
    }
)
