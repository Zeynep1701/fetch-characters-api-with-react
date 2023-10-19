import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CharacterDetails = () => {
  const { characterId } = useParams()
  const [character, setCharacter] = useState({})
  const [name, setName] = useState("")
  const [occupation, setOccupation] = useState("")
  const [weapon, setWeapon] = useState("")
  const [debt, setDebt] = useState(true)
  const navigate = useNavigate()
  const fetchCharacter = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`
      )
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json()
        console.log(parsedFromBackend)
        setCharacter(parsedFromBackend)
        setName(parsedFromBackend)
        setOccupation(parsedFromBackend)
        setWeapon(parsedFromBackend)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])
  const onSubmit = async event => {
    event.preventDefault()
    const payload = { name, occupation, weapon, debt }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        const currentCharacter = await response.json()
        console.log(currentCharacter)
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (character) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        navigate(`/characters`)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return character ? (
    <>
      <h2>Details of {character.name}</h2>
      <h3>Occupation: {character.occupation}</h3>
      <p>Weapon: {character.weapon}</p>
      <p>Update the character:</p>
      <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
        <label>
          Name
          <input value={character.name} onChange={event => setName(event.target.value)} required placeholder={character.name} />
        </label>
        <label>
          Occupation
          <input
            value={character.occupation}
            onChange={event => setOccupation(event.target.value)}
            required placeholder={character.occupation}
          />
        </label>
        <label>
          Weapon
          <input value={character.weapon} onChange={event => setWeapon(event.target.value)} required placeholder={character.weapon} />
        </label>
        <button type='submit'>Update!</button>
      </form>
      <button onClick={() => { handleDelete(character) }}>Delete this character</button>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default CharacterDetails