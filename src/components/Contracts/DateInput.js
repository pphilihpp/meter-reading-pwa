import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'
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
        console.log(newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.readingdateBilling);
        props.setData(newData);
    }
    return (
        <div>
            <DatePicker 
                locale="de"
                dateFormat="dd.MM.yyyy" 
                selected={value} 
                // onSelect={handleDateSelect} 
                onChange={date => setValue(date)} />
        </div>
    )
}

export default DateInput