import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function AddNewPostButton() {
    const {currentUser} = useAuth()
    return (
        //if current user exists, render a button that redirects to /makeNewDebate
        //else render a (deactivated) button which pops up an alert or a modal that prompts the user to log in
        <div>
            
        </div>
    )
}
