import React from 'react'
import styled from 'styled-components'
import WifiIcon from '@material-ui/icons/Wifi';

const ReconnectedBanner = () => {
    return (
        <Container>
            <Text>
                Internetverbindung wiederhergestellt!
            </Text>
            <Icon><WifiIcon fontSize="large"/></Icon>
        </Container>
    )
}

export default ReconnectedBanner

const Container = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
`

const Text = styled.p`
    display: flex;
    justify-content: center;
    align-self: center;
    color: white;

`
const Icon = styled.p`
    display: flex;
    justify-self: center;
    align-self: center;
    color: white;
`