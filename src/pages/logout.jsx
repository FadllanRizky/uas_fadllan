import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/token";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuth(); 
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
