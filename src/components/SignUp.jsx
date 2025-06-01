import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Base_Url } from '../utils/constant'
import store from '../utils/store'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSilce'

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store=>store.user);
    const firstName = useRef(null);
    const LastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    if(user) navigate("/");

    async function handleLogin() {
        try {
            const res = await axios.post(Base_Url+"/signUp", {
                firstName: firstName.current.value,
                LastName: LastName.current.value,
                email: email.current.value,
                password: password.current.value,
            },{
                withCredentials : true
            });

            if(res.status ==400) throw new Error("invalid credentials");
            dispatch(addUser(res.data.data));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card card-border bg-base-300 w-96 flex item-center justify-center my-12 mx-auto">
            <div className="card-body">
                <h2 className="text-3xl font-bold ">Sign Up</h2>

                <label htmlFor="firstName" className='mt-6'>FirstName : </label>
                <input id="firstName" className='bg-base-100 h-12 p-3' placeholder='Enter first name' ref={firstName} />

                <label htmlFor="LastName" className='mt-6'>LastName : </label>
                <input id="LastName" className='bg-base-100 h-12 p-3' placeholder='Enter lastName' ref={LastName} />

                <label htmlFor="email" className='mt-6'>Email : </label>
                <input id="email" className='bg-base-100 h-12 p-3' placeholder='Enter email' ref={email} />


                <label htmlFor="password" className='mt-6'>Password : </label>
                <input type="password" id="password" className='bg-base-100 h-12 p-3' placeholder="**********" ref={password} />


                <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary" onClick={handleLogin}>Login </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp