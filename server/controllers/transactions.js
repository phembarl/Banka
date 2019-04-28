import db from '../models/db';

/**
 *This class handles transactions
 * @class Transaction
 */
class Transaction {
  /**
   * @static
   * @description this function displays all transactions
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Transaction
   */
  static async getTransactions(request, response) {
    try {
      const { rows } = await db.query('SELECT * FROM transactions;');

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
 * @description this function credits or debits a bank account
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @returns response
 * @memberof Transaction
 */
  static async transact(request, response) {
    const { accountNumber, transactionType } = request.params;
    let { amount } = request.body;
    amount = Number(amount);

    const text = 'SELECT * FROM accounts WHERE accountnumber = $1;';
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
          error: 'account not found',
        });
      }

      const oldBalance = rows[0].balance;
      let newBalance;

      if (transactionType === 'debit') { newBalance = oldBalance - amount; }
      if (transactionType === 'credit') { newBalance = oldBalance + amount; }

      const transactText = `INSERT INTO transactions(type, accountnumber, amount, cashier, oldbalance, newbalance)
    VALUES($1, $2, $3, $4, $5, $6) returning *;`;
      const transactValues = [transactionType, accountNumber, amount,
        request.user.id, oldBalance, newBalance];
      const transactRows = await db.query(transactText, transactValues);
      const updateText = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2 returning *;';
      const updateValue = [transactRows.rows[0].newbalance, transactRows.rows[0].accountnumber];

      const accountRows = await db.query(updateText, updateValue);
      if (accountRows.rows[0].status === 'draft' || accountRows.rows[0].status === 'dormant') {
        db.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2 returning *;',
          ['active', transactRows.rows[0].accountnumber]);
      }

      return response.status(200).json({
        status: 200,
        data: [{
          transactionId: transactRows.rows[0].id,
          accountNumber: transactRows.rows[0].accountnumber.toString(),
          amount: transactRows.rows[0].amount,
          cashier: transactRows.rows[0].cashier,
          transactionType: transactRows.rows[0].type,
          accountBalance: transactRows.rows[0].newbalance.toString(),
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
 *@description This function gets the transaction history of a bank account
 * @static
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @returns response
 * @memberof Transaction
 */
  static async transactionHistory(request, response) {
    const { accountNumber } = request.params;
    const text = 'SELECT * FROM transactions WHERE accountnumber = $1;';
    const value = [accountNumber];

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'no transaction has been made with that account number',
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
 *
 * @static This function gets a specific transaction record
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @returns response
 * @memberof Transaction
 */
  static async getSpecificTransaction(request, response) {
    const { transactionId } = request.params;
    const text = 'SELECT * FROM transactions WHERE id = $1;';
    const value = [transactionId];

    try {
      const { rows } = await db.query(text, value);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'transaction record not found',
        });
      }
      return response.status(200).json({
        status: 200,
        data: [{
          transactionId: rows[0].id,
          createdOn: rows[0].createdon,
          type: rows[0].type,
          accountNumber: rows[0].accountnumber,
          oldBalance: rows[0].oldbalance,
          newBalance: rows[0].newbalance,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: 'invalid input',
      });
    }
  }
}

export default Transaction;
