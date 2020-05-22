import React, {useState, useEffect} from 'react';
import '../src/style/App.css'
import Weather from './Weather';
import Search from './Search';

function App() {

    const [data, setData] = useState([]);
    const [city, setCity] = useState('Berlin');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_KEY}&units=metric`)
        .then(response => response.json())
        .then(dataFromServer => {
            setData(dataFromServer);
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })

    }, [city])


    const findCity = (e, userInput) => {
        e.preventDefault();
        let cityFromUser = '';
        
        if (userInput.includes(' ')) {
            let words = userInput.split(' ');
            words.map(word => {
                cityFromUser += word[0].toLocaleUpperCase() + word.substring(1) + ' ';
            })
        } else {
            cityFromUser = userInput[0].toLocaleUpperCase() + userInput.substring(1);
        }
        
        setCity(cityFromUser);
    }

    return (
        <div className="App">
            <h1>Weather App</h1>

            {loading ? <h2>Loading...</h2> : null}
            
            {data.main ? 
                <Weather 
                    city={city} 
                    max={data.main.temp_max} 
                    min={data.main.temp_min} 
                    temp={data.main.temp} 
                    feelsLike={data.main.feels_like} 
                    humidity={data.main.humidity} 
                    description={data.weather[0].description}
                    icon={data.weather[0].icon}
                /> 
            : <h2>{data.message}</h2>}

            <Search findCity={findCity} />
        </div>
    );
}


export default App;