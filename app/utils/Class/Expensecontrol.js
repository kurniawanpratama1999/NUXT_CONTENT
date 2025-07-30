import ExpenseModel from "./Expensemodel";

export default class ExpenseControl {
    #transactions = ref([])

    create({id, date, desc, nominal, out}){
        if (!id || !date || !desc || !nominal || !out) return false;

        this.#transactions.value.push(new ExpenseModel({id, date, desc, nominal, out}))
        return true
    }

    read(){
        return this.#transactions.value
    }

    update({id, date, desc, nominal, out}){
        if (!id) return false;
        
        const findID = this.#transactions.value
                        .map(trx => trx.state)
                        .find(trx => trx.id === id);

        if (!findID) return false;

        if (date !== undefined) (findID.date = date);
        if (desc !== undefined) (findID.desc = desc);
        if (nominal !== undefined) (findID.nominal = nominal);
        if (out !== undefined) (findID.out = out);

        return true
    }

    delete({id}){
        this.#transactions.value = this.#transactions.value
                                    .map(trx => trx.state)
                                    .filter(trx => trx.id !== id);
    }

}