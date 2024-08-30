// src/app/auth/not-found.tsx

// Importing React is optional but helps with some tooling and typing
import React from 'react';

// This is a simple React functional component
const NotFound: React.FC = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

// Export the component as default
export default NotFound;
