import faker from 'faker';
import db from '../models/db';
/**
 * Displays, creates, updates or deletes an account
 * @class Accounts
 */
class Accounts {
  /**
   * @static
   * @description this function displays all bank accounts
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Accounts
   */
  static async getAccounts(request, response) {
    try {
      const { rows } = await db.query('SELECT * FROM accounts;');

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
 * @description this function creates a new bank account
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static async createAccount(request, response) {
    const { type } = request.body;
    const accountNumber = Number(faker.finance.account());
    const owner = request.user.id;
    const openingBalance = 0;
    const balance = openingBalance;

    const text = `INSERT INTO accounts(accountnumber, owner, type, balance)
    VALUES($1, $2, $3, $4) returning *;`;

    const values = [accountNumber, owner, type, balance];

    try {
      const { rows } = await db.query(text, values);
      return response.status(201).json({
        status: 201,
        data: [{
          id: rows[0].id,
          accountNumber,
          firstName: request.user.firstname,
          lastName: request.user.lastname,
          email: request.user.email,
          type,
          operningBalance: balance,
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
 * @description this function updates the status of a bank account
 * @param {object} request the request object
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static async updateAccount(request, response) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);
    let { status } = request.body;
    status = status.trim();

    const text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 returning *;';
    const values = [status, accountNumber];

    if (!request.user.isadmin) {
      return response.status(401).json({
        status: 401,
        error: 'you do not have the authority to perform that operation',
      });
    }

    try {
      const { rows } = await db.query(text, values);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'cannot find that account',
        });
      }

      return response.status(200).json({
        status: 200,
        data: [{
          accountNumber: rows[0].accountnumber,
          status: rows[0].status,
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
 *
 *
 * @static
 * @description this function deletes a bank account
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static async deleteAccount(request, response) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);

    const text = 'DELETE FROM accounts WHERE accountnumber = $1 returning *;';
    const value = [accountNumber];

    if (!request.user.isadmin) {
      return response.status(401).json({
        status: 401,
        error: 'you do not have the authority to perform that operation',
      });
    }

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'cannot find that account',
        });
      }

      return response.status(200).json({
        status: 200,
        message: 'account successfully deleted',
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default Accounts;
