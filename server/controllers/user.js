import db from '../models/db';
import userAuth from './authController';

/**
 * @description This class handles user requests
 * @class User
 */
class User {
/**
 * @static
 * @description This function changes the admin status of a user
 * @param {object} request
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static async createAdmin(request, response) {
    const { email } = request.params;

    const text = 'UPDATE users SET isadmin = $1 WHERE email = $2 returning *;';
    const values = ['true', email];

    if (!request.user.isadmin) {
      return response.status(401).json({
        status: 401,
        error: 'You do not have the authority to perform that operation',
      });
    }

    try {
      const { rows } = await db.query(text, values);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }

      return response.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          isAdmin: rows[0].isadmin,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
   * @static
   * @description this function displays all users
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof User
   */
  static async getUsers(request, response) {
    try {
      const { rows } = await db.query('SELECT id, firstname, lastname, email, type, isadmin FROM users;');
      if (!request.user.isadmin && request.user.type !== 'staff') {
        return response.status(401).json({
          status: 401,
          error: 'You do not have the authority to perform that operation',
        });
      }

      return response.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
 * @static
 * @description this function creates a new user
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static async signUp(request, response) {
    const {
      firstName, lastName, password, type,
    } = request.body;

    let { email } = request.body;
    email = email.toLowerCase();

    const hashedPassword = userAuth.hashPassword(password);
    const text = `INSERT INTO users(firstname, lastname, email, password, type)
      VALUES($1, $2, $3, $4, $5) returning *;`;
    const values = [firstName, lastName, email, hashedPassword, type.toLowerCase()];

    try {
      const { rows } = await db.query(text, values);
      const token = userAuth.generateToken(rows[0].id);

      return response.status(201).json({
        status: 201,
        data: [{
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return response.status(400).json({
          status: 400,
          error: 'User with that email already exists',
        });
      }
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
 * @static
 * @description this function signs in a user
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static async signIn(request, response) {
    const { password } = request.body;
    const text = 'SELECT id, firstname, lastname, email, avatar, type, isadmin FROM users WHERE email = $1;';
    const passwordText = 'SELECT password FROM users WHERE email = $1;';

    let { email } = request.body;
    email = email.toLowerCase();

    try {
      const { rows } = await db.query(text, [email]);
      const hashedPasswordRow = await db.query(passwordText, [email]);
      const token = userAuth.generateToken(rows[0]);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'User with that email does not exist',
        });
      }

      if (!userAuth.comparePassword(password, hashedPasswordRow.rows[0].password)) {
        return response.status(401).json({
          status: 401,
          error: 'Incorrect password',
        });
      }
      return response.status(200).json({
        status: 200,
        data: [{
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
          avatar: rows[0].avatar,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
 * @static
 * @description This function gets a users bank accounts
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @returns response
 * @memberof User
 */
  static async userBankAccounts(request, response) {
    const { email } = request.params;

    const text = 'SELECT * FROM users WHERE email = $1;';
    const value = [email];

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }

      const accountText = 'SELECT * FROM accounts WHERE owner = $1;';
      const accountValue = [rows[0].id];
      const accountRows = await db.query(accountText, accountValue);

      return response.status(200).json({
        status: 200,
        data: accountRows.rows,
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  static async uploadImage(request, response) {
    const avatarUrl = request.file;
    const { email } = request.params;

    if (typeof avatarUrl === 'undefined') {
      return response.status(400).json({
        status: 400,
        error: 'Please upload a valid image',
      });
    }

    const text = 'UPDATE users SET avatar = $1 WHERE email = $2 returning *;';
    const values = [avatarUrl.path, email];

    try {
      const { rows } = await db.query(text, values);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      return response.status(200).json({
        status: 200,
        avatar: rows[0].avatar,
        message: 'Profile picture successfully updated',
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default User;
