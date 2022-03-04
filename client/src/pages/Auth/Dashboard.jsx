import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    const { user, logout } = props;


    return (
        <div className="bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">
            <div className="max-w-full mx-auto sm:max-w-xl">

                <div className="h-screen flex flex-wrap justify-center flex-col">

                    <h1 className="font-semibold text-gray-100 text-xl mx-auto">Welcome { user ? user.user.username : null }</h1>
                    <h2 className="mt-6 text-gray-100">Email: { user ? user.user.email : null }</h2>
                    { user && user.user.isAdmin ? <p className="text-gray-100">Hello there { user.user.username } - you are an admin!</p> : null }

                    { user &&
                    <div className="mx-auto mt-10">
                        <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => { logout() }}>Log Out</button>
                    </div>}

                </div>

            </div>
        </div>
    )
}

export default Dashboard