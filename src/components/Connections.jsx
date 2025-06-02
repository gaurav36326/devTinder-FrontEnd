import React, { useEffect } from 'react'
import ConnectionCard from './ConnectionCard'
import axios from 'axios'
import { Base_Url } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector(store=>store.connection)
    const dispatch = useDispatch();

    async function fetchConnections(){
        const res = await axios.get(Base_Url+"/user/connections",{
            withCredentials : true
        })
        dispatch(addConnections(res.data.data))
    }

    useEffect(()=>{
        try {
            fetchConnections();
        } catch (error) {
            console.log(err)
        }
        
    },[])

    if(connections.length==0) return <h1>No connection available</h1>    
    
    return (
        <ul className="list bg-base-100 rounded-box shadow-md w-[50%] m-auto">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">people to whom you are connected with</li>
            {
                connections.map(
                    (conn)=>{
                        return (<ConnectionCard key={conn._id} conn={conn}/>)
                    }
                )
            }

        </ul>
    )
}

export default Connections