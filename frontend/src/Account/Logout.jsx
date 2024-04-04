import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './acc.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", "");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;