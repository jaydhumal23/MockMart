import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '@/firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth';
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const registerEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginGoogle = () => signInWithRedirect(auth, googleProvider);
    const logout = () => {
        signOut(auth)
    }
    return (
        <AuthProvider.Provider value={{ user, loginEmail, registerEmail, loginGoogle, logout, loading }}>
            {!loading && children}
        </AuthProvider.Provider>
    )
}