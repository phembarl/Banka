import accounts from '../models/accounts';
/**
 * Checks for errors before performing any action on an account
 * @class Account
 */
class Account {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns
   * @memberof Account
   */
  static isValidType(req, res, next) {
    const { type } = req.body;

    if (type === 'savings' || type === 'current') {
      return next();
    }
    return res.status(422).json({
      status: 422,
      error: 'type can only be savings or current',
    });
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns next
 * @memberof Account
 */
  static canUpdate(req, res, next) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    let { status } = req.body;
    status = status.trim();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'no account with provided account number',
      });
    } if (status === 'active' || status === 'dormant') {
      return next();
    }
    return res.status(422).json({
      status: 422,
      error: 'status can only be active or dormant',
    });
  }

  /**
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns next
 * @memberof Account
 */
  static canFind(req, res, next) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'account not found',
      });
    }
    return next();
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns
 * @memberof Account
 */
  static isTransaction(req, res, next) {
    const { transactionType } = req.params;

    if (transactionType === 'debit' || transactionType === 'credit') {
      return next();
    }
    return res.status(400).json({
      status: 400,
      error: 'transaction type can only be credit or debit',
    });
  }
}

export default Account;
