import usersList from '../models/users';
import validUser from './validUser';

const { users } = usersList;

/**
 * Validates user
 * @class User
 */
class UserValidator {
  /**
   * @static
   * @description this function checks if an email address already belongs to a user
   * @param {object} request the request body
   * @param {object} response the response body
   * @param {function} next passes the request to another function to be processed
   * @returns next
   * @memberof UserValidator
   */
  static isClientOrStaff(request, response, next) {
    const { type } = request.body;

    if (type !== 'client' && type !== 'staff') {
      return response.status(400).json({
        status: 400,
        error: 'you can either be a client or staff',
      });
    }
    return next();
  }

  /**
 *
 * @static
 * @description this function validates user sign in
 * @param {object} request the request body
 * @param {object} response the request body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof UserValidator
 */
  static isValidSignIn(request, response, next) {
    const { email, password } = request.body;

    for (let i = 0; i < users.length; i += 1) {
      if (email === users[i].email) {
        if (validUser.comparePassword(
          password, users[i].password,
        ) || password === users[i].password) {
          return next();
        }
        return response.status(401).json({
          status: 401,
          error: 'incorrect password',
        });
      }
    }
    return response.status(404).json({
      status: 404,
      error: 'user with that email does not exist',
    });
  }
}

export default UserValidator;
