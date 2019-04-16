import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Validates user
 * @class ValidUser
 */
class ValidUser {
  /**
   *
   * @static
   * @param {string} password
   * @returns hash
   * @memberof ValidUser
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
 *
 * @static
 * @param {string} password
 * @param {string} hash
 * @returns hashed password
 * @memberof Boolean value
 */
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
 *
 * @static
 * @param {Number} id
 * @returns token
 * @memberof ValidUser
 */
  static generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.SECRET, { expiresIn: '30d' });
    return token;
  }
}

export default ValidUser;
