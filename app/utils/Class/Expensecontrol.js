import ExpenseModel from "./Expensemodel";

export default class ExpenseControl {
    #transactions = ref([])

    create({id, date, desc, nominal, out}){
        
        if (!id || !date || !desc || !nominal) return false;
        
        if ((out && nominal > 0) || (!out && nominal < 0)) {            
            nominal = nominal * -1;
        }

        date = this.#serialize({date})

        console.log('control create => ', date);
        const model = new ExpenseModel({id, date, desc, nominal, out})
        this.#transactions.value.push(model)
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
        
        if ((out && nominal > 0) || (!out && nominal < 0)) {            
            nominal = nominal * -1;
        }
        
        date = this.#serialize({date})
        console.log('control update => ', date)

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

    #serialize({date}){
        const isDate = date instanceof Date

        if (!isDate) {
            return new Date(date)
        }

        return date
    }
}