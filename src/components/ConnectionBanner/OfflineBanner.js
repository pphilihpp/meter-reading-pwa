import React from 'react'
import styled from 'styled-components'
import WifiOffIcon from '@material-ui/icons/WifiOff';

const OfflineBanner = () => {
    return (
        <Container>
            <Text>
                Derzeit besteht keine Verbindung mit dem Internet!
            </Text>
            <Icon><WifiOffIcon fontSize="large"/></Icon>
        </Container>
    )
}

export default OfflineBanner

const Container = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
`

const Text = styled.p`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Icon = styled.p`
    display: flex;
    justify-self: center;
    align-self: center;
    color: white;
`