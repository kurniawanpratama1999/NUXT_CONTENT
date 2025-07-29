<script setup>
    const priority = ref({
        '+': 1,
        '-': 1,
        '/': 2,
        '*': 2,
    })

    const inputs = reactive({
        result: '0',
        token: '',
        check:'',
    })
    
    const onKeyDown = (e) => {
        const allowed1 = '1234567890.+-*/'
        const allowed2 = ["Backspace", "Shift"]
        if (allowed1.includes(e.key) || allowed2.includes(e.key)) {
            return
        }

        e.preventDefault()
    };

    const onInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.+\-*/()]/g, '')
        inputs.token = e.target.value
    }

    const setTokenize = () => {
        const {token} = inputs
        const stack = []
        let joinNumber = ''

        if (!token) return 0

        for (let i = 0; i < token.length; i++) {
            const char = token[i];

            if (char === " ") continue;

            const isNumber = '1234567890'.includes(char)
            const isOperator = "+-*/()".includes(char)

            if (isNumber || char === '.') {
                joinNumber += char
            } else if (isOperator) {
                if (joinNumber) {
                    stack.push(Number(joinNumber))
                    joinNumber = ''
                }
                
                stack.push(char)
            }

        }
        
        if (joinNumber) {
            stack.push(Number(joinNumber))
        }

        return stack
    }

    const setPostfix = () => {
        const tokens = setTokenize()
        const operators = [];
        const outputs = [];

        const isOperator = (token) => "+-/*".includes(token);
        const isNumber = (token) => typeof token == 'number';

        if (tokens.length === 0) return 0;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (isNumber(token)) outputs.push(token);
            
            if (isOperator(token)) {
                while (operators.length !== 0
                && "+-*/".includes(operators[operators.length - 1])
                && priority.value[operators[operators.length - 1]] >= priority.value[token]) {
                    outputs.push(operators.pop());
                }
                operators.push(token)
            }

            if (token == "(" ) operators.push(token)

            if (token == ")") {
                while(operators.length !== 0 && operators[operators.length - 1] !== "(" ) {
                    outputs.push(operators.pop());
                }

                operators.pop()
            }
        }

        while(operators.length !== 0) {
            outputs.push(operators.pop());
        }


        return outputs
    }

    inputs.result = computed(() => {
        const postfix = setPostfix();
        const stack = [];

        const que = [];
        
        for (let i = 0; i < postfix.length; i++) {
            const token = postfix[i];

            if (typeof token === 'number'){
                stack.push(token)
            } else {
                const b = stack.pop()
                const a = stack.pop()

                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            }

            que.push(stack[0])
            if (que.length > 2) {
                que.shift()
            }
        }

        if (que.length < 2) return stack[0];

        if (isNaN(que[1])) return que[0]

        return stack[0]
    })


</script>
<template>
    <section id='project'>
        <table>
            <thead>
                <tr>
                    <th>Jenis</th>
                    <th>Operasi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Infix</td>
                    <td><input type='text' @keydown="onKeyDown" @input="onInput" v-model="inputs.token" name='token' id='token' class="outline-0" placeholder='Masukan Operasi'></td>
                </tr>
                <tr>
                    <td>Postfix</td>
                    <td>{{ setPostfix().join(" ") }}</td>
                </tr>
                <tr>
                    <td>Result</td>
                    <td>{{ inputs.result }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>