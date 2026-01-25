"use client"
// Войти

import { useState } from "react"
import Image from "next/image"
import showYey from "../../public/showPass.png"
import hideYey from "../../public/hidePass.png"
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation"

export default function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onLogin = async () => {
    signIn("credentials", {
        redirect: false,
        email,
        password,
    })
    .then(res => res?.error ? console.log(res.error) : redirect("/profile"));
    };

    
    const [isShow, setShow] = useState(false)

    return <div className="login">
        <h1 className="header">Log in</h1>
        <div className="inp-block">
            <label>
                <p>email</p>
                {/* <input className="log-inp" name="login" type="email" /> */}
                <input
                    className="log-inp"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            
            <label>
                <p>password</p>
                <input
                    className="log-inp"
                    type={isShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Image width={25} className="togglePass" alt="eye" src={isShow ? hideYey : showYey} onClick={() => setShow(!isShow)} />
            </label>
            
            <button className="log-btn" onClick={() => onLogin() }>Log in</button>
        </div>
        
    </div>
}