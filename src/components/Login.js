import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import axios from 'axios'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //============
    //Variables
    //User - Authenitcation
    const user = "techlabs";
    //process.env.API_USERNAME;
    const pass = "Ju59W!84";
    //process.env.API_PASSWORD;
    const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');
    let cookieToken = '';

    const userData = {
        username: "techlabs",
        password: "Ju59W!84"
    }
  
    //===========


    function validateForm() {
        return username.length > 0 && password.length > 0;
        //valdiate with API
    }
    

    async function handleSubmit(e){
        e.preventDefault();
        await axios({
            method: 'POST',
            withCredentials: true,
            url: "https://cos.bpc.ag/portal/app/session",
            //url: process.env.API_URL + '/app/session',
            headers: {  'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
            data: userData
          })
          .then(resp => {
            //console.log('Login erfolgreich! Willkommen User: ' + resp.data.username);
            //resp.send('Login erfolgreich! Willkommen User: ' + resp.data.username);
            console.log(resp.data);
            //cookieToken = resp.headers['set-cookie'];
          })
          .catch(err => {
            console.log('Error: Status ' + err);
          });
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
            <Button block size="lg" type="submit" disabled={!validateForm()} href="/">
                Login
            </Button>
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
    padding: calc((100vw - 1300px) / 2);
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