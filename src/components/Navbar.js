import React from 'react'

const Navbar = () => {
    return (
        <nav className="grid">
            <h1 className="logo">Logo</h1>
            <h1 className="title">Zählerstandserfassung</h1>
            <span className="logout"><a href="/login">Logout</a></span>
        </nav>
    )
}

export default Navbar