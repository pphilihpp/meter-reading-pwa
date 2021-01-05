import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <div>
            <FooterWrapper>
                <span>copyright Techlabs community</span>
            </FooterWrapper>
        </div>
    )
}

export default Footer

const FooterWrapper = styled.div`
    background-color: #7c93aa;
    color: #00000075;
    position: sticky;
    width: 100%;
    bottom: 0px;
    padding: 10px 0px;
    text-align: center;
`