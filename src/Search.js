import React, {useState} from 'react'

export default function Search(props) {

    const [userInput, setUserInput] = useState('');

    const handleInput = e => {
        setUserInput(e.target.value);
    }

    const handleSubmit = e => {
        if (userInput.trim() !== '') {
            props.findCity(e, userInput);
            setUserInput('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type your city" onChange={handleInput} value={userInput}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
