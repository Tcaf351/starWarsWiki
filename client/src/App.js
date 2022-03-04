import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';

// import components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useDarkMode } from './components/useDarkMode';

// import pages
import Home from './pages/Home';
// import CharactersPage from './pages/CharacterPages/'
import AllCharacters from './pages/CharacterPages/AllCharacters';
import AddCharacter from './pages/CharacterPages/AddCharacter';
import EditCharacter from './pages/CharacterPages/EditCharacter';
import SingleCharacter from './pages/CharacterPages/SingleCharacter';
import NotFound from './pages/NotFound';

// import Auth pages
import Dashboard from './pages/Auth/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';



function App() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    let savedData = localStorage.getItem('user');
    savedData = JSON.parse(savedData);
    setUser(savedData);
  }, []);


  const onSaveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user);
  };


  const onLogout = (user) => {
    localStorage.removeItem('user');
    setUser(null);
  };


  return (
    <Router>
        <div className="App h-screen dark:bg-gray-900 transition duration-500">
            <Navbar user={ user } logout={ onLogout } />
                <Switch>
                    <Route path='/' exact component={Home} />

                    <Route path='/characters' exact render={(props) => <AllCharacters user={ user } {...props} />} />

                    <Route path='/characters/:id' exact render={(props) => <SingleCharacter user={ user } {...props} />} />

                    <Route path='/addcharacter' exact component={AddCharacter} /> {/* POST */}

                    <Route path='/editcharacters/:id' exact component={EditCharacter} />

                    <ProtectedRoute path='/dashboard' exact user={user} logout={onLogout} component={Dashboard} />

                    <Route path='/login' exact render={(props) => <Login saveUser={ onSaveUser } {...props} />} />

                    <Route path='/signup' exact render={(props) => <Signup saveUser={ onSaveUser } {...props} />} />
                    
                    <Route component={NotFound} />
                </Switch>
            </div>
    </Router>
  );
}

export default App;