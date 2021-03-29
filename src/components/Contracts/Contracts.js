import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import { useMeasure } from "react-use";
import axios from 'axios'

import Contract from './Contract';
import { Button } from '../Button';

import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const Contracts = (props) => {
    const defaultHeight = "0px";
    
    //Animation states
    const [open, toggle] = useState(false); // Manages the open or cloased state of the accordion
    const [contentHeight, setContentHeight] = useState(defaultHeight); // The height of the content inside of the accordion
    const [ref, { height }] = useMeasure(); // Gets the height of the element (ref)
    //input states
    const [data, setData] = useState(props.data)
    const [implausible, setImplausible] = useState(false);
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false)

    const [showOfflinePrompt, setShowOfflinePrompt] = useState(false)

    const expand = useSpring({
        height: open ? `${contentHeight+10}px` : defaultHeight
    });

    useEffect(() => {
        setContentHeight(height); //Sets initial height
        window.addEventListener("resize", setContentHeight(height)); //Adds resize event listener
        return window.removeEventListener("resize", setContentHeight(height));  // Clean-up
    }, [height]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setConfirmationNeeded(false)
          setIsConfirmed(false)
        }, 5000);
        return () => clearTimeout(timer);
      }, [isConfirmed]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOfflinePrompt(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [showOfflinePrompt]);

    const handleSubmit=async (e) => {
        e.preventDefault();
        props.data.contracts.forEach((item, index) => {
            if (confirmationNeeded === true) {
                data.contracts[index].meterReadingDetails[0].resultNew.confirmed = true;
            } 
        })
        if (!isConfirmed) {
            submitMeter(data);
        }
    }

    navigator.serviceWorker.addEventListener('message', event => {
        console.log(event.data.message, event.data.url);
        // @Tim: Das ist der Event-Listener für die Nachricht vom ServiceWorker, wenn das Senden der Contracts nicht erfolgreich war.
        //alert(event.data.alert);
        setShowOfflinePrompt(true);
        setIsConfirmed(true);
    });

    function textSwitch() {
        switch (confirmationNeeded) {
            case false: 
                return "Zählerstand eingeben";
            case true:
                if(!isConfirmed) {
                    return "Zählerstand bestätigen";
                } else {
                    return `Zählerstand erfolgreich versendet`
                }
            default:
                return "default"
        }
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
                console.log("succesful sent")
                // setConfirmationNeeded("confirmed");
            if(resp.data.implausible && !implausible){ 
                setImplausible(true);
                setConfirmationNeeded(true);
            } else {
                setImplausible(false);
                setIsConfirmed(true)
                // setConfirmationNeeded("confirmed")
            }
            // resp.data.contracts[0].meterReadingDetails[0].resultNew.confirmed ? 
            //     setConfirmationNeeded("confirmed")
            //     : 
            //     setConfirmationNeeded(true);
        })
        .catch(function(err) {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                navigator.serviceWorker.ready
                    .then(function(sw) {
                    var post = {
                        id: new Date().toISOString(),
                        data: data
                        };
                    console.log(window);
                    window.writeData('sync-posts', post)
                        .then(function() {
                            return sw.sync.register('sync-new-posts');
                        })
                        .then(function() {
                            var data = {message: 'Your Post was saved for syncing!'};
                            console.log('Your Post was saved for syncing!');
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                    });
                }  else {
                    console.log(err);
            }
          });
    }    

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
                            <Contract 
                                item={item} 
                                key={index} 
                                contractNo={index} 
                                data={data} 
                                setData={setData}
                                confirmationNeeded={confirmationNeeded}
                                isConfirmed={isConfirmed}
                                />
                        ))
                    }
                    <Button 
                        type="submit"
                        primary={!confirmationNeeded}
                        margin="5px 0 10px 0"
                        width="100%"
                        onClick={handleSubmit}
                        disabled={isConfirmed ? true : false}
                    > 
                    {textSwitch()}
                    {isConfirmed ? <DoneIcon style={{ fontSize: 20, margin: "-5px 0 -5px 15px"}}/> : ""}
                    </Button>
                    {showOfflinePrompt ?
                        <OfflinePrompt>
                            <OfflineText>Die Eingabe wird abgesendet, sobald wieder eine Verbindung mit dem Internet besteht.</OfflineText>
                            <ErrorOutlineOutlinedIcon style={{color: "#587494", margin: "-25px 10px 0 0"}}/>
                        </OfflinePrompt>
                        : ""
                    }
                </ContractWrapper>
            </ContractContainer>
        </div>
    )
}

export default Contracts


const ContractHead = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
    border-bottom: solid 1px #002C5D;
    font-size: 14px;
    font-weight: 600;
    color: #002C5D;
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
    font-size: 14px;
    margin: 10px 0px 10px 10px;
    overflow: hidden;
`
const ContractWrapper = styled(animated.div)`
    background: rgba(172, 179, 191, 0.2);
    padding: 0 15px;
    border: 1.5px solid #002C5D;
    border-radius: 10px;
`
const OfflinePrompt = styled.div`
    display: flex;
    align-items: center;
`
const OfflineText = styled.p`
    color: #587494;
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
    padding: 0 15px 0 15px;
`
//*************************** */