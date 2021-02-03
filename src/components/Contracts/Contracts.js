import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import { useMeasure } from "react-use";
import axios from 'axios'

import { Button } from '../Button';

import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import grey from '@material-ui/core/colors/grey';


const Contracts = (props) => {
    const defaultHeight = "0px";
    
    //Animation states
    const [open, toggle] = useState(false); // Manages the open or cloased state of the accordion
    const [contentHeight, setContentHeight] = useState(defaultHeight); // The height of the content inside of the accordion
    const [ref, { height }] = useMeasure(); // Gets the height of the element (ref)
    //input states
    const [meterInput, setMeterInput] = useState("");
    const [dateInput, setDateInput] = useState("");


    const expand = useSpring({
        height: open ? `${contentHeight}px` : defaultHeight
    });

    useEffect(() => {
        setContentHeight(height); //Sets initial height
        window.addEventListener("resize", setContentHeight(height)); //Adds resize event listener
        return window.removeEventListener("resize", setContentHeight(height));  // Clean-up
    }, [height]);


    const handleSubmit=async (e) => {
        e.preventDefault();
        //submitMeter();
        props.data.contracts[0].meterReadingDetails[0].resultNew.result = meterInput;
        props.data.contracts[0].meterReadingDetails[0].resultNew.readingdateTarget = today;
        props.data.contracts[0].meterReadingDetails[0].resultNew.readingdateBilling = today;
        console.log(props.data);
        submitMeter(props.data);
    }

    async function submitMeter(data){ 
        await axios({
        method: 'POST',
        withCredentials: false,
        url: 'http://localhost:9000/meter-reading/contract-accounts/000800005001', //url: process.env.API_URL + '/app/session', //http://localhost:3000/login
        data: data,
        })
        .then(resp => {
            resp.data.error ? 
                console.log(resp.data.error) //Apply Function to show User login wasn't successful
                : 
                console.log(resp.data);
            // console.log(`${resp.data.data.personal.firstname} ${resp.data.data.personal.lastname}`)
            // console.log(resp.data.error);
        })
        // .catch(err => {
        //     console.log('Error: Status ' + err);
        // });
    }    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z';

    return (
        <div >
            <ContractHead>
                <ContractInfo>
                    <Adress>{props.data.premiseAddress.street} {props.data.premiseAddress.houseno}, {props.data.premiseAddress.zipcode} {props.data.premiseAddress.city}</Adress>
                    <AccId> (Konto: {props.data.number})</AccId>
                </ContractInfo>
                <Symbols>
                    <ContractSymbols>
                    {props.data.contracts.map((item, index) => (item.division === "ELECTRICITY" 
                    ? 
                    <ContractSymbol key={index}><PowerOutlinedIcon /></ContractSymbol>
                    :
                    <ContractSymbol key={index}><WhatshotIcon /></ContractSymbol>
                    ))}
                    </ContractSymbols>
                    <ExpandIconWrapper onClick={() => toggle(!open)} active={open}><ExpandMoreIcon style={{ fontSize: 40 }}/></ExpandIconWrapper>
                </Symbols>
            </ContractHead>

            <ContractContainer style={expand}>
                <ContractWrapper ref={ref}>
                    {
                        props.data.contracts.map((item, index) => (
                            <ContractDetailContainer key={index}>
                                <Details>{item.division} Vertrag: {item.number}</Details>
                                <Details>Zähler: {item.actualMeter}</Details>
                                <DataWrapper>
                                    <p>Ablesedatum</p>
                                    <DateInputWrapper>
                                        <BorderWrapper>
                                            <DateIconWrapper><DateRangeOutlinedIcon style={{color: grey[600]}}/></DateIconWrapper>
                                        </BorderWrapper>
                                    <Input type="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput} placeholder={today}/>
                                    </DateInputWrapper>
                                    <p>Neuer Zählerstand</p>
                                    <MeterInputWrapper>
                                        <Input type="text" onChange={(e) => setMeterInput(e.target.value)} value={meterInput} placeholder={`alter Zählerstand ${item.meterReadingDetails[0].resultOld.result}`}/> 
                                        <BorderWrapper>
                                            <DataType>{item.meterReadingDetails[0].massRead === "KWH" ? "kWh" : "m\u00B3"}</DataType>
                                        </BorderWrapper>
                                    </MeterInputWrapper>
                                    <Button 
                                        type="submit"
                                        primary="true"
                                        margin="10px 0 0 0"
                                        width="100%"
                                        onClick={handleSubmit}
                                    >Zählerstand eingeben</Button>
                                </DataWrapper> 
                            </ContractDetailContainer>
                        ))
                    }
                </ContractWrapper>
            </ContractContainer>
        </div>
    )
}

export default Contracts


const ContractHead = styled.div`
    display: grid;
    margin-left: 5px;
    grid-template-columns: 5fr 1fr;
    border-bottom: solid 1px #587494;
    font-size: 14px;
    font-weight: 600;
    color: #587494;
`
const ContractInfo = styled.div`
`
const Adress = styled.span`
`
const AccId = styled.span`
    white-space: nowrap;
`
const Symbols = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const ContractSymbols = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const ContractSymbol = styled.span`
`
const ExpandIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => props.active ? "rotate(180deg)" : ""};
`

//*************************** */

const ContractContainer = styled(animated.div)`
    background: rgba(172, 179, 191, 0.2);
    padding: 0 15px 10px;
    margin: 10px 0px 10px 30px;
    border: 1.5px solid #587494;
    border-radius: 10px;
    font-size: 14px;
    overflow: hidden;
`
const ContractWrapper = styled(animated.div)`
    
`
//*************************** */


const ContractDetailContainer = styled.div``

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