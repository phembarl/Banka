import db from '../models/db';
import userAuth from './authController';

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
  static async getUsers(request, response) {
    try {
      const { rows } = await db.query('SELECT * FROM users;');
      if (!request.user.isadmin) {
        return response.status(401).json({
          status: 401,
          error: 'you do not have permission to perform that operation',
        });
      }

      return response.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error,
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

    if (!request.user.isadmin) {
      return response.status(401).json({
        status: 401,
        error: 'you do not have permission to perform that operation',
      });
    }

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'user not found',
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
      firstName, lastName, email, password, type,
    } = request.body;

    let isAdmin;

    if (type === 'client') { isAdmin = false; }
    if (type === 'staff') { isAdmin = true; }

    const hashedPassword = userAuth.hashPassword(password);
    const text = `INSERT INTO users(firstname, lastname, email, password, type, isAdmin)
      VALUES($1, $2, $3, $4, $5, $6) returning *;`;
    const values = [firstName, lastName, email, hashedPassword, type, isAdmin];

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
          error: 'user with that email already exists',
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
    let { email } = request.body;
    email = email.toLowerCase();
    const text = 'SELECT * FROM users WHERE email = $1;';

    try {
      const { rows } = await db.query(text, [email]);
      const token = userAuth.generateToken(rows[0]);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'user with that email does not exist',
        });
      }

      if (!userAuth.comparePassword(password, rows[0].password)) {
        return response.status(401).json({
          status: 401,
          error: 'incorrect password',
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
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default User;
