import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import { useMeasure } from "react-use";
import axios from 'axios'

import { Button } from '../Button';

import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Contract from './Contract';


const Contracts = (props) => {
    const defaultHeight = "0px";
    
    //Animation states
    const [open, toggle] = useState(false); // Manages the open or cloased state of the accordion
    const [contentHeight, setContentHeight] = useState(defaultHeight); // The height of the content inside of the accordion
    const [ref, { height }] = useMeasure(); // Gets the height of the element (ref)
    //input states
    const [data, setData] = useState(props.data)
    const [meterInput, setMeterInput] = useState([]);
    const [dateInput, setDateInput] = useState([]);
    const [implausible, setImplausible] = useState(false);
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);

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
        // meterInput.forEach((item, index) => {
        //     props.data.contracts[index].meterReadingDetails[0].resultNew.result = item;
        //     if (confirmationNeeded === true) {
        //         props.data.contracts[index].meterReadingDetails[0].resultNew.confirmed = true;
        //     } 
        // })
        dateInput.forEach((item, index) => {
            props.data.contracts[index].meterReadingDetails[0].resultNew.readingdateTarget = today; //item,
            props.data.contracts[index].meterReadingDetails[0].resultNew.readingdateBilling = today//item
        })
        //console.log(props.data);
        submitMeter(data);
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
                console.log(resp.data.error) //Apply Function to show User action wasn't successful
                : 
                setConfirmationNeeded("confirmed");
                // resp.data.implausible ? 
                //     setImplausible(true) 
                //     : 
                //     setImplausible(false);

            // resp.data.contracts[0].meterReadingDetails[0].resultNew.confirmed ? 
            //     setConfirmationNeeded("confirmed")
            //     : 
            //     setConfirmationNeeded(true);
        })
    }    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z';

    return (
        <div>
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
                            <Contract item={item} key={index} contractNo={index} meterInput={meterInput} setMeterInput={setMeterInput} dateInput={dateInput} setDateInput={setDateInput} today={today} data={data} setData={setData}/>
                        ))
                    }

                    {(implausible&&(confirmationNeeded !== "confirmed")) ? <ErrMsg>Eingabe ist nicht plausibel</ErrMsg> : ""}
                    {/* {confirmationNeeded===true ? <ErrMsg>Eingabe muss bestätigt werden</ErrMsg> : ""} */}
                    {confirmationNeeded==="confirmed" ? <SuccessMsg>Eingabe wurde bestätigt</SuccessMsg> : ""}

                    <Button 
                        type="submit"
                        primary="true"
                        margin="0px 0 30px 0"
                        width="100%"
                        onClick={handleSubmit}
                    > {confirmationNeeded===true ? "Zählerstand bestätigen" : "Zählerstand eingeben"}</Button>
                    
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

const ErrMsg = styled.p`
    color: darkred;
    margin-bottom: 10px;
    margin-top: -15px;
`
const SuccessMsg = styled.p`
    color: darkgreen;
    margin-bottom: 10px;
    margin-top: -15px;
`
//*************************** */