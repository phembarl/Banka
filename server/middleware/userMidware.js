import users from '../models/users';
import validUser from './validUser';

/**
 * Validates user
 * @class User
 */
class User {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns next
   * @memberof User
   */
  static isNewEmail(req, res, next) {
    const { email } = req.body;

    for (let i = 0; i < users.length; i += 1) {
      if (email === users[i].email) {
        return res.status(409).json({
          status: 409,
          message: 'user with that email already exists',
        });
      }
    }
    return next();
  }

  /**
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns next
 * @memberof User
 */
  static isValidSignIn(req, res, next) {
    const { email, password } = req.body;

    for (let i = 0; i < users.length; i += 1) {
      if (email === users[i].email) {
        if (validUser.comparePassword(
          password, users[i].password,
        ) || password === users[i].password) {
          return next();
        }
        return res.status(401).json({
          status: 401,
          error: 'incorrect password',
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'user with that email does not exist',
    });
  }
}

export default User;
