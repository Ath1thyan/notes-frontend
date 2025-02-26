import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import api from "../../utils/api";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("")

    // Login api
    try{
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    }
    catch(error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("Failed to login. Please try again.");
      }
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">

          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-primary">Login</button>

            <p className="text-center text-sm mt-4">Don&apos;t have an account? <Link to="/signup" className="font-medium text-primary underline">Sign up</Link></p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login;
