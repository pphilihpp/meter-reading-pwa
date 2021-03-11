import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const MeterInput = (props) => {

    const [value, setValue] = useState("")
    //const [isUpdated, setIsUpdated] = useState(false)

    const handleOnChange = (e) => {
        setValue(e.target.value);
        //useState is asynchron --> Solution: implement a check-btn, make it useful by connection a plausible check to it & change data only onClick --> create custom withPromiseHook e.g. https://ysfaran.github.io/blog/post/0002-use-state-with-promise/
        //==> Update gets triggered via useEffect, as simpler workaround of asynchron setState 
    }

    useEffect(() => {
        if(value) {
            changeData();
            console.log(value);
        }
    }, [value])

    const changeData = () => {
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