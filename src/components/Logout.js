import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './Button'

const Logout = ({setToken, fullName}) => {

    async function logoutUser () {
        await axios({ 
            method: 'GET',
            withCredentials: false,
            url: 'http://localhost:9000/logout', //process.env.API_URL + '/app/session',
            data: '' 
        })
        .then(resp =>{ 
            console.log('Logout erfolgreich');
            console.log('Status: ' + resp.status);
        })
        .catch(err => {
            console.log('Error: Status ' + err.response.status);
        });
    };

    const handleOnClick = () => {
        logoutUser();
        setToken();
    } 

    return (
        <LogoutWrapper>
            <LogoutContent>Sie sind angemeldet als {fullName}</LogoutContent>
            <Link to="/">
                <Button big="true" onClick={handleOnClick}>Abmelden</Button>
            </Link>
        </LogoutWrapper>
    )
}

export default Logout

const LogoutWrapper = styled.div`
    padding: 0 5px;
    /* padding: 0 calc((100vw - 1300px) / 2); */
`
const LogoutContent = styled.h6`
    margin-bottom: 120px;
    margin-top: 20px;
`