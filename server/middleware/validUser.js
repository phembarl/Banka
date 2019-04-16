import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import usersList from '../models/users';

const { users } = usersList;

dotenv.config();
/**
 * Validates user
 * @class ValidUser
 */
class ValidateUser {
  /**
   * @static
   * @description this function hashes a password
   * @param {string} password password entered by user
   * @returns the hashed password
   * @memberof ValidateUser
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
 * @static
 * @description this function compares password input to user password
 * @param {string} password password entered by user
 * @param {string} hash hashed user password
 * @returns Boolean value
 * @memberof ValidateUser
 */
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
 * @static
 * @description this function generates token for user
 * @param {Number} id user id
 * @returns generated token
 * @memberof ValidateUser
 */
  static generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: '30d' });
    return token;
  }

  /**
 * @static
 * @description this functions checks if a user exists
 * @param {object} request the request body
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof ValidateUser
 */
  static canFindUser(request, response, next) {
    let { userId } = request.body;
    userId = Number(userId);
    const user = users.find(accountOwner => accountOwner.id === userId);

    if (!user) {
      return response.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    return next();
  }
}

export default ValidateUser;
