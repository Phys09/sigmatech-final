import React, {useState} from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [loggedin, setLoggedin] = useState(false);
    const values = {user, setUser, username, setUsername, email, setEmail, loggedin, setLoggedin};

    return (
        <AuthContext.Provider value={values}>
          {children}
        </AuthContext.Provider>
    );
}
