<script lang="ts" setup>
interface PriorityType {
  '+': number;
  '-': number;
  '/': number;
  '*': number;
}
const priority: PriorityType = {
  '+': 1,
  '-': 1,
  '/': 2,
  '*': 2,
};

interface InputsType {
  result: string;
  token: string;
  check: string;
}
const inputs = reactive<InputsType>({
  result: '0',
  token: '',
  check: '',
});

const onKeyDown = (e: any): void => {
  const allowed1: string = '1234567890.+-*/';
  const allowed2: string[] = ['Backspace', 'Shift'];
  if (allowed1.includes(e.key) || allowed2.includes(e.key)) {
    return;
  }

  e.preventDefault();
};

const onInput = (e: any) => {
  e.target.value = e.target.value.replace(/[^0-9.+\-*/()]/g, '') as string;
  inputs.token = e.target.value as string;
};

type TokenType = Array<number | string>;

const setTokenize = (): TokenType => {
  const { token }: { token: string } = inputs;
  const stack: TokenType = [];

  let joinNumber: string = '';

  if (token === undefined) return [0];

  for (let i = 0; i < token.length; i++) {
    const char: string = String(token[i]);

    if (char === ' ') continue;

    const isNumber: boolean = '1234567890'.includes(char);
    const isOperator: boolean = '+-*/()'.includes(char);

    if (isNumber || char === '.') {
      joinNumber += char;
    } else if (isOperator) {
      if (joinNumber) {
        stack.push(Number(joinNumber));
        joinNumber = '';
      }

      stack.push(char);
    }
  }

  if (joinNumber) {
    stack.push(Number(joinNumber));
  }

  return stack;
};

const setPostfix = (): TokenType => {
  const tokens: TokenType = setTokenize();
  const operators: string[] = [];
  const outputs: TokenType = [];

  if (tokens.length === 0) return [0];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (typeof token === 'number') outputs.push(token);

    if (typeof token === 'string') {
      const lastOperators: string = operators[operators.length - 1] as keyof PriorityType;
      while (
        operators.length !== 0 &&
        '+-*/'.includes(lastOperators) &&
        priority[lastOperators as keyof PriorityType] >= priority[token as keyof PriorityType]
      ) {
        outputs.push(operators.pop() as number | string);
      }
      operators.push(token);
    }

    if (token == '(') operators.push(token);

    if (token == ')') {
      while (operators.length !== 0 && operators[operators.length - 1] !== '(') {
        outputs.push(operators.pop() as number | string);
      }

      operators.pop();
    }
  }

  while (operators.length !== 0) {
    outputs.push(operators.pop() as number | string);
  }

  return outputs;
};

const result = computed(() => {
  const postfix = setPostfix();
  const stack: TokenType = [];

  const que: TokenType = [];

  for (let i = 0; i < postfix.length; i++) {
    const token = postfix[i];

    if (typeof token === 'number') {
      stack.push(token);
    } else {
      const b: number = stack.pop() as number;
      const a: number = stack.pop() as number;

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    }

    que.push(stack[0] as number);

    if (que.length > 2) {
      que.shift();
    }
  }

  if (que.length < 2) return stack[0];

  if (isNaN(que[1] as number)) return que[0];

  return stack[0];
});
</script>
<template>
  <section id="project" class="w-fit mx-auto">
    <table class="w-fit">
      <thead>
        <tr>
          <th>Jenis</th>
          <th>Operasi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Infix</td>
          <td>
            <input
              type="text"
              @keydown="onKeyDown"
              @input="onInput"
              v-model="inputs.token"
              name="token"
              id="token"
              class="outline-0"
              placeholder="Masukan Operasi" />
          </td>
        </tr>
        <tr>
          <td>Postfix</td>
          <td>{{ setPostfix().join(' ') }}</td>
        </tr>
        <tr>
          <td>Result</td>
          <td>{{ result }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
td,
th {
  border: 1px solid black;
  padding: 10px;
}
</style>
