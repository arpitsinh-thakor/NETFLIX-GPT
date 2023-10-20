import { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
        <Header/>
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_small.jpg" 
                alt="logo" />
        </div>
            <h1 className="font-bold text-3xl p-2 m-2 py-3">
                    {isSignInForm ? "Sign In" : "Sign Up"}</h1>
            
            {!isSignInForm && 
                    (<input type="text" placeholder="Full Name" 
                        className="p-2 m-2 w-full bg-slate-700 rounded-md"/>
                    )
            }
            <input type="text" placeholder="Email Address" 
                className="p-2 m-2 w-full bg-slate-700 rounded-md"/>
        
            <input type="text" placeholder="Password" 
                className="p-2 m-2 w-full bg-slate-700 rounded-md"/>
            <button 
                className="p-2 m-2 bg-red-600 w-full rounded-md"
                    >{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className="p-2 m-2 py-4 cursor-pointer"
                onClick={toggleSignInForm}
            > {isSignInForm ? "New to Netflix? Sign Up now." : "Already registered ? Sign In now"}</p>
        </form>
    </div>
  )
};

export default Login;