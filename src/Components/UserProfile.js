import React from 'react';

function UserProfile({ user, onLogout }) {

    return (
        <div>
            <h2>Welcome, {user.username}!</h2>

            <p>User ID: {user.id}</p>
            <p>Email: {user.email}</p>

            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

export default UserProfile;