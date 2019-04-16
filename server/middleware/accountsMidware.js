import accountsList from '../models/accounts';

const { accounts } = accountsList;

/**
 * Checks for errors before performing any action on an account
 * @class Account
 */
class AccountValidator {
  /**
   * @static
   * @description this function checks if the account type is valid
   * @param {object} request the request body
   * @param {object} response the response body
   * @param {function} next passes the request to another function to be processed
   * @returns next
   * @memberof AccountValidator
   */
  static isValidType(request, response, next) {
    const { type } = request.body;

    if (type === 'savings' || type === 'current') {
      return next();
    }
    return response.status(400).json({
      status: 400,
      error: 'type can only be savings or current',
    });
  }

  /**
 *
 *
 * @static
 * @description this function checks an account can be updated
 * @param {object} request the request object
 * @param {object} response the request body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof AccountValidator
 */
  static canUpdate(request, response, next) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);
    let { status } = request.body;
    status = status.trim();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return response.status(404).json({
        status: 404,
        error: 'no account with provided account number',
      });
    } if (status === 'active' || status === 'dormant') {
      return next();
    }
    return response.status(400).json({
      status: 400,
      error: 'status can only be active or dormant',
    });
  }

  /**
 *
 * @static
 * @description this function checks if an account exists
 * @param {object} request the request object
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 * @memberof AccountValidator
 */
  static canFindAccount(request, response, next) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return response.status(404).json({
        status: 404,
        error: 'account not found',
      });
    }
    return next();
  }

  /**
 * @static
 * @description this function checks if a transaction is valid
 * @param {object} request the request object
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns
 * @memberof AccountValidator
 */
  static isTransaction(request, response, next) {
    const { transactionType } = request.params;

    if (transactionType === 'debit' || transactionType === 'credit') {
      return next();
    }
    return response.status(400).json({
      status: 400,
      error: 'transaction type can only be credit or debit',
    });
  }
}

export default AccountValidator;
