import React from 'react'
import styled from 'styled-components'
import OfflineBanner from './OfflineBanner'
import ReconnectedBanner from './ReconnectedBanner'

const ConnectionBanner = ({gotReconnected}) => {

    return (
        <Container>
            {gotReconnected ? <ReconnectedBanner /> : <OfflineBanner />}
        </Container>
    )
}

export default ConnectionBanner

const Container = styled.div`
    padding: 10px 15px;
    background: #587494;
    border-bottom: 3px solid #002C5D;
`