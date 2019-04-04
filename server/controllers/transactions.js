import accounts from '../models/accounts';
import transactions from '../models/transactions';

const Transaction = {
  getTransactions(req, res) {
    return res.status(200).json({
      status: 200,
      data: transactions,
    });
  },

  credit(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const { cashier } = req.body;
    let { amount } = req.body;
    amount = Number(amount);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    const id = transactions.length + 1;
    const oldBalance = Number(account.balance);
    const newBalance = oldBalance + amount;

    const newTransaction = {
      id, createdOn: new Date().toString(), type: 'credit', accountNumber, amount, cashier, oldBalance, newBalance,
    };

    transactions.push(newTransaction);
    account.balance = newBalance;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: newTransaction.id,
        accountNumber: accountNumber.toString(),
        amount,
        cashier,
        transactionType: newTransaction.type,
        accountBalance: newBalance.toString(),
      },
    });
  },

  debit(req, res) {
    let { accountNumber } = req.params;
    accountNumber = Number(accountNumber);
    const { cashier } = req.body;
    let { amount } = req.body;
    amount = Number(amount);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    const id = transactions.length + 1;
    const oldBalance = Number(account.balance);
    const newBalance = oldBalance - amount;

    const newTransaction = {
      id, createdOn: new Date().toString(), type: 'debit', accountNumber, amount, cashier, oldBalance, newBalance,
    };

    transactions.push(newTransaction);
    account.balance = newBalance;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: newTransaction.id,
        accountNumber: accountNumber.toString(),
        amount,
        cashier,
        transactionType: newTransaction.type,
        accountBalance: newBalance.toString(),
      },
    });
  },

};

export default Transaction;
