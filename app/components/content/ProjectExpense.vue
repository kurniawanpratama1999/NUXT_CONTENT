<script lang="ts" setup>
const { addTransaction, readTransaction, removeTransaction, updateTransaction } = useExpense();

type HookType = {
  counterID: number;
  isOpenForm: boolean;
  isUpdateForm: boolean;
  displayRupiah: string;
};

const hook = reactive<HookType>({
  counterID: 0,
  isOpenForm: false,
  isUpdateForm: false,
  displayRupiah: '',
});

type FilterType = {
  primary: string;
  secondary: string;
  isOnlyTransactionOut: boolean;
  isOnlyTransactionIn: boolean;
};

const filter = reactive<FilterType>({
  primary: '',
  secondary: 'az',
  isOnlyTransactionOut: false,
  isOnlyTransactionIn: false,
});

const expenseModel = reactive<Omit<ExpenseModel, 'date'> & { date: string }>({
  id: 0,
  date: new Date().toISOString().slice(0, 10),
  desc: '',
  nominal: 0,
  out: true,
});

hook.counterID += 1;
addTransaction({ id: hook.counterID, date: '2025-08-08', desc: 'Jajan', nominal: 1000, out: true });

hook.counterID += 1;
addTransaction({ id: hook.counterID, date: '2025-08-08', desc: 'Bensin', nominal: 3000, out: true });

hook.counterID += 1;
addTransaction({ id: hook.counterID, date: '2025-08-08', desc: 'Kopi', nominal: 2000, out: true });

hook.counterID += 1;
addTransaction({ id: hook.counterID, date: '2025-08-08', desc: 'Pendapatan', nominal: 5000, out: false });

hook.counterID += 1;
addTransaction({ id: hook.counterID, date: '2025-08-08', desc: 'Pulsa', nominal: 4000, out: true });

const transaction = computed(() => {
  let transactionCollection: ExpenseModel[] = [...readTransaction()].reverse();

  if (filter.primary === 'name' && filter.secondary === 'az') {
    transactionCollection = transactionCollection.sort((a, b) => a.desc.localeCompare(b.desc));
  } else if (filter.primary === 'name' && filter.secondary === 'za') {
    transactionCollection = transactionCollection.sort((a, b) => b.desc.localeCompare(a.desc));
  } else if (filter.primary === 'nominal' && filter.secondary === 'az') {
    transactionCollection = transactionCollection.sort((a, b) => a.nominal - b.nominal);
  } else if (filter.primary === 'nominal' && filter.secondary === 'za') {
    transactionCollection = transactionCollection.sort((a, b) => b.nominal - a.nominal);
  } else if (filter.primary === 'date' && filter.secondary === 'az') {
    transactionCollection = transactionCollection.sort((a, b) => Number(a.date) - Number(b.date));
  } else if (filter.primary === 'date' && filter.secondary === 'za') {
    transactionCollection = transactionCollection.sort((a, b) => Number(b.date) - Number(a.date));
  }

  if (filter.isOnlyTransactionOut) return transactionCollection.filter((i) => i.out);
  if (filter.isOnlyTransactionIn) return transactionCollection.filter((i) => !i.out);

  return transactionCollection;
});

type TransactionCategoryType = {
  expense: string;
  income: string;
  total: number;
};

const transactionCategory = computed<TransactionCategoryType>(() => {
  const expense: number = [...readTransaction()]
    .filter((i) => i.out)
    .map((i) => i.nominal)
    .reduce((a, b) => a + b);
  const income: number = [...readTransaction()]
    .filter((i) => !i.out)
    .map((i) => i.nominal)
    .reduce((a, b) => a + b);
  const total = income + expense;

  return {
    expense: expense.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }),
    income: income.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }),
    total,
  };
});

const toggleFilterTransactionOut = () => {
  filter.isOnlyTransactionOut = !filter.isOnlyTransactionOut;
  filter.isOnlyTransactionIn = false;
};

const toggleFilterTransactionIn = () => {
  filter.isOnlyTransactionIn = !filter.isOnlyTransactionIn;
  filter.isOnlyTransactionOut = false;
};

const toggleFilterTransactionNormal = () => {
  filter.isOnlyTransactionIn = false;
  filter.isOnlyTransactionOut = false;
};

const handleOpenUpdateForm = ({ id }: { id: number }): void => {
  hook.isOpenForm = !hook.isOpenForm;
  hook.isUpdateForm = !hook.isUpdateForm;
  const findTRX = readTransaction().find((i) => i.id === id);
  if (findTRX) {
    console.log(findTRX.date.toISOString().slice(0, 10));
    expenseModel.id = findTRX.id;
    expenseModel.date = findTRX.date.toISOString().slice(0, 10);
    expenseModel.desc = findTRX.desc;
    expenseModel.nominal = findTRX.nominal;
    expenseModel.out = findTRX.out;
    hook.displayRupiah = formatRupiah(findTRX.nominal);
  }
};

const handleOpenNewForm = () => {
  hook.isOpenForm = !hook.isOpenForm;
};

const handleCloseForm = () => {
  hook.isOpenForm = false;
  hook.isUpdateForm = false;

  expenseModel.id = 0;
  expenseModel.date = new Date().toISOString().slice(0, 10);
  expenseModel.desc = '';
  expenseModel.nominal = 0;
  expenseModel.out = true;
  hook.displayRupiah = formatRupiah(0);
};

function formatRupiah(value: number): string {
  const abs: number = Math.abs(value);
  const formatter: string = new Intl.NumberFormat('id-ID').format(abs);
  return value < 0 ? `-Rp ${formatter}` : `Rp ${formatter}`;
}

// Parse string input ke number
function parseRupiah(value: string): number {
  const clean: string = value.replace(/[^0-9-]/g, '');
  return parseInt(clean || '0');
}

// Tangani input format
function onInput(e: any): void {
  const num: number = parseRupiah(e.target.value);
  expenseModel.nominal = num;
  hook.displayRupiah = formatRupiah(num);
}

// Tangani key yang diperbolehkan
function onKeyDown(e: any) {
  const allowed: string = '0123456789-';
  const allowedKeys: string[] = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  if (
    allowed.includes(e.key) ||
    allowedKeys.includes(e.key) ||
    (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
  ) {
    return;
  }
  e.preventDefault();
}

const handleAddTransaction = (): void => {
  addTransaction(expenseModel);
  hook.isOpenForm = false;
  handleCloseForm();
};

const handleRemoveTransaction = (model: Pick<ExpenseModel, 'id'>): void => {
  removeTransaction(model);
  hook.isOpenForm = false;
  handleCloseForm();
};

const handleUpdateTransaction = (): void => {
  updateTransaction({
    id: expenseModel.id,
    date: expenseModel.date,
    desc: expenseModel.desc,
    nominal: expenseModel.nominal,
    out: expenseModel.out as boolean,
  });
};
</script>
<template>
  <section id="expense-tracker" class="max-w-[500px] mx-auto relative auto-cols-fr gap-x-2 gap-y-4">
    <form
      v-if="hook.isOpenForm"
      class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,.1)] backdrop-blur p-2 flex items-center justify-center">
      <div class="bg-slate-100 rounded-lg">
        <p class="id">ID-{{ expenseModel.id.toString().padStart(4, '0') }}</p>
        <button
          id="delete"
          type="button"
          v-if="hook.isUpdateForm"
          @click="handleRemoveTransaction({ id: expenseModel.id })"
          class="bg-red-400">
          delete
        </button>
        <label for="date">
          <span>Date :</span>
          <input type="date" name="date" id="date" v-model="expenseModel.date" />
        </label>
        <label for="desc">
          <span>Description :</span>
          <input type="text" name="desc" id="desc" placeholder="description" v-model="expenseModel.desc" required />
        </label>
        <label for="nominal">
          <span>Nominal :</span>
          <input
            type="text"
            name="nominal"
            id="nominal"
            placeholder="Rp 0,00"
            class="text-right"
            v-model="hook.displayRupiah"
            @input="onInput"
            @keydown="onKeyDown"
            required />
        </label>
        <div id="type">
          <span>Transaction Type :</span>
          <select name="out" id="out" v-model="expenseModel.out">
            <option :value="true">expense</option>
            <option :value="false">income</option>
          </select>
        </div>

        <button
          type="button"
          id="update"
          v-if="hook.isUpdateForm"
          @click="handleUpdateTransaction"
          class="bg-indigo-400">
          Update Transaction
        </button>
        <button type="button" id="new" v-else @click="handleAddTransaction" class="bg-amber-400">
          New Transaction
        </button>
        <button type="button" id="close" @click="handleCloseForm" class="bg-red-400">close</button>
      </div>
    </form>

    <button type="button" id="total" @click="toggleFilterTransactionNormal" :class="['bg-amber-300', 'font-bold']">
      {{
        transactionCategory.total.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        })
      }}
    </button>
    <button type="button" id="expense" @click="toggleFilterTransactionOut" class="bg-red-300">
      {{ transactionCategory.expense }}
    </button>
    <button type="button" id="income" @click="toggleFilterTransactionIn" class="bg-emerald-300">
      {{ transactionCategory.income }}
    </button>

    <select name="filter-primary" id="filter-primary" v-model="filter.primary" class="bg-indigo-300">
      <option value="">-- sort --</option>
      <option value="name">by Name</option>
      <option value="date">by Date</option>
      <option value="nominal">by Nominal</option>
    </select>

    <select name="filter-secondary" id="filter-secondary" v-model="filter.secondary" class="bg-indigo-300">
      <option value="az">{{ ['date', 'nominal'].includes(filter.primary) ? '0 ~ 9' : 'A ~ Z' }}</option>
      <option value="za">{{ ['date', 'nominal'].includes(filter.primary) ? '9 ~ 0' : 'Z ~ A' }}</option>
    </select>

    <ul id="list" class="overflow-y-auto max-h-[300px]">
      <li v-for="item in transaction" :key="item.id">
        <button
          type="button"
          @click="handleOpenUpdateForm({ id: item.id })"
          :class="[item.out ? 'bg-red-300' : 'bg-emerald-300']">
          <p :class="['id', 'text-xs text-slate-700']">ID-{{ item.id.toString().padStart(4, '0') }}</p>
          <p :class="['desc', 'font-bold text-md']">{{ item.desc }}</p>
          <p :class="['date', 'text-xs text-slate-700']">
            {{ item.date.toLocaleDateString('id-ID') }}
          </p>
          <p :class="['nominal', 'font-bold text-md']">
            {{ item.nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}
          </p>
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

#total,
#expense,
#income {
  aspect-ratio: 2/1;
  border-radius: 1rem;
}

#total {
  grid-area: tota;
}
#expense {
  grid-area: expe;
}
#income {
  grid-area: inco;
}

#filter-primary,
#filter-secondary {
  text-align: center;
  border: 1px solid;
  padding: 5px;
  border-radius: 1rem;
}

#filter-primary {
  grid-area: prim;
}
#filter-secondary {
  grid-area: seco;
}

#list {
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

#list li button .id {
  grid-area: idid;
  text-align: left;
}
#list li button .desc {
  grid-area: desc;
  text-align: left;
}
#list li button .date {
  grid-area: date;
  text-align: right;
}
#list li button .nominal {
  grid-area: nomi;
  text-align: right;
}

#add {
  grid-area: ntrx;
  border: 1px solid;
  padding: 5px 10px;
  border-radius: 1rem;
}

#expense-tracker form div {
  display: grid;
  grid-template-areas:
    'idid dele'
    'date date'
    'desc desc'
    'nomi nomi'
    'type type'
    'buto clos';
  gap: 5px;
  padding: 10px;
}

#expense-tracker form div .id {
  grid-area: idid;
  justify-self: start;
}
#expense-tracker form div #delete {
  grid-area: dele;
  justify-self: end;
  padding: 5px 20px;
  border-radius: 1rem;
  border: 1px solid;
}
#expense-tracker form div label[for='date'] {
  grid-area: date;
}
#expense-tracker form div label[for='desc'] {
  grid-area: desc;
}
#expense-tracker form div label[for='nominal'] {
  grid-area: nomi;
}
#expense-tracker form div #type {
  grid-area: type;
}
#expense-tracker form div #new {
  grid-area: buto;
}
#expense-tracker form div #update {
  grid-area: buto;
}
#expense-tracker form div #close {
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
