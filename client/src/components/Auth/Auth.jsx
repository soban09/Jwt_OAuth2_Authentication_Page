import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth-slice'

const emptyFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const [isSignUp, setSignUp] = useState(false)
    const [formData, setFormData] = useState(emptyFormData)
    const dispatch = useDispatch()

    const switchMode = () => {
        setSignUp((prevSignUp) => !prevSignUp);
    }

    const handleChangeFormData = (e) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault()
        // console.log(formData);

        try {
            let url
            console.log(process.env.REACT_APP_URL);
            if(isSignUp){
                url = process.env.REACT_APP_URL + '/register'
            }
            else{
                url = process.env.REACT_APP_URL + '/login'
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error('Something bad happened')
            }

            const data = await response.json();
            // console.log(data);

            // localStorage.setItem('profile', JSON.stringify(data.user))
            localStorage.setItem('profile', JSON.stringify({...data.user, provider:"jwt"}))
            dispatch(authActions.login())
        }
        catch (err) {
            console.log(err);
        }

        setFormData(emptyFormData)
    }

    const onSuccessHandler = (response) => {
        // console.log(response);
        const decoded = jwt_decode(response.credential)
        // console.log(decoded);
        // localStorage.setItem('profile', JSON.stringify(decoded))
        localStorage.setItem('profile', JSON.stringify({...decoded, provider:"Google"}))
        dispatch(authActions.login())
    }

    return (
        <form onSubmit={submitForm}>
            <h1>{isSignUp ? 'Sign up' : 'Sign in'}</h1>
            {isSignUp && (
                <>
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChangeFormData} value={formData.firstName} />
                    <br></br>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChangeFormData} value={formData.lastName} />
                    <br></br>
                </>
            )}
            <input type="email" name="email" placeholder="Email" onChange={handleChangeFormData} value={formData.email} />
            <br></br>
            <input type="password" name="password" placeholder="Password" onChange={handleChangeFormData} value={formData.password} />
            <br></br>

            {isSignUp && <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChangeFormData} value={formData.confirmPassword} />}
            <br></br>


            <button type="submit">{isSignUp ? 'Sign up' : 'Sign in'}</button>

            {isSignUp && <p>Already have an account? <span onClick={switchMode}>Sign in</span></p>}
            {!isSignUp && <p>Don't have an account? <span onClick={switchMode}>Sign up</span></p>}

            <GoogleLogin
                onSuccess={onSuccessHandler}
                onError={(error) => console.log(error)}
            />
        </form>
    )
}

export default Auth