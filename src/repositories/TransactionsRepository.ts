import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

//   "id": "uuid",
//   "title": "Salário",
//   "value": 3000,
//   "type": "income"

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction): Balance => {
        acumulator[transaction.type] += transaction.value;
        acumulator.total +=
          transaction.type === 'income'
            ? transaction.value
            : -transaction.value;
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({title, value, type}: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
