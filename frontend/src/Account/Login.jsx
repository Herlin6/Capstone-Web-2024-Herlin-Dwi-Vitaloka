import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { storeUser } from "../helpers";
import './acc.css';

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/local`, user);
        if (data.jwt) {
          toast.success("Berhasil Login!", {
            hideProgressBar: true,
          });
          storeUser(data);
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Periska Kembali Email dan Password", {
        hideProgressBar: true,
      });
    }
  };

  return (
        <div className="fixed-top login-bg h-100 d-flex justify-content-center">
          <div className="rounded-5 login-bg2 my-auto p-5" style={{width:'60vh'}}>
            <h2 className="text-center mt-2">Login</h2><p/>
              <div>Email:</div>
              <div className="input-group mb-3 input-group-lg">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="email" className="form-control" name="identifier" value={user.identifier} onChange={handleChange} placeholder="Enter your email"/>
              </div>
              <div>Password:</div>
              <div className="input-group mb-4 input-group-lg">
                <input type="password" className="form-control mb-1" name="password" value={user.password} onChange={handleChange} placeholder="Enter password"/>
              </div>
              <button type="button" className="bg-dark text-white btn mb-3 btn-light btn-lg w-100" onClick={handleLogin}> Log in </button>
              <button type="button"  onClick={() => navigate('/registration')} className="bg-dark text-white btn mb-5 btn-light btn-lg w-100"> Sign in </button>
              <ToastContainer />
          </div>
        </div>
  );
};

export default Login;
