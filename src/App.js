import React, { useState } from 'react';

import Login from './Components/Login';
import Register from './Components/Register';
import UserProfile from './Components/UserProfile';

function App() {

    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        setUser(null);
    };

    return (
        <div>
              
            {user ? (

                <UserProfile
                    user={user}
                    onLogout={handleLogout}
                />

            ) : showRegister ? (

                <>
                    <Register
                        onRegistered={() => setShowRegister(false)}
                    />

                    <p>
                        Already have an account?
                        <button onClick={() => setShowRegister(false)}>
                            Login
                        </button>
                    </p>
                </>

            ) : (

                
                <Login onLogin={handleLogin} 
                        onShowRegister={()=>setShowRegister(true)}   
                />

                    
            )}

        </div>
    );
}

export default App;