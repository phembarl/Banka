import usersList from '../models/users';
import validUser from '../middleware/validUser';

let { users } = usersList;

/**
 * @description This class handles user requests
 * @class User
 */
class User {
  /**
   * @static
   * @description this function displays all users
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof User
   */
  static getUsers(request, response) {
    return response.status(200).json({
      status: 200,
      data: users,
    });
  }

  /**
 * @static
 * @description this function creates a new user
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static signUp(request, response) {
    const {
      firstName, lastName, email, password,
    } = request.body;

    const lastUser = users[users.length - 1];
    const id = lastUser.id + 1;
    const token = validUser.generateToken(id);
    const newUser = {
      id,
      email,
      firstName,
      lastName,
      password: validUser.hashPassword(password),
      isAdmin: false,
    };

    users = [...users, newUser];
    return response.status(201).json({
      status: 201,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  }

  /**
 * @static
 * @description this function signs in a user
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static signIn(request, response) {
    const { email, password } = request.body;
    const user = users.find(owner => email === owner.email && (validUser.comparePassword(password,
      owner.password) || password === owner.password));
    const { id } = user;
    const token = validUser.generateToken(id);

    return response.status(200).json({
      status: 200,
      data: {
        token,
        id,
        email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }
}

export default User;
