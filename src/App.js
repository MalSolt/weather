import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import styled from 'styled-components'
import { options } from './options'
import { updateWeatherThunk } from './redux/weatherReducer'

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto 0;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #dfe1e5;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const P = styled.p`
  margin-top: 10px;
  color: #878787;
`

const WeekdayName = styled(P)`
  text-align: center;
  margin-bottom: 5px;
`

export function App() {
  const { city, windSpeed, temp, tempfellsLike, pressure, iconId, weekdayName } = useSelector(state => state.state)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = city || 'London'
    dispatch(updateWeatherThunk(data))
  }, [])

  return (
    <Container>
      <Select placeholder={city} onChange={e => dispatch(updateWeatherThunk(e.label))} options={options} />
      <Flex>
        <div>
          <P>Температура: {temp} &deg;C</P>
          <P>Чувствуется как: {tempfellsLike} &deg;C</P>
          <P>Скорость ветра: {windSpeed} м/с</P>
          <P>Давление: {pressure} мм. рт. ст.</P>
        </div>
        <div>
          <WeekdayName>{weekdayName}</WeekdayName>
          <i className={`owf owf-${iconId} owf-5x`}></i>
        </div>
      </Flex>
    </Container>
  )
}
