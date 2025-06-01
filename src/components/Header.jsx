import { useDispatch, useSelector } from "react-redux"
import store from "../utils/store";
import { Base_Url } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSilce";

const Header = () => {
    const user = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogOut(){
        const res =await axios.get(Base_Url+"/signOut",{
            withCredentials : true
        })
        dispatch(removeUser());
        navigate("/login");
    }

    return (
        <div className="navbar bg-base-200 shadow-sm px-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
            </div>
            <div className="flex gap-2">
                {user && 
                <div className="dropdown dropdown-end">
                    <div className="flex items-center gap-3">
                    <h2>hellow {user.firstName}</h2>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><Link to="/requests">Connections Requests</Link></li>
                        <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Header