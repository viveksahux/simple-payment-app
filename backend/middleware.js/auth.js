import env from '../config.js'
import jwt from 'jsonwebtoken';

const JWT_SECRET = env.JWT_SECRET
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userID._id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}

export default verifyToken;