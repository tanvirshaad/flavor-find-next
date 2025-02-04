import jwt from 'jsonwebtoken';

export const getUserFromCookie = () => {
    try {
        // Try to get token from localStorage instead of cookie
        const token = localStorage.getItem('token');

        console.log('Found token:', token);

        if (!token) {
            return null;
        }

        const decoded = jwt.decode(token);
        console.log('Decoded token:', decoded);

        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            return decoded.id;
        }

        return null;
    } catch (error) {
        console.error('Error extracting userId from token:', error);
        return null;
    }
};
