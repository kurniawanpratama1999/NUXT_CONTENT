export default class ExpenseModel {
    constructor({id, date, desc, nominal, out}){
        console.log('model => ', date)
        this.state = reactive({
            id, date, desc, nominal, out,
        })
    }

    get id (){return this.state.id;}
    get date (){
        console.log('model getDate => ', this.state.date)
        return this.state.date;
    }
    get desc (){return this.state.desc;}
    get nominal (){return this.state.nominal}
    get out (){return this.state.out;}

    set date(date){
        console.log('model setDate param => ', date);
        console.log('model setDate state => ', this.state.date);
        
        this.state.date = date;
    } 
    set desc(desc){this.state.desc = desc;} 
    set out(out){this.state.out = out;} 

    set nominal(nominal){this.state.nominal = nominal} 
}