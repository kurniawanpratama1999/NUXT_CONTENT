<script setup>
import ExpenseControl from '~/utils/Class/Expensecontrol';

    const record = reactive({
        counter: 0,
        datas:[],
    })

    const extractDate = (date) => {
        const now = !date ? new Date() : new Date(date);
        const [getYear, getMonth, getDate] = [now.getFullYear(), (now.getMonth() + 1).toString().padStart(2, "0"), now.getDate().toString().padStart(2, "0")]
        return {getYear, getMonth, getDate}
    }

    const {getYear: defaultYear, getMonth: defaultMonth, getDate: defaultDate} = extractDate()

    const model = reactive({
        id : computed(() => record.counter + 1),
        date:`${defaultYear}-${defaultMonth}-${defaultDate}`,
        desc: "",
        nominal: "",
        out: true
    })

    const fieldModel = ({id, date, desc, nominal, out}) => {
            model.id = computed(() => id)
            model.date = date
            model.desc = desc
            model.nominal = nominal
            model.out = out
    }

    const filter = reactive({
        primary: "",
        secondary: "az",
        onlyOut: false,
        onlyIn: false
    })

    const isOpen = ref(false)
    const isUpdate = ref(false)

    const control = new ExpenseControl();

    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Jajan", nominal: 1000, out: true})

    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Bensin", nominal: 2000, out: true})
    
    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Kopi", nominal: 4000, out: true})

    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Pendapatan", nominal: 5000, out: false})
    
    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Pulsa", nominal: 6000, out: true})
    
    record.counter += 1
    control.create({id: record.counter, date: new Date(), desc: "Tip", nominal: 3000, out: false})
    
    record.datas = computed(() => {
        let result = control.read().map(item => item.state);
        const {primary, secondary, onlyOut, onlyIn} = filter;

        if (primary === 'name' && secondary === "az") {
            result = [...result].sort((a,b) => a.desc.localeCompare(b.desc))
        } else if (primary === 'name' && secondary === "za") {
            result = [...result].sort((a,b) => b.desc.localeCompare(a.desc))
        } else if (primary === 'nominal' && secondary === "az") {
            result = [...result].sort((a,b) => a.nominal - b.nominal)
        } else if (primary === 'nominal' && secondary === "za") {
            result = [...result].sort((a,b) => b.nominal - a.nominal)
        } else if (primary === 'date' && secondary === "az") {
            result = [...result].sort((a,b) => a.date - b.date)
        } else if (primary === 'date' && secondary === "za") {
            result = [...result].sort((a,b) => b.date - a.date)
        }

        if (onlyOut) {
            return result.filter(item => item.out)
        }

        if (onlyIn) {
            return result.filter(item => !item.out)
        }
        
        return result
    })

    const field = computed(() => {
        const result = control.read().map(item => item.state);

        const getExpense = result.filter(item => item.out).map(item => item.nominal)
        const fixExpense = getExpense.length === 0 ? [0] : getExpense
        const expense = fixExpense.reduce((a, b) => a + b)
        
        const getIncome = result.filter(item => !item.out).map(item => item.nominal)
        const fixIncome = getIncome.length === 0 ? [0] : getIncome
        const income = fixIncome.reduce((a, b) => a + b)

        const total = income + expense

        return {
            expense: expense.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}),
            income: income.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}),
            total,
        }
    })

    const handleOnlyOut = () => {
        filter.onlyOut = !filter.onlyOut
        filter.onlyIn = false
    }
    
    const handleOnlyIn = () => {
        filter.onlyIn = !filter.onlyIn
        filter.onlyOut = false
    }
    
    const handleNormal = () => {
        filter.onlyIn = false
        filter.onlyOut = false
    }

    const handleOpenUpdateForm = ({getID}) => {
        isOpen.value = !isOpen.value
        isUpdate.value = !isUpdate.value
        
        const {id, date, desc, nominal, out} = record.datas.find(item => item.id === getID)
        const {getYear, getMonth, getDate} = extractDate(date) 

        fieldModel({id, date: `${getYear}-${getMonth}-${getDate}`, desc, nominal, out})
    }
    
    const handleOpenNewForm = () => {
        isOpen.value = !isOpen.value
     }

    const handleCloseForm = () => {
        isOpen.value = false;
        isUpdate.value = false
        
        fieldModel({id: record.counter + 1, date: `${defaultYear}-${defaultMonth}-${defaultDate}`, desc: "", nominal: "", out: true})

    }

    const handleNewTransaction = () => {
        control.create(model)
        record.counter += 1
        handleCloseForm()

    }
    
    const handleUpdateTransaction = () => {
        control.update(model)
        isOpen.value = false
        handleCloseForm()
    }

    
</script>

<template>
    <section id="expense-tracker" class="max-w-[500px] mx-auto relative auto-cols-fr gap-x-2 gap-y-4">
        <form v-if="isOpen" class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,.1)] backdrop-blur p-2 flex items-center justify-center">
            <div class="bg-slate-100 rounded-lg">
                <p class="id">ID-{{ model.id.toString().padStart(4, "0") }}</p>
                <label for="date">
                    <span>Date :</span>
                    <input type="date" name="date" id="date" v-model="model.date">
                </label>
                <label for="desc">
                    <span>Description :</span>
                    <input type="text" name="desc" id="desc" placeholder="description" v-model="model.desc">
                </label>
                <label for="nominal">
                    <span>Nominal :</span>
                    <input type="text" name="nominal" id="nominal" placeholder="0,00" class="text-right" v-model="model.nominal">
                </label>
                <div id="type">
                    <span>Transaction Type :</span>
                    <select name="out" id="out" v-model="model.out">
                        <option :value="true">expense</option>
                        <option :value="false">income</option>
                    </select>
                </div>
                
                <button type="button" id="update" v-if="isUpdate" @click="handleUpdateTransaction" class="bg-indigo-400">Update Transaction</button>
                <button type="button" id="new" v-else @click="handleNewTransaction" class="bg-amber-400">New Transaction</button>
                <button type="button" id="close" @click="handleCloseForm" class="bg-red-400">close</button>
            </div>
        </form>

        <button type="button" id="total" @click="handleNormal" :class="[field.total < 0 ? 'bg-red-400' : 'bg-emerald-400', 'font-bold']">{{ field.total.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}) }}</button>
        <button type="button" id="expense" @click="handleOnlyOut" class="bg-red-300">{{ field.expense }}</button>
        <button type="button" id="income" @click="handleOnlyIn" class="bg-emerald-300">{{ field.income }}</button>
        
        <select name="filter-primary" id="filter-primary" v-model="filter.primary" class="bg-indigo-300">
            <option value="">-- sort --</option>
            <option value="name">by Name</option>
            <option value="date">by Date</option>
            <option value="nominal">by Nominal</option>
        </select>

        <select name="filter-secondary" id="filter-secondary" v-model="filter.secondary" class="bg-indigo-300">
            <option value="az">{{ ["date", "nominal"].includes(filter.primary) ? "0 ~ 9" : "A ~ Z" }}</option>
            <option value="za">{{ ["date", "nominal"].includes(filter.primary) ? "9 ~ 0" : "Z ~ A" }}</option>
        </select>

        <ul id="list">
            <li v-for="item in record.datas" :key="item.id">
                <button type="button" @click="handleOpenUpdateForm({getID: item.id})" :class="[item.out ? 'bg-red-300':'bg-emerald-300']">
                <p :class="['id', 'text-xs text-slate-700']">ID-{{ item.id.toString().padStart(4, "0") }}</p>
                <p :class="['desc', 'font-bold text-md']">{{ item.desc}}</p>
                <p :class="['date', 'text-xs text-slate-700']">{{ item.date.toLocaleString("id-ID", {dateStyle: 'short'}) }}</p>
                <p :class="['nominal', 'font-bold text-md']">{{ item.nominal.toLocaleString("id-ID", {style: "currency", currency: "IDR", minimumFractionDigits: 0}) }}</p>
                </button>
            </li>
        </ul>
        <button type="button" id="add" @click="handleOpenNewForm()" class="bg-amber-300">New Transaction</button>
    </section>
</template>

<style scoped>
    #expense-tracker {
        display: grid;
        grid-template-areas: 
        'inco inco expe expe tota tota'
        'prim prim prim seco seco seco'
        'list list list list list list'
        'ntrx ntrx ntrx ntrx ntrx ntrx';
    }

    #total, #expense ,#income {
        aspect-ratio: 2/1;
        border-radius: 1rem;
    }

    #total{
        grid-area: tota;
    }
    #expense{
        grid-area: expe;
    }
    #income{
        grid-area: inco;
    }

    #filter-primary, #filter-secondary {
        text-align: center;
        border: 1px solid;
        padding: 5px;
        border-radius: 1rem;
    }

    #filter-primary{
        grid-area: prim;
    }
    #filter-secondary{
        grid-area: seco;
    }

    #list{
        grid-area: list;
        padding: 0px 10px;
    }

    #list li button {
        display: grid;
        grid-template-areas: 
        'idid idid date date'
        'desc desc nomi nomi';
        grid-template-columns: 1fr auto;
        width: 100%;
        padding: 5px 20px;
        gap: 5px;
        border-radius: 1rem;
        margin-bottom: 10px;
    }

    #list li button .id{
        grid-area: idid;
        text-align: left;
    }
    #list li button .desc{
        grid-area: desc;
        text-align: left;
    }
    #list li button .date{
        grid-area: date;
        text-align: right;
    }
    #list li button .nominal{
        grid-area: nomi;
        text-align: right;
    }

    #add{
        grid-area: ntrx;
        border: 1px solid;
        padding: 5px 10px;
        border-radius: 1rem;
    }

    #expense-tracker form div {
        display: grid;
        grid-template-areas: 
        'idid idid'
        'date date'
        'desc desc'
        'nomi nomi'
        'type type'
        'buto clos';
        gap: 5px;
        padding: 10px;
    }

    #expense-tracker form div .id{
        grid-area: idid;
    }
    #expense-tracker form div label[for=date]{
        grid-area: date;
    }
    #expense-tracker form div label[for=desc]{
        grid-area: desc;
    }
    #expense-tracker form div label[for=nominal]{
        grid-area: nomi;
    }
    #expense-tracker form div #type{
        grid-area: type;
    }
    #expense-tracker form div #new{
        grid-area: buto;
    }
    #expense-tracker form div #update{
        grid-area: buto;
    }
    #expense-tracker form div #close{
        grid-area: clos;
    }

    #expense-tracker form div .id {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
    }

    #expense-tracker form div label {
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 1rem;
        padding: 10px 15px;
    }

    #expense-tracker form div label span {
        font-weight: bold;
    }

    #expense-tracker form div label input {
        font-size: 1rem;
        padding: 5px;
        outline: 0;
    }

    #expense-tracker form div #type {
        padding: 10px 15px;
        border: 1px solid;
        border-radius: 1rem;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
    }

    #expense-tracker form div #type select {
        font-size: 1rem;
        padding: 5px;
        outline: 0;
    }

    #expense-tracker form #new {
        border: 1px solid;
        padding: 5px 10px;
        border-radius: 1rem;
    }
    #expense-tracker form #update {
        border: 1px solid;
        padding: 5px 10px;
        border-radius: 1rem;
    }
    #expense-tracker form #close {
        border: 1px solid;
        padding: 5px 10px;
        border-radius: 1rem;
    }
</style>