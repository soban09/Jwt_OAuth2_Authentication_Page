import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name : 'auth',
    // if there is a profile in local storage, then the user is logged in
    initialState : {isLoggedIn:localStorage.hasOwnProperty('profile')},
    reducers : {
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice