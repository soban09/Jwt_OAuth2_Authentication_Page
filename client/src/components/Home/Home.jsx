import React, {useState} from 'react'
import { googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth-slice'
import userPhoto from '../../assets/user.jpg'

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [authFromGoogle, setAuthFromGoogle] = useState(user?.provider === 'Google');
    const dispatch = useDispatch()
    
    const logout = () => {
        googleLogout();
        localStorage.removeItem('profile')
        dispatch(authActions.logout())
    }

    return (
        <div>
            {authFromGoogle && <>
                <img src={user?.picture}></img>
                <h1>{user?.name}</h1>
            </>}
            {!authFromGoogle && <>
                <img src={userPhoto} width='100px'></img>
                <h1>{user?.firstName} {user?.lastName}</h1>
            </>}
            <p>or kya haal chaal?</p>
            {user && <button onClick={logout}>Logout</button>}
        </div>
    )
}

export default Home