import { useState } from "react";
import axios from "axios";
import {TextField, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";




const Login = () =>{
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 // EVENT HANDLER FOR LOGIN

 const handlelogin = async () => {
    if(!username || !password) {
        alert("Please fil in all fields");
    }
     
    try {
        const response = await axios.post("http://localhost:5000/login", {username, password }, {headers: {"Content-Type": "application/json"}});


        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Store username
        alert("Login successful!");
        navigate("/dashboard");
    } catch (error){
        alert(error.response?.data?.message || "Invalid Credentials");
    }
 };


  return(

  <Container>
  <Typography variant="h4">Login</Typography>
  <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
  <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
  <Button variant="contained" color="primary" fullWidth onClick={handlelogin}>
    Login
  </Button>
  </Container>



  );
  




};
export default Login;