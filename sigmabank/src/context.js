import React, {useState} from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedin, setLoggedin] = useState(false);
    const values = {user, setUser, loggedin, setLoggedin};

    return (
        <AuthContext.Provider value={values}>
          {children}
        </AuthContext.Provider>
    );
}
