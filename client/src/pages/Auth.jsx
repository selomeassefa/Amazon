import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { DataContext } from "../components/DataProvider";
import { ClipLoader } from "react-spinners";

export default function Auth() {
  const [inputs, setInputs] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext); // eslint-disable-line
  const navigate = useNavigate();
  const navStateData = useLocation().state;

  const authHandler = (e) => {
    e.preventDefault();

    if (e.target.name === "signIn") {
      setIsLoading({ ...isLoading, signIn: true });
      signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
          navigate(navStateData?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading({ ...isLoading, signIn: false });
        });
    } else {
      setIsLoading({ ...isLoading, signUp: true });
      createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
          navigate(navStateData?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading({ ...isLoading, signUp: false });
        });
    }
  };

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section className="h-screen flex flex-col items-center">
      <Link to="/" className="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
          className="my-8 mx-auto object-contain w-[100px]"
        />
      </Link>

      <div className="w-[350px] flex flex-col rounded-md border-[1px] border-gray-300 p-5">
        <h1 className="text-2xl my-5 font-semibold">Sign-In</h1>
        {navStateData?.msg && (
          <small className="p-1.5 text-center text-red-500 font-bold">
            {navStateData?.msg}
          </small>
        )}
        <form action="" className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mb-2.5 py-2 px-4 bg-white w-full border-gray-400 border-[1px] rounded-md focus:outline-1 focus:outline-blue-400"
              onChange={handleInputChange}
              value={inputs?.email}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mb-2.5 py-2 px-4 bg-white w-full border-gray-400 border-[1px] rounded-md focus:outline-1 focus:outline-blue-400"
              onChange={handleInputChange}
              value={inputs?.password}
              required
            />
          </div>
          <button
            className="border-none bg-[#f0c14b] rounded-md w-full h-8 mt-2.5 cursor-pointer hover:bg-[var(--primary-shade)]"
            name="signIn"
            type="submit"
            onClick={authHandler}
          >
            {isLoading.signIn ? (
              <ClipLoader color="white" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="py-2.5 text-sm">
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          className="border-none rounded-md w-full h-8 mt-2.5 cursor-pointer bg-gray-300 hover:bg-gray-400"
          name="signUp"
          type="submit"
          onClick={authHandler}
        >
          {isLoading.signUp ? (
            <ClipLoader color="white" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <div className="bg-red-500 text-red-950 text-sm mt-4 p-2 text-center rounded-md">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
