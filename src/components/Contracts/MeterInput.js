import React, {useState} from 'react'
import styled from 'styled-components'

const MeterInput = (props) => {

    const [value, setValue] = useState("")

    const handleOnChange = (e) => {
        //useState is asynchron --> Solution: implement a check-btn, make it useful by connection a plausible check to it & change data only onClick --> create custom withPromiseHook e.g. https://ysfaran.github.io/blog/post/0002-use-state-with-promise/
        
        setValue(e.target.value);
        changeData(e);
        // console.log(props.data);
    }

    const changeData = (e) => {
        var newData=props.data;
        newData.contracts[props.contractNo].meterReadingDetails[0].resultNew.result=value;
        props.setData(newData);
    }

    return (
        <div>
            <StyledInput type="text" onChange={handleOnChange} value={value} placeholder={`this is a placeholder`}/> 
        </div>
    )
}

export default MeterInput

const StyledInput = styled.input`
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding-left: 5px;
`