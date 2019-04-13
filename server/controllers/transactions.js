import accounts from '../models/accounts';
import transactions from '../models/transactions';

const Transaction = {
  getTransactions(req, res) {
    return res.status(200).json({
      status: 200,
      data: transactions,
    });
  },

  transact(req, res) {
    let { accountNumber } = req.params;
    const { transact } = req.params;
    const { cashier } = req.body;
    let { amount } = req.body;
    accountNumber = Number(accountNumber);
    amount = Number(amount);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    const id = transactions.length + 1;
    const oldBalance = Number(account.balance);
    let newBalance;

    if (transact === 'debit') { newBalance = oldBalance - amount; }
    if (transact === 'credit') { newBalance = oldBalance + amount; }

    const newTransaction = {
      // eslint-disable-next-line max-len
      id, createdOn: new Date().toString(), type: transact, accountNumber, amount, cashier, oldBalance, newBalance,
    };

    transactions.push(newTransaction);
    account.balance = newBalance;
    return res.status(200).json({
      status: 200,
      data: {
        // eslint-disable-next-line max-len
        transactionId: newTransaction.id, accountNumber: accountNumber.toString(), amount, cashier, transactionType: newTransaction.type, accountBalance: newBalance.toString(),
      },
    });
  },
};

export default Transaction;
