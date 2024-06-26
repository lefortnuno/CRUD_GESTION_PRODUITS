import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Deconnection(props) {
    const Cmp = props.Cmp;
  
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      if (token) {
        localStorage.clear();
        navigate("/");
      }
    }, []);
  
    return (
      <>
        <Cmp />
      </>
    );
}