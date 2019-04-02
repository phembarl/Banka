import faker from 'faker';
import accounts from '../models/accounts';

const Accounts = {
  getAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  },

  createAccount(req, res) {
    const {
      firstName, lastName, email, type,
    } = req.body;
    const id = accounts.length + 1;
    const accountNumber = faker.finance.account();
    const openingBalance = 0.00;

    const newAccount = {
      id,
      accountNumber,
      createdOn: new Date().toString(),
      owner: id,
      type,
      status: 'draft',
      balance: openingBalance,
    };

    if (newAccount.type === 'savings' || newAccount.type === 'current') {
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
    return res.status(422).json({
      status: 422,
      error: 'type can only be savings or current',
    });
  },

  updateAccount(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const { status } = req.body;
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'no account with provided account number',
      });
    } if (status === 'active' || status === 'dormant' || status === 'draft') {
      account.status = status;

      return res.status(200).json({
        status: 200,
        data: {
          accountNumber: account.accountNumber,
          status: account.status,
        },
      });
    }
    return res.status(422).json({
      status: 422,
      error: 'status can only be active, dormant or draft',
    });
  },

  deleteAccount(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'account not found',
      });
    }

    accounts.splice(accounts.indexOf(account), 1);

    return res.status(200).json({
      status: 200,
      message: 'account successfully deleted',
    });
  },

};

export default Accounts;
