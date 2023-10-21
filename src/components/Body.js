import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Browse from "./Browse"
import Login from "./Login"
import { useEffect } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";


const Body = () => {
    const dispath = useDispatch();
    const appRounter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>,
        },
        {
            path: "/browse",
            element: <Browse/>,
        },
    ]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL} = user;
              dispath(addUser({uid: uid, email:email, displayName:displayName, photoURL:photoURL}));
            } else {
              dispath(removeUser());
            }
          });
    }, []); 

  return (
    <div>
        <RouterProvider router={appRounter}/>
    </div>
  )
};

export default Body;
