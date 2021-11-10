import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    );
}
