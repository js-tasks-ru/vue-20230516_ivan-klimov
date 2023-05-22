import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'VueCalculator',
  data() {
    return {
      operandA: 0,
      operandB: 0,
      operators: [
        {
          name: 'sum',
          value: '+',
        },
        {
          name: 'subtract',
          value: '-',
        },
        {
          name: 'multiply',
          value: '✖',
        },
        {
          name: 'divide',
          value: '➗',
        }
      ],
      selectedOperator: 'sum',
    };
  },

  computed: {
    result() {
      return this.selectedExpressions(this.selectedOperator);
    },
  },

  methods: {
    selectedExpressions(operator) {
      const expressions = {
        sum: () => this.operandA + this.operandB,
        subtract: () => this.operandA - this.operandB,
        multiply: () => this.operandA * this.operandB,
        divide: () => this.operandA / this.operandB,
      };

      return expressions[operator]();
    }
  },
});

const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
