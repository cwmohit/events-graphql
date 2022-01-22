import React from "react";
export const AuthContext = React.createContext({
    userId: null,
    token: "",
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
