import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { app } from '../../firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)


const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // for sign up
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //for login by email and password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }


    // logout
    const logOut = () => {
        return signOut(auth)
    }
    // login by google
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)
    }
   
    //capture user state
    // TODO JWT- done
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                axios.post('https://tasnia-yoga-and-meditation-school-server.vercel.app/jwt', {email : currentUser.email})
                .then(data=>{
                    // set when user = 1
                    localStorage.setItem('access-token' , data.data.token)

            })

        }
        else{
            // remove when user = 0
            localStorage.removeItem("access-token")
        }


        setLoading(false)
})
return ()=>{
    setLoading(true)
   return unsubscribe();
}
},[ ])
    // add nes user's name and photo
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut,
        googleLogin,
        updateUserProfile,
        setLoading,



    }
   

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;