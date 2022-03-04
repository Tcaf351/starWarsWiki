import { Link } from 'react-router-dom';
import { useDarkMode } from './useDarkMode';

const Navbar = (props) => {

    const { user, logout } = props;

    const [colorTheme, setTheme] = useDarkMode();

    return (
        <nav className="bg-gray-300 dark:bg-gray-600 transition duration-500">
            <ul className="text-gray-100 flex flex-col items-center lg:flex-row justify-end">

                    <span onClick={ () => setTheme(colorTheme) } className="w-10 h-10 items-center justify-center"> 
                    { colorTheme === 'light' ? (

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg> ) : ( 
                   
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>  

                    )}
                    </span>

                { user &&  <li className="text-blue-400 font-semibold uppercase px-20 py-1 lg:mx-2 lg:py-4">Welcome {props.user.user.username}</li>}

                {<li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:py-4"><Link to='/'>HOME</Link></li>}

                {<li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:py-4"><Link  to={'/characters'} >All Characters</Link></li>}

                { user &&  <li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:py-4"><Link  to={'/addcharacter'} >Add a Character</Link></li>}

                { user &&  <li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:py-4"><Link to='/dashboard'>ACCOUNT</Link></li>}

                { !user &&  <li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:py-4"><Link to='/login'>LOGIN</Link></li>}

                { user &&  <li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:mr-6 lg:py-4"><Link to='/login' onClick={() => { logout() }}>LOGOUT</Link></li>}
                
                { !user &&  <li className="py-1 hover:text-gray-500 transition ease-in-out duration-500 lg:mx-2 lg:mr-6 lg:py-4"><Link to='/signup'>REGISTER</Link></li>}
            </ul>
        </nav>
    )
}

export default Navbar