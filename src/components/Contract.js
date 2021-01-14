import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Button} from './Button'

const Contract = () => {

    var [meterInput, setMeterInput] = useState("");
    var [dateInput, setDateInput] = useState("");

            //============
        //Variables
        //User - Authenitcation
        const user = "techlabs";    //process.env.API_USERNAME;
        const pass = "Ju59W!84";    //process.env.API_PASSWORD;
        const auth = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64');
        //let cookieToken = '';

        const userData = {
            username: "techlabs",
            password: "Ju59W!84"
        }
    
        //===========

    const handleSubmit=async (e) => {
        e.preventDefault();
        //submit the current entry
        setMeterInput("");
        setDateInput("");

        //========Axios calls=========

        await axios({
            method: 'POST',
            withCredentials: true,
            url: "https://cos.bpc.ag/portal/app/session",       //url: process.env.API_URL + '/app/session', //http://localhost:3000/login
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'},
            data: userData
          })
          .then(resp => {
            //console.log('Login erfolgreich! Willkommen User: ' + resp.data.username);
            //resp.send('Login erfolgreich! Willkommen User: ' + resp.data.username);
            console.log(resp.data);
            //cookieToken = resp.headers['set-cookie'];
          })
          .catch(err => {
            console.log('Error: Status ' + err);
          });
    }


    return (
        <ContractContainer>
            <ContractHead>
                <ContractInfo>
                    <Adress>Musterstraße 30, 23546 Stadt {/** map dynamic Adress */}</Adress>
                    <AccId>(Konto: 800005003){/*map dynamic AccId */}</AccId>
                </ContractInfo>
                <Symbols>
                    <ContractSymbols>
                        <ContractSymbol>S{/** map dynamic gas Icon */}</ContractSymbol>
                        <ContractSymbol>G{/** map dynamic electricity Icon */}</ContractSymbol>
                    </ContractSymbols>
                    <DropdownSymbol>V{/** map dynamic Icon */}</DropdownSymbol>
                </Symbols>
            </ContractHead>
            <ContractWrapper>
                <Details>Typ{/** map dynamic Type*/} Vertrag: 013549812 {/** map dynamic ContractId*/}</Details>
                <Details>Zähler: 1234566 {/** map dynamic MeterId*/}</Details>
                <DataWrapper>
                    <p>Ablesedatum</p>
                    <DateInputWrapper>
                        <BorderWrapper>
                            <DataType>K{/** map dynamic Calendar Icon */}</DataType>
                        </BorderWrapper>
                    <Input type="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput} placeholder="Z.B. 01.01.2021"/>
                    </DateInputWrapper>
                    <p>Neuer Zählerstand</p>
                    <MeterInputWrapper>
                        <Input type="text" onChange={(e) => setMeterInput(e.target.value)} value={meterInput} placeholder="Z.B. 1.932.123,95"/>
                        <BorderWrapper>
                            <DataType>kWh{/** map dynamic Value? */}</DataType>
                        </BorderWrapper>
                    </MeterInputWrapper>
                    <Button 
                        type="submit"
                        primary="true"
                        margin="10px 0 0 0"
                        onClick={handleSubmit}
                    >Zählerstand eingeben</Button>
                </DataWrapper>
            </ContractWrapper>
        </ContractContainer>
    )
}

export default Contract

const ContractContainer = styled.div`
    margin-top: 20px;
    padding: 0 5px;
    /* padding: 0 calc((100vw - 1300px) / 2); */
`

const ContractHead = styled.div`
    display: grid;
    margin-left: 5px;
    grid-template-columns: 5fr 1fr;
    border-bottom: solid 1px #587494;
    font-size: 12px;
    font-weight: 500;
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
const DropdownSymbol = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

/**======
 * Body Part
 * ======*/
const ContractWrapper = styled.div`
    background: rgba(172, 179, 191, 0.2);
    padding: 0 15px 10px;
    margin: 10px 10px 10px 30px;
    border: 1px solid #587494;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 10px;
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
    `
const DataType = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-weight: 500;
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
