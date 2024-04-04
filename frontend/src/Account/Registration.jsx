import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './acc.css';
import { storeUser } from "../helpers";


const initialUser = { email: "", password: "", username: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res.status === 200) {
          navigate("/login");
          user.identifier = user.email;
            try {
              if (user.identifier && user.password) {
                const { data } = await axios.post("http://localhost:1337/api/auth/local", user);
                if (data.jwt) {
                  storeUser(data);
                  setUser(initialUser);
                  navigate("/");
                }
              }
            } catch (error) {
              toast.error("Data tidak lengkap!", {
                hideProgressBar: true,
              });
            }
        }
      }else{
        toast.error("Data tidak lengkap!", {
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("User already exists!", {
        hideProgressBar: true,
      });
    }
  };
  


  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };
  
  return (
    <>
      <div className="fixed-top login-bg h-100 d-flex justify-content-center">
        <div className="rounded-5 login-bg2 my-auto bg-warning p-5" style={{width:'60vh'}}>
          <h2 className="text-center mt-2">Sign up</h2><p/>
            <div>Username:</div>
            <div className="input-group mb-3 input-group-lg">
              <input type="text" className="form-control" name="username" value={user.username} onChange={handleUserChange} placeholder="Enter your name"/>
            </div>
            <div>Email:</div>
              <div className="input-group mb-3 input-group-lg">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="email" className="form-control" name="email" value={user.email} onChange={handleUserChange} placeholder="Enter your email"/>
              </div>
            <div>Password:</div>
            <div className="input-group mb-3 input-group-lg">
              <input type="password" className="form-control mb-1" name="password" value={user.password} onChange={handleUserChange} placeholder="Enter password"/>
            </div>
            <button type="button" className="bg-dark text-white btn mb-3 btn-light btn-lg w-100" onClick={handleSignUp}> Sign Up </button>
            <ToastContainer />
            <div className="text-end">
              <span role="button" className="text-muted"  onClick={() => navigate('/login')}> Back to Login </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default Registration;