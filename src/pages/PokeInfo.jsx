import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PokeInfo = () => {

const { id } = useParams()

const [poke, setPoke] = useState()
const [hasError, setHasError] =useState(false)

useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(url)
    .then(res => {
        setPoke(res.data) 
        setHasError(false)
    })
    .catch(err => {
        setHasError(true)
        console.log(err)
    })
}, [id])

if(hasError) {
    return <h1>❌ El pokemon con el nombre "{id}" no lo tenemos o no existe 😔</h1>
}  else {
    return (
    <div>
        <img src={poke?.sprites.other['official-artwork'].front_default} alt="" />
        <h1>{poke?.name}</h1>
    </div>
    )
}


}

export default PokeInfo