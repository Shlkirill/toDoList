import { apiGetUserInfo, apiGetUsers } from "../../api/api";


const GET_USERS = 'GET_USERS'
const EDIT_USERS = 'EDIT_USERS'

export const getUsersAC = (users) => ({ type: GET_USERS, users })
export const editUsersAC = (newUsersList) => ({ type: EDIT_USERS, newUsersList })


let initialState = {
    usersList: []
}

const usersReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case GET_USERS:
            stateCopy = {
                ...state,
                usersList: action.users
            }
            return stateCopy
        case EDIT_USERS:
            let arrNewUserLits = state.usersList.map(item => {
                if (item.id == action.newUsersList.id) {
                    item = {
                        ...item,
                        ...action.newUsersList
                    }
                }
                return item
            })
            stateCopy = {
                ...state,
                usersList: arrNewUserLits
            }
            return stateCopy
        default:
            return state
    }
}

export const getUsersTC = () => {
    return (
        async (dispatch) => {
            let response = await apiGetUsers();
            dispatch(getUsersAC(response));
        }
    )
}
export const editUsersTC = (newUsersList) => {
    return (
        async (dispatch) => {
            // There should be PUT a request here
            dispatch(editUsersAC(newUsersList));
        }
    )
}

export default usersReducer