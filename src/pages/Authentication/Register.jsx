import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { createUser, googlePopup, } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        googlePopup(googleProvider)
            .then(result => {
                console.log(result);
                // toast.success('Registration Successful!');
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                // toast.error('Registration Failed!')
            })
    }



    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');

        const email = form.get('email');
        const password = form.get('password');


        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRequirement = password.length >= 6;

        if (!uppercaseRegex.test(password)) {
            // toast.error('Password must contain at least one uppercase letter.');
            return;
        }

        if (!lowercaseRegex.test(password)) {
            // toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        if (!lengthRequirement) {
            // toast.error('Password must be at least 6 characters long.');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                //update
                updateProfile(result.user, {
                    displayName: name,

                })
                    .then(() => {
                        console.log('profile updated')
                    })
                    .catch()
                // toast.success('Registration Successful!');
                navigate(location?.state ? location.state : '/');

            })
            .catch(error => {
                console.error(error);
                // toast.error('Registration Failed!')
            });
    }
    return (
        <div className="hero min-h-screen "  >

            <div className="hero-content flex-col lg:flex-row ">
                <div className="text-center lg:m-8 lg:text-left">

                    <h1 className="text-2xl md:text-5xl font-semibold text-pink-900 mt-5">Welcome to Blossom!</h1>

                </div>
                <div className="card w-full  shadow-2xl bg-pink-200">
                    <h1 className="text-center font-bold text-xl md:text-4xl pt-2">Register</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>

                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required />
                                <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-pink-700 text-white">Register</button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center px-8 pb-3">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <div className="mx-4 text-gray-500">Or Register with</div>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mb-5 ">
                        <button onClick={handleGoogleSignIn} className="btn  bg-red-600 text-white">
                            <FaGoogle></FaGoogle>
                            Google
                        </button>

                    </div>
                    <p className="mb-4 text-center">Already have an account? <Link to="/login" className="text-pink-600 font-semibold">Login.</Link></p>
                </div>

            </div>
            {/* <ToastContainer /> */}

        </div>
    );
};

export default Register;