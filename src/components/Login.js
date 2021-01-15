import React, {useState} from 'react'
import { Link } from 'react-router-dom'
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
        <LoginTitle>Login</LoginTitle>
        <FormWrapper onSubmit={handleSubmit}>
            <InputContainer>
                <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="E-Mail eingeben"></Input>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort eingeben"></Input>
            </InputContainer>
            <Link to="/">
                <Button 
                    primary="true"
                    big="true"
                    bold="true"
                    width="60vw"
                    type="submit" 
                    disabled={!validateForm()}
                >
                    Anmelden
                </Button>
            </Link>
        </FormWrapper>
    </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    height: 80vh;
    width: 100vw;
    overflow: hidden;
    padding: 0 50px;
    /* padding: calc((100vw - 1300px) / 2); */
    color: #002C5D;
`

const LoginTitle = styled.h1`
    margin-top: 150px;
    font-size: clamp(3rem, 6vw, 8rem);
    font-weight: 600;
    color: #002C5D;

    @media screen and (min-width: 768px){
        margin-right: 5vw;
    }
`

const FormWrapper = styled.div`
    margin-top: 50px;
`


const InputContainer = styled.div`
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Input = styled.input`
    border: 2px solid #002C5D;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    padding-left: 8px;

    &::placeholder {
        color: #002C5D;
        opacity: 0.4;
        font-weight: 600;
    }
`
