import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidData2 } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage(null);
  };

  const handleButtonClick = async () => {
    setErrorMessage(null);

    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value;
    const nameValue = name.current?.value.trim();

    // Validation
    const message = isSignInForm
      ? checkValidData(emailValue, passwordValue)
      : checkValidData2(emailValue, passwordValue, nameValue);

    if (message) {
      setErrorMessage(message);
      return;
    }

    try {
      setIsLoading(true);

      if (!isSignInForm) {
        // SIGN UP
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: nameValue,
          photoURL: USER_AVATAR,
        });

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        // SIGN IN
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );

        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      }
    } catch (error) {
      console.error("Authentication Error:", error);

      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setErrorMessage("No account found with this email.");
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setErrorMessage("Incorrect email or password.");
          break;

        case "auth/email-already-in-use":
          setErrorMessage("An account already exists with this email.");
          break;

        case "auth/weak-password":
          setErrorMessage("Password should be at least 6 characters.");
          break;

        case "auth/too-many-requests":
          setErrorMessage(
            "Too many attempts. Please wait a moment and try again."
          );
          break;

        default:
          setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="fixed inset-0">
        <img
          src={BG_URL}
          alt="Netflix background"
          className="h-full w-full object-cover"
        />

        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Login Area */}
      <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleButtonClick();
          }}
          className="
            w-full max-w-md
            rounded-xl
            border border-white/10
            bg-black/75
            p-7 sm:p-10
            text-white
            shadow-2xl
            backdrop-blur-md
          "
        >
          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignInForm ? "Sign In" : "Create Account"}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              {isSignInForm
                ? "Welcome back. Continue watching your favorites."
                : "Join millions of people enjoying movies and shows."}
            </p>
          </div>

          {/* Name */}
          {!isSignInForm && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                ref={name}
                type="text"
                placeholder="Enter your full name"
                className="
                  w-full rounded-md
                  border border-gray-700
                  bg-[#1f1f1f]
                  px-4 py-3.5
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-red-600
                  focus:ring-1
                  focus:ring-red-600
                "
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <input
              ref={email}
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="
                w-full rounded-md
                border border-gray-700
                bg-[#1f1f1f]
                px-4 py-3.5
                text-white
                outline-none
                placeholder:text-gray-500
                transition
                focus:border-red-600
                focus:ring-1
                focus:ring-red-600
              "
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                autoComplete={
                  isSignInForm ? "current-password" : "new-password"
                }
                placeholder="Enter your password"
                className="
                  w-full rounded-md
                  border border-gray-700
                  bg-[#1f1f1f]
                  px-4 py-3.5 pr-16
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-red-600
                  focus:ring-1
                  focus:ring-red-600
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-xs font-medium
                  text-gray-400
                  transition
                  hover:text-white
                "
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              mt-2 w-full rounded-md
              bg-red-600
              px-4 py-3.5
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:bg-red-700
              hover:shadow-red-900/30
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {isSignInForm ? "Signing in..." : "Creating account..."}
              </span>
            ) : isSignInForm ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Extra options */}
          {isSignInForm && (
            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-red-600"
                />
                Remember me
              </label>

              <button
                type="button"
                className="hover:text-white hover:underline"
              >
                Need help?
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          {/* Toggle */}
          <p className="text-sm text-gray-400">
            {isSignInForm
              ? "New to Netflix-GPT?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={toggleSignInForm}
              className="
                ml-2
                font-semibold
                text-white
                transition
                hover:text-red-500
                hover:underline
              "
            >
              {isSignInForm ? "Sign up now" : "Sign in"}
            </button>
          </p>

          {/* Footer */}
          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
