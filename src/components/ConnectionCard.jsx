import React from 'react'
import { useSelector } from 'react-redux'

const ConnectionCard = ({conn}) => {
    const {toUserId,fromUserId} = conn
    
    const user = useSelector(store=>store.user);
    const connector= fromUserId._id==user._id ? toUserId: fromUserId;


    return (
        <li className="list-row">
            <div><img className="size-10 rounded-box" src={connector.photoUrl} /></div>
            <div>
                <div>{connector.firstName}</div>
                <div className="text-xs opacity-60">age : {connector.age?connector.age:"na"}</div>
                <div className="text-xs opacity-60">{connector.about}</div>
            </div>
      
        </li>

    )
}

export default ConnectionCard