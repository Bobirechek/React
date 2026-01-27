"use client"

import { useState } from "react"
import Image from "next/image"
import showYey from "../../public/showPass.png"
import hideYey from "../../public/hidePass.png"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";

// зарегаться

export default function SignUpn() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSignUp = async () => {
    try {
        const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
        // console.error("Signup error:", data);
        alert(data.error || "Signup failed");
        return;
        }
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.ok) {
           router.push("/profile");
        } else {
            alert("Login after signup failed");
        }
        // console.log("Success:", data);
        
    } catch (err) {
        console.error("Network error:", err);
    }
    };  

    const [isShow, setShow] = useState(false)

    return <div className="signup">
        <h1 className="header">Sign up</h1>
        <div className="inp-block">
            <label className="login-label">
                <p>email</p>
                <input
                    className="sign-inp"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* <input className="sign-inp" name="login" type="emil" /> */}
            </label>
            
            <label className="login-label">
                <p>password</p>
                <input
                    className="sign-inp"
                    type={isShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Image width={25} className="togglePass" alt="eye" src={isShow ? hideYey : showYey} onClick={() => setShow(!isShow)} />
            </label>
            
            <button className="sign-btn" onClick={() => onSignUp()} >Sign up</button>
        </div>
    </div>
}