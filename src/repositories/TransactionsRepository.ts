/* eslint-disable no-param-reassign */
import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income': {
            balance.income += transaction.value;
            break;
          }
          case 'outcome': {
            balance.outcome += transaction.value;
            break;
          }
          default:
            throw Error('Unknown type');
        }

        balance.total = balance.income - balance.outcome;

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction: Transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
