import accountsList from '../models/accounts';
import transactionsList from '../models/transactions';

const { accounts } = accountsList;
let { transactions } = transactionsList;

/**
 *This class handles transactions
 * @class Transaction
 */
class Transaction {
  /**
   * @static
   * @description this function displays all transactions
   * @param {object} request
   * @param {object} response the response body
   * @returns response
   * @memberof Transaction
   */
  static getTransactions(request, response) {
    return response.status(200).json({
      status: 200,
      data: transactions,
    });
  }

  /**
 * @static
 * @description this function credits or debits a bank account
 * @param {object} request the request parameters
 * @param {object} response the response body
 * @returns response
 * @memberof Transaction
 */
  static transact(request, response) {
    let { accountNumber } = request.params;
    const { transactionType } = request.params;
    const { cashier } = request.body;
    let { amount } = request.body;
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

    transactions = [...transactions, newTransaction];

    account.balance = newBalance;
    return response.status(200).json({
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
