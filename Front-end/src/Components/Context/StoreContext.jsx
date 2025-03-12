import React, {useState, createContext, useEffect} from 'react'

export const StoreContext = createContext();

export const StoreProvider = ({children})=>{
    const [token, setToken] = useState('');
    const [isOpen, setisOpen] = useState(false)
    useEffect(()=>{
      setToken(localStorage.getItem('token') || null);
    }, [])
    const proxy = "https://surat-box.onrender.com";
    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logout = () => {
      setToken(null);
      localStorage.removeItem('token');
    }
    const StoreValue = {
      token,
      setToken,
      login, 
      logout,
      proxy,
      isOpen,
      setisOpen
    }
    return (
      <StoreContext.Provider value={StoreValue}>
        {children}
      </StoreContext.Provider>
    )
}