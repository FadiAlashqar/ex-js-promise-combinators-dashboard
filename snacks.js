async function getObj(url) {
    const response = await fetch(url)
    const obj = response.json()
    return obj
}

async function getDashboardData(query) {
    const cityCountryPromise = await getObj(`http://localhost:3333/destinations?search=${query}`)
    const weatherPromise = await getObj(`http://localhost:3333/weathers?search=${query}`)
    const airportPromise = await getObj(`http://localhost:3333/airports?search=${query}`)
    const promises = [cityCountryPromise, weatherPromise, airportPromise]
    const [destination, weather, airport] = await Promise.all(promises)

    return {
        city: destination[0].name,
        country: destination[0].country,
        temperature: weather[0].temperature,
        weather: weather[0].weather_description,
        airport: airport[0].name
    }
}

(async () => {
    const result = await getDashboardData('london')
    console.log(
        `${result.city} is in ${result.country}.\n` +
        `Today there are ${result.temperature} degrees and the weather is ${result.weather}.\n` +
        `The main airport is ${result.airport}.\n`
    );
})();