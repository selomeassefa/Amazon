import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataProvider";

export default function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext); //eslint-disable-line no-unused-vars

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return children;
}
