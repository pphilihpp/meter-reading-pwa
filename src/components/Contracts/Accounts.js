import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Contracts from './Contracts';



const Accounts = (props) => {

    const [contractData, setContractData] = useState()

    useEffect(() => {
        getContractData (props.token);
    }, [])

    async function getContractData (token){
        await axios({
            method: 'GET',
            withCredentials: false,
            url: 'http://localhost:9000/meter-reading',
        })
        .then(resp => {
            setContractData(resp.data);
        })
        .catch(err => {
        console.log('Error: Status ' + err);
        });
    }

    return (
        <div>
            <AccountContainer>
                {   contractData &&
                    contractData.map((item, index) =>(
                        <Contracts data={item} key={index}/>
                    ))
                }
            </AccountContainer>
        </div>
    )
}

export default Accounts


const AccountContainer = styled.div`
    margin: 10px 10px;
`