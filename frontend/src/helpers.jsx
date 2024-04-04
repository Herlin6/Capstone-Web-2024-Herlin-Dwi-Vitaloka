import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      email: data.user.email,
      jwt: data.jwt,
    })
    );
  };
  export const userData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser || {});
};
// console.log(userData());

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};