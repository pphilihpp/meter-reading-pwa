import React from 'react'
import styled from 'styled-components'

import MeterInput from './MeterInput';
import DateInput from './DateInput';

const Contract = (props) => {

    return (
        <div>
            <ContractDetailContainer>
                <DetailsOne>{props.item.division} Vertrag: {props.item.number}</DetailsOne>
                <DetailsTwo>Zähler: {props.item.actualMeter}</DetailsTwo>
                <DataWrapper>
                    <p>Ablesedatum</p>
                    <DateInputWrapper>
                        {/* <BorderWrapper>
                            <DateIconWrapper><DateRangeOutlinedIcon style={{color: grey[600]}}/></DateIconWrapper>
                        </BorderWrapper> */}
                        <DateInput data={props.data} setData={props.setData} contractNo={props.contractNo}/>
                    </DateInputWrapper>
                    <p>Neuer Zählerstand</p>
                    <MeterInputWrapper unit={props.item.meterReadingDetails[0].massRead === "KWH" ? "kWh" : "m\u00B3"}
                        confirmationNeeded={props.confirmationNeeded} 
                        isConfirmed={props.isConfirmed}>
                        <MeterInput 
                            data={props.data} 
                            setData={props.setData} 
                            contractNo={props.contractNo} 
                            confirmationNeeded={props.confirmationNeeded} 
                            isConfirmed={props.isConfirmed}/>
                    </MeterInputWrapper>
                </DataWrapper> 
            </ContractDetailContainer>
                <Divider />
        </div>
    )
}

export default Contract

const ContractDetailContainer = styled.div`
    margin-bottom: 20px;
`

const DetailsOne = styled.div`
    margin-top: 10px;
    color: #002C5D;
    font-weight: bold;
    position: relative;

    &:after {
        content: "";
        width: 200%;
        height: 1.5px;
        position: absolute;
        left: -20px;
        bottom: -7px;
        background-color: rgba(88, 116, 148, 0.4);
    }
`
const DetailsTwo = styled.div`
    margin-top: 10px;
    color: #002C5D;
    font-weight: bold;
    position: relative;
`

const DataWrapper = styled.div`
    margin: 10px 0 0 30px;

    & p {
        font-weight: 400;
        margin-bottom: 5px;
        color: #002C5D;
    }
`

const DateInputWrapper = styled.div`
    margin-bottom: 10px;
`

const MeterInputWrapper = styled.div`
    position: relative;
    overflow: hidden;
    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: -5%;
        height: 110%;
        width: 70px;
        border-left: 1px solid ${({confirmationNeeded, isConfirmed}) => ((confirmationNeeded && !isConfirmed) ? "red" : "rgba(88, 116, 148, 0.4)")};
        z-index: 30;
    }
    &:after {
        content: "${props => props.unit}";
        text-align: center;
        position: absolute;
        right: 0;
        top: 5px;
        height: 100%;
        width: 70px;
        color: rgba(88, 116, 148, 0.6);
    }
`

const Divider = styled.div`
    margin-top: 0px;
    margin-bottom: 10px;
    width: 120%;
    transform: translateX(-20px);
    height: 2px;
    background-color: #587494;
`