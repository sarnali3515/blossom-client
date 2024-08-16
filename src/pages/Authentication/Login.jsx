import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, googlePopup } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();


    const handleGoogleLogIn = () => {
        googlePopup(googleProvider)
            .then(result => {
                console.log(result);
                // toast.success('Login Successful')
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                // toast.error('Incorrect Email or Password');

            })
    }


    const handleLogin = e => {
        e.preventDefault();
        console.log(e.currentTarget)
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                // toast.success('Login Successful')
                navigate(location?.state ? location.state : '/');

            })
            .catch(error => {
                console.error(error);
                // toast.error('Incorrect Email or Password');
            })
    }
    return (
        <div className="hero min-h-screen "  >

            <div className="hero-content flex-col lg:flex-row ">
                <div className="text-center lg:m-8 lg:text-left">

                    <h1 className="text-2xl md:text-5xl font-semibold text-pink-900 mt-5">Welcome to Blossom!</h1>

                </div>
                <div className="card w-full  shadow-2xl bg-pink-200">
                    <h1 className="text-center font-bold text-4xl pt-2">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
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
                            <button className="btn bg-pink-700 text-white">Login</button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center px-8 pb-3">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <div className="mx-4 text-gray-500">Or Register with</div>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mb-5 text-xl">
                        <button onClick={handleGoogleLogIn} className="btn btn-outline bg-red-600 text-white">
                            <FaGoogle></FaGoogle>
                            Google
                        </button>

                    </div>
                    <p className="mb-4 text-center">Dont have an account? <Link to="/register" className="text-pink-600 font-semibold">Register.</Link></p>
                </div>

            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default Login;