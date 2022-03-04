import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const { saveUser } = props;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;
    const history = useHistory();

    const handleTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/auth/login`, user);
            saveUser(response.data);
            history.push('/dashboard');


        } catch (error) {
            console.log(error.response.data);
        }
    };



    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 dark:bg-gray-900 transition duration-500 sm:px-6 lg:px-8 ">
                <div className="max-w-md w-full space-y-8">
                <h1 className="dark:text-gray-100 transition duration-500">Login</h1>

                
                <form className="mt-8 space-y-6" onSubmit={ handleSubmit }>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                        Email address
                        </label>
                        <input
                        name="email"
                        type="email"
                        value={ email }
                        onChange={ handleTextChange }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                        Password
                        </label>
                        <input
                        name="password"
                        type="password"
                        value={ password }
                        onChange={ handleTextChange }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        
                        </span>
                        Sign In
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Login
