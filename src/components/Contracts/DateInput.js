import React, {useState} from 'react'
// import styled from 'styled-components'
import DatePicker, { registerLocale } from "react-datepicker";
// import { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from 'date-fns/locale/es';
registerLocale('de', de)

const DateInput = (props) => {

    const [value, setValue] = useState(new Date())


    const handleOnChange = (e) => {
        //useState is asynchron --> Solution: implement a check-btn, make it useful by connection a plausible check to it & change data only onClick --> create custom withPromiseHook e.g. https://ysfaran.github.io/blog/post/0002-use-state-with-promise/
        
        setValue(e.target.value);
        changeData(e);
        console.log(props.data);
    }

    const changeData = (e) => {
        var newData=props.data;
        newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.readingdateTarget = value;
        newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.readingdateBilling = value;
        props.setData(newData);
    }
    return (
        <div>
            <DatePicker 
                locale="de"
                dateFormat="dd.MM.yyyy" 
                selected={value} 
                // onSelect={handleDateSelect} 
                onChange={handleOnChange} />
        </div>
    )
}

export default DateInput

// const StyledInput = styled.input`
//     height: 25px;
//     border: 1px solid rgba(0, 0, 0, 0.2);
//     border-radius: 10px;
//     padding-left: 5px;
// `