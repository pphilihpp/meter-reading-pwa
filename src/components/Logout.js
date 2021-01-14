import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './Button'

const Logout = () => {
    return (
        <LogoutWrapper>
            <LogoutContent>Sie sind angemeldet als ...{/* Map dynamic content (name) */}</LogoutContent>
            <Link to="/login">
                <Button big="true">Abmelden</Button>
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