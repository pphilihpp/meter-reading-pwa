import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {Button} from './Button'
import styled from 'styled-components'
//import axios from 'axios'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return username.length > 0 && password.length > 0;
        //valdiate with API
    }
    

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
    <LoginContainer>
        <LoginTitle>Willkommen bei BPC</LoginTitle>
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
                <Form.Label>Benutzername:</Form.Label>
                <Form.Control autoFocus type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
                <Form.Label>Passwort:</Form.Label>
                <Form.Control autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Link to="/">
                <Button 
                    primary="true"
                    type="submit" 
                    disabled={!validateForm()} 
                    >
                    Anmelden
                </Button>
            </Link>
        </Form>
    </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-wrap: wrap;
    display: flex;
    padding: 0 5px;
    /* padding: calc((100vw - 1300px) / 2); */
`
/*      const LoginWrapper = styled.div`      
`
*/
const LoginTitle = styled.h2`
    display: block;
    font-size: clamp(1.5rem, 6vw, 8rem);
    font-weight: 600;
    color: #1f263e;

    @media screen and (min-width: 768px){
        margin-right: 5vw;
    }
`