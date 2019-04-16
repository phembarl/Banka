import accounts from '../models/accounts';
import transactions from '../models/transactions';
/**
 *Displays transactions
 *Performs a transaction
 * @class Transaction
 */
class Transaction {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns res
   * @memberof Transaction
   */
  static getTransactions(req, res) {
    return res.status(200).json({
      status: 200,
      data: transactions,
    });
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns res
 * @memberof Transaction
 */
  static transact(req, res) {
    let { accountNumber } = req.params;
    const { transactionType } = req.params;
    const { cashier } = req.body;
    let { amount } = req.body;
    accountNumber = Number(accountNumber);
    amount = Number(amount);
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    const id = transactions.length + 1;
    const oldBalance = Number(account.balance);
    let newBalance;

    if (transactionType === 'debit') { newBalance = oldBalance - amount; }
    if (transactionType === 'credit') { newBalance = oldBalance + amount; }

    const newTransaction = {
      id,
      createdOn: new Date().toString(),
      type: transactionType,
      accountNumber,
      amount,
      cashier,
      oldBalance,
      newBalance,
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
  }
}

export default Transaction;
