import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidData2 } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const[erorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispath = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = ()=>{
    
      // if(message) return; //error
    //sign in/ sign out
    if(!isSignInForm){
      //sign up logic
        const message = checkValidData2(email.current.value, password.current.value, name.current.value);
        // setErrorMessage(message);
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            updateProfile(user, {
              displayName: name.current.value, photoURL:USER_AVATAR
            }).then(() => {
              // Profile updated!
              // and navigate
              const {uid, email, displayName, photoURL} = auth.current;
              dispath(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}));;
            }).catch((error) => {
              // An error occurred
              setErrorMessage(error);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " - " + errorMessage);
          });

    }
    else{
      const message = checkValidData(email.current.value, password.current.value);
        // setErrorMessage(message);
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);
      });
    }

  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
            ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
            ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <p className="text-red-500 font-bold">{erorMessage}</p>

        <button className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;