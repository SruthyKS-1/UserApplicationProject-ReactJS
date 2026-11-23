import React, { useState } from 'react';
import API from '../api';

function Login({ onLogin, onShowRegister }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await API.post('login/', {
                username,
                password
            });

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            localStorage.setItem('access', accessToken);
            localStorage.setItem('refresh', refreshToken);

            const profileResponse = await API.get('profile/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            onLogin(profileResponse.data);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                'Invalid username or password'
            );
        }
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow-lg border-0"
                 style={{ width: '100%', maxWidth: '420px' }}>

                <div className="card-body p-4 p-md-5">

                    <h2 className="text-center fw-bold mb-2" style={{color:"Orange"}}>
                        Login
                    </h2>

                    <p className="text-center text-secondary mb-4">
                        Please login to your account
                    </p>

                    <form onSubmit={handleLogin}>

                        <div className="mb-3">
                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-2"
                        >
                            Login
                        </button>

                    </form>

                    <div className="text-center mt-4">
                        <p className="text-secondary mb-0">
                            Don't have an account?

                            <button
                                type="button"
                                className="btn btn-link text-decoration-none"
                                onClick={onShowRegister}
                            >
                                Register
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;