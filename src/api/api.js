export const getWeather = async city => {
  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=268c9dc1c388bb08a938a9884b4c79fd`)
  return data.json()
}
