import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import api from "../../utils/api";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("")

    // Signup api
    try{
      const response = await api.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message)
        return;
      }
      if (response.data && response.data.accessToken){
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    }
    catch(error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("Failed to signin. Please try again.");
      }
    }
  }

  return (
    <div>

      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">

          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input type="text" placeholder="Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-primary">Create Account</button>

            <p className="text-center text-sm mt-4">Already have an account? <Link to="/login" className="font-medium text-primary underline">Login</Link></p>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Signup;
