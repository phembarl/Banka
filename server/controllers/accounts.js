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
    const { status } = request.query;
    if (!request.user.isadmin) {
      return response.status(401).json({
        status: 401,
        error: 'you do not have permission to perform that operation',
      });
    }
    try {
      if (status) {
        const text = 'SELECT * FROM accounts WHERE status = $1;';
        const value = [status];

        const { rows } = await db.query(text, value);
        return response.status(200).json({
          status: 400,
          data: rows,
        });
      }
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

  static async accountDetails(request, response) {
    const { accountNumber } = request.params;
    const text = 'SELECT * FROM accounts WHERE accountnumber = $1;';
    const value = [accountNumber];

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'account not found',
        });
      }

      const ownerText = 'SELECT * FROM users WHERE id = $1;';
      const ownerValue = [rows[0].owner];
      const ownerRow = await db.query(ownerText, ownerValue);

      if (request.user.id !== ownerRow.rows[0].id) {
        return response.status(401).json({
          status: 401,
          error: 'you do not have permission to view that account',
        });
      }

      return response.status(200).json({
        status: 200,
        data: [{
          createdOn: rows[0].createdon,
          accountNumber: rows[0].accountnumber,
          ownerEmail: ownerRow.rows[0].email,
          type: rows[0].type,
          status: rows[0].status,
          balance: rows[0].balance,
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
    const { accountNumber } = request.params;
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
    const { accountNumber } = request.params;

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

  // static async getActiveOrDormantAccounts(request, response) {
  //   const { status } = request.query;
  //   const text = 'SELECT * FROM accounts WHERE status = $1;';
  //   const value = [status];
  //   try {
  //     const { rows } = await db.query(text, value);
  //     return response.status(200).json({
  //       status: 400,
  //       data: rows,
  //     });
  //   } catch (error) {
  //     return response.status(400).json({
  //       status: 400,
  //       error: error.message,
  //     });
  //   }
  // }
}

export default Accounts;
