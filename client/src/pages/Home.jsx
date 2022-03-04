import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="w-full h-screen flex items-center flex-col justify-center bg-hero-image bg-cover bg-center ">

        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-0"></div>

            <div className="z-10">
            <h1 className="text-5xl text-white font-bold flex justify-center">Welcome to Star Wars Wiki</h1>
            </div>


            <div className="flex items-center justify-center z-10">
                <button className="bg-indigo-400 rounded-md mt-10 px-5 py-2 text-white text-2xl hover:bg-indigo-600 transition ease-in duration-500"><Link to="/characters">See Our Characters</Link></button>
            </div>
        </div>
    )
}

export default Home