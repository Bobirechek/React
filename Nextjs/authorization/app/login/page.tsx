"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import LogIn from "./login"
import SignUp from "./signup"

export default function Main() {
  return (
    <div id="main">
      <div className="autho-block">
        <SignUp />
        <LogIn />
      </div>
    </div>
  )
}
