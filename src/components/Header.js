import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img 
            className="w-44"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
            alt="logo" />

          {
            user && 
            <div className="flex p-2">
            <img 
              className="w-12 h-12 m-2"
              src={user?.photoURL} 
              alt="user icon"/>
            <button 
              onClick={handleSignOut}
              className="font-bold text-white cursor-pointer">Sign Out</button>
          </div>
          }
    </div>
  )
}

export default Header