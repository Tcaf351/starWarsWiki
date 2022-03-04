import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const SingleCharacter = (props) => {
    
    const { user } = props;

    const [data, setData] = useState({
        id: props.match.params.id,
        name: '',
        description: '',
        lightsaberColor: '',
        sideOfForce: '',
        filmAppearances: '',
        characterImage: '',
    });

    const { id, name, description, lightsaberColor, sideOfForce, filmAppearances, characterImage } = data;
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/characters/${id}`);
                const json = response.data;

                console.log(json);
                setData(CharacterData => ({ ...CharacterData, ...json }));
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [id]);

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/characters/${id}`);
            console.log(response);

            history.push('/characters');

        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition duration-500 h-screen">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-5">

            <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">

                <div className="xl:max-w-xl">
                    <h1 className="text-gray-900 dark:text-gray-100 transition duration-500 text-3xl font-bold lg:text-3xl xl:text-4xl">{name}</h1>
                    <img className="mt-6 rounded-lg shadow-xl sm:h-64 sm:w-full sm:object-cover object-center lg:hidden" src={characterImage} alt={name} />

                    <p className="mt-4 text-gray-800 dark:text-gray-100 transition duration-500 sm:text-lg">{name} is on the {sideOfForce} of the force in the Star Wars universe.</p>

                    <p className="text-gray-800 dark:text-gray-100 transition duration-500 sm:text-lg sm:mt-3">{name}'s lightsaber color that is used is a {lightsaberColor} lightsaber.</p>

                    <p className="text-gray-800 dark:text-gray-100 transition duration-500 sm:text-lg sm:mt-3">There have been {filmAppearances} films where this character has been featured in, many of which has been a major role.</p>

                    <p className="text-gray-800 dark:text-gray-100 transition duration-500 sm:text-lg sm:mt-3">{description}</p>

                </div>



                { user ?  <div className="mt-20">
                    <h1 className="dark:text-gray-100 transition duration-500">Admin Functions</h1>
                    <div>
                        <button className="bg-blue-500 inline-block px-5 py-2 rounded-lg shadow-lg uppercase tracking-wider font-semibold text-sm text-white"><Link to={`/editcharacters/${id}`}>Edit Character</Link></button>
                    </div>

                    <div>
                        <button className="bg-red-500 inline-block px-5 py-2 rounded-lg shadow-lg uppercase tracking-wider font-semibold text-sm text-white" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div> : null }

            </div>  

            <div className="hidden relative lg:block 2xl:col-span-3">
                <img className="absolute inset-0 w-full h-full object-cover object-center" src={characterImage} alt={name} />
            </div>

            </div>
        </div>
    )
}

export default SingleCharacter