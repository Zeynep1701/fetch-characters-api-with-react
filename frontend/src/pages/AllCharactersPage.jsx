import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllCharactersPage = () => {
  const [characters, setCharacters] = useState([])

  const fetchAllCharacters = async () => {
    try {
      const responseFromBackend = await fetch(`${import.meta.env.VITE_API_URL}/characters`)
      if (responseFromBackend.ok) {
        const parsed = await responseFromBackend.json()
        console.log(parsed)
        setCharacters(parsed)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllCharacters()
  }, [])

  return (
    <>
      <h2>Characters List</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}> {character.name}</Link>
          </li>
        ))}
        <Link to="/characters/create"><button>Create a new character!</button></Link>
      </ul>
    </>
  )
}

export default AllCharactersPage