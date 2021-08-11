//https://github.com/WebDevSimplified/React-Firebase-Auth

import React, { useContext, useState, useEffect } from 'react'
import { auth, provider, firestore } from '../lib/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
       return auth.createUserWithEmailAndPassword(email, password) 
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signInWithGoogle() {
        return auth.signInWithPopup(provider)
    }

    async function generateUserDocument(user, additionalData) {
        if (!user) return;
        const userRef = firestore.doc(`users/${user.uid}`);
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            const { email, displayName, photoURL } = user;
            try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
                });
            } catch (error) {
                console.error("Error creating user document", error);
            }
        }
        const userDocument = await getUserDocument(user.uid)
        setCurrentUser(userDocument)
    return userDocument
    }
    

    async function getUserDocument(uid){
        if (!uid) return null;
        try {
            const userDocument = await firestore.doc(`users/${uid}`).get();
            return {
            uid,
            ...userDocument.data()
            };
        } catch (error) {
            console.error("Error fetching user", error);
        }
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        signInWithGoogle,
        generateUserDocument,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
