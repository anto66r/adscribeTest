import React from "react"

import {setCookie} from "../../utils/general";

const Login = () => {

  const doLogin = () => {

    fetch('http://localhost:4000/auth')
      .then(res => res.json())
      .then(res => {
        setCookie('AuthToken', res.token, 1)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <button onClick={doLogin} className="btn btn-primary">Login</button>
    </>
  )
}


export default Login

