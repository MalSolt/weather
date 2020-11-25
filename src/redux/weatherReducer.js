import { createSlice } from '@reduxjs/toolkit'
import { getWeather } from '../api/api'

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: null,
    windSpeed: null,
    temp: null,
    tempfellsLike: null,
    pressure: null,
    iconId: null,
    weekdayName: null,
  },
  reducers: {
    updateWeather(state, action) {
      return action.payload
    },
  },
})

export const updateWeatherThunk = city => {
  return async dispatch => {
    const data = await getWeather(city)
    const windSpeed = Math.round(data.wind.speed)
    const temp = Math.round(data.main.temp) - 273
    const tempfellsLike = Math.round(data.main.feels_like) - 273
    const pressure = data.main.pressure
    const iconId = data.weather[0].id
    const weekdayName = new Date(data.dt * 1000).toLocaleString('ru', { weekday: 'long' })
    dispatch(weatherSlice.actions.updateWeather({ city, windSpeed, temp, tempfellsLike, pressure, iconId, weekdayName }))
  }
}

export const { updateWeather } = weatherSlice.actions

export default weatherSlice.reducer
