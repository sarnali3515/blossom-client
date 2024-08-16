import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    const navLinks =
        <>
            <li className="text-base font-medium"><NavLink to="/"> Home</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/products">All Products</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/about">About Us</NavLink></li>
        </>
    return (
        <div>
            <div className="navbar bg-pink-100 shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost italic font-bold md:text-4xl text-pink-900">Blossom</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end md:mr-5">
                    {
                        user ?
                            <button onClick={handleSignOut} className="btn bg-transparent rounded-xl border-pink-800 btn-sm">Logout</button>
                            :
                            <Link to="/login"><p className="btn bg-transparent rounded-xl border-pink-800 btn-sm">Login</p></Link>
                    }
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {
                            user &&
                            <div className="w-10 rounded-full" >
                                <img alt="Tailwind CSS Navbar component" src={user.photoURL} title={user.displayName} />
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;