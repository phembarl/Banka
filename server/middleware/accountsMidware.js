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
    let { status } = request.body;
    status = status.trim();

    if (status === 'active' || status === 'dormant') {
      return next();
    }
    return response.status(400).json({
      status: 400,
      error: 'status can only be active or dormant',
    });
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

  /**
 *@description This function checks if the queried status is either active or dormant
 * @static
 * @param {object} request the request object
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns
 * @memberof AccountValidator
 */
  static checkStatus(request, response, next) {
    const { status } = request.query;
    if (status) {
      if (status !== 'active' && status !== 'dormant') {
        return response.status(400).json({
          status: 400,
          error: 'status can either be active or dormant',
        });
      }
    } return next();
  }
}

export default AccountValidator;
