import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {Button} from './Button'


export default function Login({ setToken, setFullName }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials, setWrongCredentials] = useState(false);
    

    useEffect(() => {
        setWrongCredentials(false);
      }, [username, password]);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUser({
            username, 
            password
        });
    }

    async function loginUser(credentials){ 
        await axios({
            method: 'POST',
            withCredentials: false,
            url: 'http://localhost:9000/login', //url: process.env.API_URL + '/app/session', //http://localhost:3000/login
            data: credentials
        })
        .then(resp => {
            if(resp.data.error) {
                setWrongCredentials(true);
            } else {
                setToken(resp.data.cookie);
                setFullName(`${resp.data.data.personal.firstname} ${resp.data.data.personal.lastname}`);
            }
        })
    } 

    // navigator.serviceWorker.addEventListener('message', event => {
    //     console.log(event.data.message, event.data.url);
    //     //Das ist der Event-Listener für die Nachricht vom ServiceWorker, wenn der Login nicht erfolgreich war.
    //     //alert(event.data.alert);
    // });

    return (
    <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <FormWrapper>
            <InputContainer>
                <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="E-Mail eingeben" wrongCredentials={wrongCredentials}></Input>
                {wrongCredentials ? <ErrMsg>Ungültiger Benutzername oder Passwort.</ErrMsg> : ""}
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort eingeben" wrongCredentials={wrongCredentials}></Input>
                {wrongCredentials ? <ErrMsg>Ungültiger Benutzername oder Passwort.</ErrMsg> : ""}
            </InputContainer>
            <Link to="/">
                <Button 
                    primary="true"
                    big="true"
                    bold="true"
                    width="60vw"
                    type="submit" 
                    disabled={!validateForm()}
                    onClick={handleSubmit}
                    margin="15px 0 0 0"
                >
                    Anmelden
                </Button>
            </Link>
        </FormWrapper>
    </LoginContainer>
    )
}

Login.propTpyes = {
    setToken: PropTypes.func.isRequired
}

const LoginContainer = styled.div`
    height: 80vh;
    width: 100vw;
    overflow: hidden;
    padding: 0 50px;
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
    justify-content: space-between;
`

const Input = styled.input`
    border: 2px solid ${({wrongCredentials}) => wrongCredentials ? "red" : "#002C5D"};
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
const ErrMsg = styled.p`
    margin-top: 5px;
    margin-bottom: 15px;
    color: red;
    border-radius: 5px;
`