export default class ExpenseModel {
    constructor({id, date, desc, nominal, out}){
        this.state = reactive({
            id, date, desc, nominal, out,
        })
    }

    get id (){return this.state.id;}
    get date (){
        return this.state.date;
    }
    get desc (){return this.state.desc;}
    get nominal (){return this.state.nominal}
    get out (){return this.state.out;}

    set date(date){
        this.state.date = date;
    } 
    set desc(desc){this.state.desc = desc;} 
    set out(out){this.state.out = out;} 

    set nominal(nominal){this.state.nominal = nominal} 
}