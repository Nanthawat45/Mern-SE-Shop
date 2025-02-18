import React, { useContext } from 'react'
import GoogleWordmark from "./icons/googleIcon";
import {DiGithubFull}from "react-icons/di";
import {CiFacebook} from "react-icons/ci";
import { AuthContext } from '../context/AuthContext';
import {useNavigate, useLocation}from "react-router";

const SocilLogin = () => {
  const {login, signUpWithGoogle, signUpWithGithub, signUpWithFacebook}= useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  }=useForm();
  const onSubmit = (data)=>{
    console.log(data);

    createUser(data.email, data.password)
    .then((result)=>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon:"success",
        title:"Register Successful",
        showConfirmButton: false,
        timer:1500,
      });
      navigate(from,{replace:true});
    })
    .catch((error)=>{
      console.log(error);
    });
  };
  const googleSignUp = () => {
    signUpWithGoogle()
    .then((result)=>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon:"success",
        title:"Register white google Successful",
        showConfirmButton: false,
        timer:1500,
      });
      document.getElementById("login").closest();
      navigate(from,{replace:true});
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  
  const githubSignUp = () => {
    signUpWithGithub()
    .then((result)=>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon:"success",
        title:"Register white github Successful",
        showConfirmButton: false,
        timer:1500,
      });
      document.getElementById("login").closest();
      navigate(from,{replace:true});
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  const facebookSignUp = () => {
    signUpWithFacebook()
    .then((result)=>{
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon:"success",
        title:"Register white github Successful",
        showConfirmButton: false,
        timer:1500,
      });
      document.getElementById("login").closest();
      navigate(from,{replace:true});
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  return (
    <>
      <button className="bth bth-ghost btn-circle hover:bg-red">
        <GoogleWordmark className="w-6 h-6" onClick={googleSignUp}/>
      </button>
      <button className="bth bth-ghost btn-circle hover:bg-red">
        <DiGithubFull className="w-6 h-6" onClick={githubSignUp}/>
      </button>
      <button className="bth bth-ghost btn-circle hover:bg-red">
        <CiFacebook className="w-6 h-6" onClick={facebookSignUp}/>
      </button>
    </>
  )
}

export default SocilLogin