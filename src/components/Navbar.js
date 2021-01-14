import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLink to="/">Zählerstand eingeben</NavLink>
                <NavLink to="/faq">Fragen</NavLink>
                <NavLink to="/logout">
                    Logout
                </NavLink>
            </Nav>
        </div>
    )
}

export default Navbar

const Nav = styled.nav`
  background: #002C5D;
  height: 60px;
  padding: 0.5rem, calc((100vw - 1300px)/2);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
`

const NavLink = styled(Link)`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  border-right: 1px solid #587494;
  justify-content: center;
  align-items: center;

  &:hover{
    text-decoration: none;
  }
`