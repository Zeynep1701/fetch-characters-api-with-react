import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CreateCharacter = () => {
    const [name, setName] = useState("")
    const [occupation, setOccupation] = useState("")
    const [weapon, setWeapon] = useState("")
    const [debt, setDebt] = useState(true)
    const navigate = useNavigate()
    const onSubmit = async event => {
        event.preventDefault()
        const payload = { name, occupation, weapon, debt }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/characters`,
                {
                    method: 'POST',
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
                navigate(`/characters`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            onSubmit();
        } catch {
            (error) => {
                console.log(error);
            };
        }
    }, []);
    return (
        <>
            <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
                <label>
                    Name
                    <input value={name} onChange={event => setName(event.target.value)} required />
                </label>
                <label>
                    Occupation
                    <input
                        value={occupation}
                        onChange={event => setOccupation(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Weapon
                    <input value={weapon} onChange={event => setWeapon(event.target.value)} required />
                </label>
                <button type='submit'>Create!</button>
            </form>
        </>
    )
}



export default CreateCharacter