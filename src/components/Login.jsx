import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Base_Url } from '../utils/constant'
import store from '../utils/store'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSilce'
import { Link } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const email = useRef(null);
    const password = useRef(null);
        const [errorMsg,setErrMsg] = useState("")
    


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);


    async function handleLogin() {
        try {
            if(!email && !password) throw new Error("all feilds are mandotary")
            const res = await axios.post(Base_Url + "/signIn", {
                email: email.current.value,
                password: password.current.value
            }, {
                withCredentials: true
            });

            dispatch(addUser(res.data.data));
            navigate('/')
        } catch (error) {
            setErrMsg(error.message)

            console.log("error" + error);
        }
    }

    return (
        <div className="card card-border bg-base-300 w-96  flex item-center justify-center my-12 mx-auto">
            <div className="card-body">
                <h2 className="text-3xl font-bold ">Login</h2>

                <label htmlFor="email" className='mt-12'>Email : </label>
                <input id="email" className='bg-base-100 h-12 p-3' placeholder='Enter email' ref={email} />

                <label htmlFor="password" className='mt-12'>Password : </label>
                <input type="password" id="password" className='bg-base-100 h-12 p-3' placeholder="**********" ref={password} />

                <p className='font-bold text-red-700'>{errorMsg}</p>

                <div className="card-actions justify-between mt-6">
                    <Link className="btn btn-primary" to='/signup'>Sign Up </Link>
                    <button className="btn btn-primary" onClick={handleLogin}>Login </button>
                </div>
            </div>
        </div>
    )
}

export default Login