import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {Button} from './Button'
//import axios from 'axios'


export default function Login({ setToken, setFullName }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const userData = {
    //     username: 'techlabs',
    //     password: 'test'
    // }
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //submit the current entry
        loginUser({
            username, 
            password
        });
        //console.log(userData);
        //setToken(token);
        //console.log(token);
    }

    async function loginUser(credentials){ 
        await axios({
        method: 'POST',
        withCredentials: false,
        url: 'http://localhost:9000/login', //url: process.env.API_URL + '/app/session', //http://localhost:3000/login
        data: credentials
        })
        .then(resp => {
            setToken(resp.data.cookie);
            setFullName(`${resp.data.data.personal.firstname} ${resp.data.data.personal.lastname}`);
            //console.log(`${resp.data.data.personal.firstname} ${resp.data.data.personal.lastname}`)
        })
        .catch(err => {
            console.log('Error: Status ' + err);
        });
    }    

    return (
    <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <FormWrapper>
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
                    onClick={handleSubmit}
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
