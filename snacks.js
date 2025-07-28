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
        city: destination[0]?.name || null,
        country: destination[0]?.country || null,
        temperature: weather[0]?.temperature || null,
        weather: weather[0]?.weather_description || null,
        airport: airport[0]?.name || null
    }
}

(async () => {
    const result = await getDashboardData('vienna')
    console.log(
        `${result.city && result.country ? `${result.city} is in ${result.country}.\n` : ''}` +
        `${result.temperature && result.weather ? `Today there are ${result.temperature} degrees and the weather is ${result.weather}.\n` : ''}` +
        `${result.airport ? `The main airport is ${result.airport}.\n` : ''}`
    );
})();