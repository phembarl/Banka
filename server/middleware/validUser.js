import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

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
  static generateToken(user) {
    const token = jwt.sign({ user },
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
}

export default ValidateUser;
