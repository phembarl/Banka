import faker from 'faker';
import accounts from '../models/accounts';
// import validUser from '../middleware/validUser';

const Accounts = {
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
};

export default Accounts;
