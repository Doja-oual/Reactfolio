import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from '@/services/mutations';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const[ user,setUser]= useState (null);
  const [loading,setLoading]= useState (true);
  const [token,setToken]= useState (null);

  const [loginMutation] = useMutation (LOGIN);

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");// verifie sision token existe
    if(storedToken){
      try{
        const decoded =jwtDecode(storedToken);
        if(decoded.exp * 1000 > Date.now()){
          setUser (decoded);
          setToken (storedToken);
        }else{
          localStorage.removeItem('token');
        }
      }catch (error){
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  },[]);

const login =async (email,password) =>{
  try{
    const {data }=await loginMutation({
      variables:{email,password},
    });
    const {token:newToken,user:userData}=data.login;
    
    localStorage.setItem("token",newToken);
    setToken(newToken);

    const decoded = jwtDecode(newToken);
    setUser({...decoded,...userData});
    return {success:true};

  }catch (error){
    console.error("Login error:", error);
    return {
      success:false,
      error:error.message || 'Erreur de connexion',
    };
  }
};
const logout =() =>{
  localStorage.removeItem("token");
  setUser(null);
  setToken (null);
};
const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

