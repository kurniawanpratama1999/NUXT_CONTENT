export type ExpenseModel = {
  id: number;
  date: Date;
  desc: string;
  nominal: number;
  out: boolean;
};

export default function useExpense() {
  const transaction = reactive<ExpenseModel[]>([]);

  return {
    addTransaction: (model: Omit<ExpenseModel, 'date'> & { date: string }): boolean => {
      if (!model.id || !model.desc || !model.nominal || model.out === undefined) return false;

      if ((model.out && model.nominal > 0) || (!model.out && model.nominal < 0)) {
        model.nominal = model.nominal * -1;
      }

      transaction.push({ ...model, date: new Date(model.date) });

      return true;
    },

    removeTransaction: (model: Pick<ExpenseModel, 'id'>): boolean => {
      const findIndexByID: number = transaction.findIndex((i) => i.id === model.id);

      if (findIndexByID === -1) return false;

      transaction.splice(findIndexByID, 1);
      return true;
    },

    updateTransaction: (model: Omit<ExpenseModel, 'date'> & { date: string }): boolean => {
      const findIndexByID: number = transaction.findIndex((i) => i.id === model.id);

      if (findIndexByID === -1) return false;

      transaction[findIndexByID] = { ...model, date: new Date(model.date) };
      return true;
    },

    readTransaction: (): ExpenseModel[] => {
      return transaction;
    },
  };
}
