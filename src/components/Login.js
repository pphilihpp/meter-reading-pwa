import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    function validateForm() {
        return username.length > 0 && password.length > 0;
        //valdiate with API
    }
    

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
        <div className="Login">
            <div className="completeForm">
                <div className="head">
                    <h1>Willkomen bei BPC</h1>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Benutzername:</Form.Label>
                        <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Passwort:</Form.Label>
                        <Form.Control autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()} href="/">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login