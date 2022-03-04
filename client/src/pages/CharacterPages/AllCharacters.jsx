import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CharactersPage = (props) => {
    const { user } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/characters`);
                setData(response.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="dark:bg-gray-900 transition duration-500 h-screen">
        
            {data.map(character => (
                <div key={character.id} className="flex justify-center items-center py-10" >
                    <img className="h-48 rounded-lg" src={ character.characterImage } alt={ character.characterName } />
                    <button className="bg-gray-300 rounded-md py-1 px-3 text-white"><Link to={`/characters/${character.id}`}>{character.name}</Link></button>
                </div>
            ))}


            { user ? <div className="flex items-center justify-center pb-11">

                <button className="bg-indigo-400 rounded-md mt-10 px-4 py-1 text-white text-lg hover:bg-indigo-600 transition ease-in duration-500"><Link to={'/addcharacter'}>Add Character</Link></button>
            </div> : null }

        </div>
    )
}

export default CharactersPage