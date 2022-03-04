import axios from 'axios';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    console.log(props);
    const { saveUser } = props;

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = user;
    const history = useHistory();

    

    const passwordConfirmRef = useRef();


    const handleTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
      }


    const handleSubmit = async (e) => {
        e.preventDefault()

        // early validation
        if (password !== passwordConfirmRef.current.value) {
            return;
        }


        try {
            const response = await axios.post(`/api/auth/register`, user);
            saveUser(response.data);
            history.push('/dashboard');


        } catch (error) {
            console.log(error.response.data);
        }
    };



    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 dark:bg-gray-900 transition duration-500 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <h1 className="dark:text-gray-100 transition duration-500">Register</h1>
                
                <form className="mt-8 space-y-6" onSubmit={ handleSubmit }>
                    <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label className="sr-only">
                        Username
                        </label>
                        <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={ handleTextChange }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="sr-only">
                        Email address
                        </label>
                        <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={ handleTextChange }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label className="sr-only">
                        Password
                        </label>
                        <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={ handleTextChange }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        />
                    </div>
                    <div>
                        <label className="sr-only">
                        Confirm Password
                        </label>
                        <input
                        name="confirm-password"
                        type="password"
                        ref={ passwordConfirmRef }
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Register
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Signup
