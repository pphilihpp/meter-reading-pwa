import React, {useState}from 'react'

const Contract = () => {

    var [inputNumber, setInputNumber] = useState("");

    const handleSubmit=(e) => {
        e.preventDefault();
        //submit the current entry
        setInputNumber("");
    }


    return (
        <div>
                <div className="contractContainer cOne">
                    <h1 className="contractName">Contract 1</h1>                        
                    <div className="contractContent">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos distinctio sint provident aperiam cupiditate voluptate? Dicta ea impedit non mollitia rem laboriosam aliquid iusto? In veniam quisquam repellendus ratione non!</div>
                    <input type="text" onChange={(e) => setInputNumber(e.target.value)} value={inputNumber} placeholder="type in your water meter"></input>
                    <button onClick={handleSubmit}>Abschicken</button>
                </div>
                <div className="contractContainer">
                    <h1 className="contractName">Contract 2</h1>
                    <div className="contractContent">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos distinctio sint provident aperiam cupiditate voluptate? Dicta ea impedit non mollitia rem laboriosam aliquid iusto? In veniam quisquam repellendus ratione non!</div>
                    <input type="text" placeholder="type in your water meter"></input>
                    <button onClick={handleSubmit}>Abschicken</button>
                </div>
        </div>
    )
}

export default Contract