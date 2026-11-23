import React, { useState } from 'react';
import API from '../api';

function Register({ onRegistered }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        try {
            await API.post('register/', {
                username,
                email,
                password
            });

            setMessage('Registration successful!');

            setUsername('');
            setEmail('');
            setPassword('');

            if (onRegistered) {
                setTimeout(() => onRegistered(), 1500);
            }

        } catch (err) {

            const data = err.response?.data;

            setError(
                data?.username?.[0] ||
                data?.email?.[0] ||
                data?.password?.[0] ||
                'Registration failed. Please try again.'
            );
        }
    };

    return (

        <div className="container min-vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow-lg border-0"
                style={{ width: '100%', maxWidth: '420px' }}>

                <div className="card-body p-4 p-md-5">

                    <h2 className="text-center fw-bold mb-2">
                        Create Account
                    </h2>

                    <p className="text-center text-secondary mb-4">
                        Register to get started
                    </p>

                    <form onSubmit={handleRegister}>

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
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                minLength={8}
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="alert alert-success">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-2"
                        >
                            Register
                        </button>

                    </form>

                    <div className="text-center mt-4">
                        <span className="text-secondary">
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={onRegistered}
                        >
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;