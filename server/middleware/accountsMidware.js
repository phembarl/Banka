import accounts from '../models/accounts';

const Account = {
  isValidType(req, res, next) {
    const { type } = req.body;

    if (type === 'savings' || type === 'current') {
      return next();
    }
    return res.status(422).json({
      status: 422,
      error: 'type can only be savings or current',
    });
  },

  canUpdate(req, res, next) {
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
    } if (status === 'active' || status === 'dormant' || status === 'draft') {
      return next();
    }
    return res.status(422).json({
      status: 422,
      error: 'status can only be active, dormant or draft',
    });
  },

  canFind(req, res, next) {
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
  },

  isTransaction(req, res, next) {
    const { transactType } = req.params;

    if (transactType === 'debit' || transactType === 'credit') {
      return next();
    }
    return res.status(400).json({
      status: 400,
      error: 'transaction type can only be credit or debit',
    });
  },
};

export default Account;
