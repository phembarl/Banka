import users from '../models/users';
import validUser from '../middleware/validUser';

/**
 * Displays users
 * Creates New User
 * Signs in User
 * @class User
 */
class User {
  /**
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns res
   * @memberof User
   */
  static getUsers(req, res) {
    return res.status(200).json({
      status: 200,
      data: users,
    });
  }

  /**
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof User
 */

  static signUp(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

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

    users.push(newUser);
    return res.status(201).json({
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
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof User
 */
  static signIn(req, res) {
    const { email, password } = req.body;
    const user = users.find(owner => email === owner.email && (validUser.comparePassword(password,
      owner.password) || password === owner.password));

    return res.status(200).json({
      status: 200,
      data: user,
    });
  }
}

export default User;
