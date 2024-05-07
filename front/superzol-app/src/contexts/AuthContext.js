import { createContext, useContext, useState,useMemo,useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (email, password) => {
    const response = await axios.post("http://localhost:8000/users/", {
            email: email,
            password: password
            }).catch((err ) => console.log(`Error: ${err}`));
            console.log("Registration successful:", response.data);
  };

  const login = async (email, password) => {
      try {
          const url = `http://localhost:8000/users/login/${email}/${password}`;
          const response = await axios.get(url);
          console.log("Login successful:", response.data);
          setCurrentUser(response.data);  // Set the entire response.data object as the currentUser

      } catch (err) {
          console.log(`Error: ${err}`);
      }
  };
  const logout = async () => {
      setCurrentUser(null);
  };
  useEffect(() => {
    console.log(currentUser);

  }, [currentUser]);
  
  const value = useMemo(() => ({
    currentUser,
    error,
    setError,
    login,
    register,
    logout,
    setLoading,
    loading
  }), [currentUser, error, loading]); // Dependencies array


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>

  );
};