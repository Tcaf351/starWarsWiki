import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getFilePathFromUrl, prepareFormData } from '../../utilities/writeServices';

const EditCharacter = (props) => {
  const [state, setState] = useState('IDLE');
  const [filePath, setFilePath] = useState('');

  
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lightsaberColor, setLightsaberColor] = useState('');
    const [sideOfForce, setSideOfForce] = useState('');
    const [filmAppearances, setFilmAppearances] = useState('');
    const [characterImage, setCharacterImage] = useState('');

  const history = useHistory();

  useEffect(() => {
    setState('INIT-LOAD')
    const fetchData = async () => {
      try {
          const response = await axios.get(`/api/characters/${props.match.params.id}`);
          console.log(props.match.params.id);
          console.log(response.data);
          setState('LOADED');

          setName(response.data.name);
          setDescription(response.data.description);
          setLightsaberColor(response.data.lightsaberColor);
          setSideOfForce(response.data.sideOfForce);
          setFilmAppearances(response.data.filmAppearances);
          setCharacterImage(response.data.characterImage);

          if (!response.data.characterImage) {
            console.log('no download url provided by db');
          } else {
            const oldFileName = getFilePathFromUrl(response.data.characterImage);
            setFilePath(oldFileName);
            console.log(oldFileName);
          }
          
      } catch (error) {
          console.log(error);
      }
    };
    fetchData();
  }, [props.match.params.id]);

  


  const handleFileChange = (e) => {
    setState('FILECHANGE')
    const file = e.target.files[0];
    setCharacterImage(file);
  };


  // POST to api
  const handleSubmit = async (e) => {
      e.preventDefault();
      setState('LOADING');
      try {
        const updateCharacterForm = { name, description, lightsaberColor, sideOfForce, filmAppearances, characterImage };

        console.log(updateCharacterForm);

        const formConfig = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };

        const formData = prepareFormData(updateCharacterForm, filePath);

        await axios.put(`/api/characters/${props.match.params.id}`, formData, formConfig);
        console.log('Updated successfully');
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
              <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Name:</label>

              <div className="mt-1">
                <input id="name" 
                      type="text" 
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
                value={ sideOfForce } 
                onChange={(e) => setSideOfForce(e.target.value)} 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Film Appearances:</label>

              <div className="mt-1">
                <input id="filmAppearances" 
                type="text" 
                value={ filmAppearances } 
                onChange={(e) => setFilmAppearances(e.target.value)} 
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white transition duration-500">Image for Character:</label>

              <div className="mt-1">
                  <input id="characterImage" 
                  type="file" 
                  onChange={ handleFileChange } 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:shadow-lg" />
                </div>
                { characterImage && state === 'LOADED' ? <div>
                  <img className="rounded-lg" src={ characterImage } alt="" />
                </div> : null }
            </div>

            <div>

            </div>
    
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit Character</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EditCharacter