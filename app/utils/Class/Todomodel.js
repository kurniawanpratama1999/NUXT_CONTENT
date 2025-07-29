export default class TodoModel {
    
    constructor({id, task}){
        
        this.state = reactive({
            id: id,
            task: task,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            done: false,
            popup: false,
        })
    }

    set task ({task}) {
        this.state.task = task;
        this.state.updatedAt = Date.now();
    }
    
    set done ({isDone}) {this.state.done = isDone;}
    set popup ({isPopup}) {this.state.popup = isPopup;}

    get id () {return this.state.id;}
    get createdAt () {return this.state.createdAt;}
    get updatedAt () {return this.state.updatedAt;}
    
    get task () {return this.state.task;}
    get done () {return this.state.done;}
    get popup () {return this.state.popup;}
}