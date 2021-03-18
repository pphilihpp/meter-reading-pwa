import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import DatePicker, { registerLocale } from "react-datepicker";
import { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from 'date-fns/locale/de';
import {format} from 'date-fns'

registerLocale('de', de)

const DateInput = (props) => {
    const [value, setValue] = useState(new Date())    


        //useState is asynchron --> Solution: implement a check-btn, make it useful by connection a plausible check to it & change data only onClick --> create custom withPromiseHook e.g. https://ysfaran.github.io/blog/post/0002-use-state-with-promise/
        //==> Update gets triggered via useEffect, as simpler workaround of asynchron setState 

    useEffect(() => {
        if(value) {
            changeData();
        }
    }, [value])

    const changeData = () => {
        var newData=props.data;
        var formattedDate = format(value, "yyyy-MM-dd") + "T00:00:00.000Z"
        newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.readingdateTarget = formattedDate;
        newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.readingdateBilling = formattedDate;
        props.setData(newData);
    }
    return (
        <DatepickerCss>
            <DatePicker 
                locale="de"
                dateFormat="dd.MM.yyyy" 
                selected={value} 
                // onSelect={handleDateSelect} 
                onChange={date => setValue(date)} 
            />
        </DatepickerCss>
    )
}

export default DateInput

const DatepickerCss = styled.div`

    & > div.react-datepicker-wrapper {
        width: 100%;
    }
    & > div > div.react-datepicker__input-container input {
    height: 30px;
    border: 1px solid #587494;
    border-radius: 10px;
    padding-left: 5px;
    width: 100%;
    color: #002C5D;
    background-color: #FBFBFB;
    text-align: center;
    cursor: pointer;
    }
`