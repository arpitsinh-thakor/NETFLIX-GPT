import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10">

        {/* Logo */}
        <div
          onClick={() => navigate("/browse")}
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img
            className="w-28 sm:w-36 md:w-40 lg:w-44"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix"
          />
        </div>

        {/* User Section */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-4">

            {/* GPT Search */}
            <button
              onClick={handleGptSearchClick}
              className="
                group relative overflow-hidden
                rounded-lg
                bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600
                px-3 py-2
                text-xs font-semibold text-white
                shadow-lg shadow-purple-900/30
                transition-all duration-300
                hover:scale-105
                hover:shadow-purple-500/40
                sm:px-5 sm:py-2.5 sm:text-sm
                active:scale-95
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                ✨
                <span className="hidden sm:inline">
                  GPT Search
                </span>
                <span className="sm:hidden">
                  GPT
                </span>
              </span>

              <span
                className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-transform duration-700
                  group-hover:translate-x-full
                "
              />
            </button>

            {/* User Profile */}
            <div className="group relative">

              <div
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-white/20
                  bg-black/50
                  p-1
                  backdrop-blur-md
                  transition-all duration-300
                  hover:border-white/40
                  hover:bg-black/70
                "
              >
                <div
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full
                      bg-gradient-to-br from-gray-700 to-gray-900
                      text-lg
                      ring-2 ring-white/10
                      transition-all duration-300
                      group-hover:ring-red-500/70
                      sm:h-10 sm:w-10
                    "
                  >
                    👤
                  </div>

                <span className="hidden max-w-32 truncate pr-2 text-sm font-medium text-white md:block">
                  {user?.displayName || "User"}
                </span>
              </div>

              {/* Profile dropdown */}
              <div
                className="
                  invisible absolute right-0 top-12
                  w-48
                  translate-y-2
                  rounded-xl
                  border border-white/10
                  bg-black/90
                  p-3
                  opacity-0
                  shadow-2xl
                  backdrop-blur-xl
                  transition-all duration-200
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <div className="mb-3 border-b border-white/10 pb-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.displayName || "User"}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="
                    w-full rounded-lg
                    px-3 py-2
                    text-left text-sm
                    font-medium text-gray-300
                    transition-all duration-200
                    hover:bg-red-600
                    hover:text-white
                  "
                >
                  Sign Out
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </header>
  );
}

export default Header;