import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    username: string,
    email: string,
    id: number,
    image: string
}
const initialState = {
    value:{
        isAuth: false,
        user: {

        }as User
    },
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logOut: ()=>{
            return initialState
        },
        logIn: (state, action)=>{
            return{
                value:{
                    isAuth: true,
                    user: action.payload.user
                }
            }
        }
    }
})

export const {logIn,logOut} = auth.actions
export default auth.reducer