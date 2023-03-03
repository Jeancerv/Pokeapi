import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'
import './styles/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.name.value.trim()))
    e.target.name.value = ''
    navigate('/pokedex')
  }

  

  return (
    <div className='home'>
        <img className='home__img' src="/images/imageTitulo.png" alt="" />
        <h2 className='home__title'>Hola entrenador</h2>
        <p className='home__description'>Para comenzar con la pokedex, escribe tu nombre.</p>
        <form className='home__form' onSubmit={handleSubmit}>
            <input className='home__input' id='name' type="text" placeholder='Escribe tu nombre aquí!' />
            <button className='home__btn'>Entrar</button>
        </form>
    </div>
  )
}

export default Home