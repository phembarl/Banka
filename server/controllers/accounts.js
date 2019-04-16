import faker from 'faker';
import accounts from '../models/accounts';

/**
 *
 * Displays, creates, updates or deletes an account
 * @class Accounts
 */
class Accounts {
  static getAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  }
  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof Accounts
 */

  static createAccount(req, res) {
    const {
      firstName, lastName, email, type,
    } = req.body;
    const lastAccount = accounts[accounts.length - 1];
    const id = lastAccount.id + 1;
    const accountNumber = Number(faker.finance.account());
    const openingBalance = 0.00;

    const newAccount = {
      id, accountNumber, createdOn: new Date().toString(), owner: id, type, status: 'draft', balance: openingBalance,
    };


    accounts.push(newAccount);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber,
        firstName,
        lastName,
        email,
        type,
        openingBalance,
      },
    });
  }
  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof Accounts
 */

  static updateAccount(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    let { status } = req.body;
    status = status.trim();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    account.status = status;

    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: account.accountNumber,
        status: account.status,
      },
    });
  }
  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof Accounts
 */

  static deleteAccount(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    accounts.splice(accounts.indexOf(account), 1);

    return res.status(200).json({
      status: 200,
      message: 'account successfully deleted',
    });
  }
}

export default Accounts;
