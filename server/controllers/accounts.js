import faker from 'faker';
import accountsList from '../models/accounts';
import usersList from '../models/users';

const { accounts } = accountsList;
const { users } = usersList;

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
  static getAccounts(request, response) {
    return response.status(200).json({
      status: 200,
      data: accounts,
    });
  }

  /**
 * @static
 * @description this function creates a new bank account
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static createAccount(request, response) {
    const { email, type } = request.body;
    let { userId } = request.body;
    userId = Number(userId);
    const user = users.find(owner => owner.id === userId);
    const lastAccount = accounts[accounts.length - 1];
    const id = lastAccount.id + 1;
    const accountNumber = Number(faker.finance.account());
    const openingBalance = 0.00;

    const newAccount = {
      id, accountNumber, createdOn: new Date().toString(), owner: userId, type, status: 'draft', balance: openingBalance,
    };

    const index = id - 1;
    accounts[index] = newAccount;


    return response.status(201).json({
      status: 201,
      data: {
        accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        type,
        openingBalance,
      },
    });
  }

  /**
 * @static
 * @description this function updates the status of a bank account
 * @param {object} request the request object
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static updateAccount(request, response) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);
    let { status } = request.body;
    status = status.trim();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    account.status = status;

    return response.status(200).json({
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
 * @description this function deletes a bank account
 * @param {object} request the request body
 * @param {object} response the response body
 * @returns response
 * @memberof Accounts
 */
  static deleteAccount(request, response) {
    let { accountNumber } = request.params;
    accountNumber = Number(accountNumber);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    accounts.splice(accounts.indexOf(account), 1);

    return response.status(200).json({
      status: 200,
      message: 'account successfully deleted',
    });
  }
}

export default Accounts;
