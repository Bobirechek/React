"use client"

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  email?: string | undefined;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
};

export default function Profile() {
    const [userData, setData] = useState<User | null>(null);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    useEffect(() => {
        fetch("/api/user")
        .then(res => res.json()
        .then(data => {
            setData(data);
            setUsername(data.username);
            setName(data.name);
            setSurname(data.surname);
        }))
        .catch(console.error);
    }, []);

    const saveNewData = () => {
        fetch("/api/user", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                    username: username,
                    name: name,
                    surname: surname
                })
        })
        .then(() => setData({...userData, username: username, name: name, surname: surname}))
        .catch(er => alert(er.message));
    }
    
    return <div id="main">
        <div className="profile-block">
            <p className="back"
            onClick={() => redirect("/login")}
            >back</p>

            <h1 className="profile-header">Your profile</h1>

            <label className="profile-label username-label">
                <p className="profile-text">Username</p>
                <input type="text" disabled={!editMode} className="info-inp"
                placeholder="No username"
                value={username ? username : ""}
                onChange={(e) => setUsername(e.target.value)}/>
            </label>
            
            <label className="profile-label username-label">
                <p className="profile-text">Name</p>
                <input type="text" disabled={!editMode} className="info-inp"
                placeholder="No name"
                value={name ? name : ""}
                onChange={(e) => setName(e.target.value)}/>
            </label>

            <label className="profile-label username-label">
                <p className="profile-text">Surname</p>
                <input type="text" disabled={!editMode} className="info-inp"
                placeholder="No surname"
                value={surname ? surname : ""}
                onChange={(e) => setSurname(e.target.value)}/>
            </label>

            <div className="btn-block">
                <button className={editMode ? "edit-btn save-btn" : "edit-btn"}
                onClick={() => {
                    setEditMode(!editMode);
                    if (editMode) {
                        saveNewData();
                    }
                }}
                >{editMode ? "Save" : "Edit"}</button>
                <button className="edit-btn cancel-btn"
                style={{display: editMode ? "inline-block" : "None"}}
                onClick={() => {
                    if (userData) {
                        setUsername(userData.username ? userData.username : "");
                        setName(userData.name ? userData.name : "");
                        setSurname(userData.surname ? userData.surname : "");
                    }
                    setEditMode(!editMode);
                }}
                >Cancel</button>
            </div>
        </div>
        
    </div>
}
