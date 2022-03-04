import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { prepareFormData } from '../../utilities/writeServices';

const AddCharacter = () => {

    // declare form variables. (these can also be written as state)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lightsaberColor, setLightsaberColor] = useState('');
    const [sideOfForce, setSideOfForce] = useState('');
    const [filmAppearances, setFilmAppearances] = useState('');
    const [characterImage, setCharacterImage] = useState('');

    const history = useHistory();


    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setCharacterImage(file);
    };


    // POST to api
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const addCharacterForm = { name, description, lightsaberColor, sideOfForce, filmAppearances, characterImage };

          console.log(addCharacterForm);
          const formConfig = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };

          const formData = prepareFormData(addCharacterForm);

          await axios.post('/api/characters', formData, formConfig);
          console.log('Posted successfully');
          history.push('/characters');

        } catch (error) {
          console.log(error.response.data);
        }
    };




    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500 flex flex-col justify-center py-12 px-6 lg:px-8">
      
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-700 transition duration-500 py-8 px-6 shadow rounded-lg sm:px-10">

            <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Character Name:</label>

                <div className="mt-1 ">
                  <input id="name" 
                        type="text" 
                        required
                        value={ name } 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Description:</label>

                <div className="mt-1">
                  <input id="description" 
                  type="text" 
                  required
                  value={ description } 
                  onChange={(e) => setDescription(e.target.value)}  
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Lightsaber Color:</label>

                <div className="mt-1">
                  <input id="lightsaberColor" 
                  type="text" 
                  required
                  value={ lightsaberColor } 
                  onChange={(e) => setLightsaberColor(e.target.value)} 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Side of Force:</label>

                <div className="mt-1">
                  <input id="sideOfForce" 
                  type="text" 
                  required
                  value={ sideOfForce } 
                  onChange={(e) => setSideOfForce(e.target.value)}  
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Film Appearances:</label>

                <div className="mt-1">
                  <input id="filmAppearances" 
                  type="number" 
                  required
                  value={ filmAppearances } 
                  onChange={(e) => setFilmAppearances(e.target.value)} 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Image for Character</label>

                <div className="mt-1">
                  <input id="characterImage" 
                  type="file" 
                  required
                  onChange={ handleFileChange } 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
              </div>

              <div>

              </div>
      
              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Character</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
}

export default AddCharacter