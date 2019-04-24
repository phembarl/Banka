import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import db from '../models/db';

dotenv.config();

const verifyToken = async (request, response, next) => {
  const token = request.headers['x-access-token'];

  if (!token) {
    return response.status(401).json({
      status: 401,
      error: 'token is not provided!',
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    request.user = decoded.user;
    if (decoded) return next();
  } catch (error) {
    return response.send({
      status: 401,
      error: error.message,
    });
  }
};

export default verifyToken;
