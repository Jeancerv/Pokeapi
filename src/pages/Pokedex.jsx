import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokeCard from '../components/Pokedex/PokeCard';
import SelectTypes from '../components/Pokedex/SelectTypes';
import Header from '../components/shared/Header';
import './styles/pokedex.css';

const Pokedex = () => {

    const {nameTrainer} = useSelector((state) => state);

    const [pokemons, setPokemons] = useState();
    const [selectValue, setSelectValue] = useState('allpokemons')

    useEffect(() => {
        if(selectValue === 'allpokemons') {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";
        axios
        .get(url)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err));
        } else {
            axios.get(selectValue)
            .then(res => {
            const results = res.data.pokemon.map(e => e.pokemon)
            setPokemons({results})
        })
            .catch(err => console.log(err))
        }
    }, [selectValue]);


    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.pokemon.value.trim().toLowerCase()
        navigate(`/pokedex/${inputValue}`)
        e.target.pokemon.value = ''
    }

    return (
    <div className='pokedex'>
        <Header />
        <h1 className='pokedex__title'>
            <span className='pokedex__title-name'>Hola {nameTrainer}</span>,
            aquí encontraras
            a tu pokemón favorito.
            </h1>
            <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__input' id="pokemon" type="text"  placeholder='Quien es ese pokemon?'/>
            <button className='pokedex__btn'>Buscar</button>
            </form>
            <SelectTypes setSelectValue={setSelectValue} />
        <div className='pokedex__container-pokemon'>
                {pokemons?.results.map((pokemon) => (
                    <PokeCard key={pokemon.url} pokemon={pokemon} />
                ))}
        </div>
    </div>
    );
};

export default Pokedex