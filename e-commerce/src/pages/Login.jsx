import React from "react";
import GooglePic from "../Images/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        toast.success("User logged in Successfully", {
          position: "top-right",
        });
        navigate("/");
      }
    });
  };

  return (
    <div className=" mx-auto w-[80%] md:w-[60%] lg:w-[30%] h-52 bg-slate-200 p-4 rounded-md">
      <p className="text-center font-medium text-lg"> E-Comm Login</p>
      <div
        className="flex justify-center items-center cursor-pointer mt-4 bg-white rounded-md "
        onClick={signInWithGoogle}
      >
        <img src={GooglePic} alt="SignIn with Google" />
      </div>
    </div>
  );
};

export default Login;
