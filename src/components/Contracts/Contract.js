import React from 'react'
import styled from 'styled-components'

import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import grey from '@material-ui/core/colors/grey';
import MeterInput from './MeterInput';

const Contract = (props) => {

    const handleOnChangeDate = (e) => {
        var input = [...props.dateInput];
        input.splice(props.contractNo, 1, e.target.value);
        props.setDateInput(input);
    }
    return (
        <div>
            <ContractDetailContainer>
                <Details>{props.item.division} Vertrag: {props.item.number}</Details>
                <Details>Zähler: {props.item.actualMeter}</Details>
                <DataWrapper>
                    <p>Ablesedatum</p>
                    <DateInputWrapper>
                        <BorderWrapper>
                            <DateIconWrapper><DateRangeOutlinedIcon style={{color: grey[600]}}/></DateIconWrapper>
                        </BorderWrapper>
                    <Input type="date" onChange={handleOnChangeDate} value={props.dateInput[props.contractNo]} placeholder={props.today}/>
                    </DateInputWrapper>
                    <p>Neuer Zählerstand</p>
                    <MeterInputWrapper>
                        <MeterInput data={props.data} setData={props.setData} contractNo={props.contractNo}/>
                        <BorderWrapper>
                            <DataType>{props.item.meterReadingDetails[0].massRead === "KWH" ? "kWh" : "m\u00B3"}</DataType>
                        </BorderWrapper>
                    </MeterInputWrapper>
                </DataWrapper> 
            </ContractDetailContainer>
        </div>
    )
}

export default Contract

const ContractDetailContainer = styled.div`
    margin-bottom: 25px;
`

const Details = styled.div`
    margin-top: 10px;
    color: #587494;
    font-weight: bold;
`

const DataWrapper = styled.div`
    margin: 10px 0 0 50px;

    & p {
        font-weight: 600;
        margin-bottom: 0;
    }
`

const DateInputWrapper = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 5px;
`

const BorderWrapper = styled.div`
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: white;
    `

const DateIconWrapper = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
`

const DataType = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`

const Input = styled.input`
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding-left: 5px;
`

const MeterInputWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-gap: 5px;
`