import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <span>Name: {{ firstName + ' ' + lastName }}</span>
      <span>Name: {{ fullName }}</span>
      <p>{{ obj.a }} <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'leo',
    lastName: 'coder',
    obj: {
      a: 123
    }
  },
  watch: {
    // obj: {
    //   deep: true,
    //   immediate: true,
    //   handler(newVal, oldVal) {
    //     console.log('newVal', newVal);
    //   }
    // },
    'obj.a': {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        console.log('newVal', newVal);
      }
    }
  },
  computed: {
    fullName() {
      // computed 需要 return，所以不适合用于异步
      // watch 可以用于异步
      return `${this.firstName} ${this.lastName}`
    }
  }
});
