import Vue from 'vue';

const component = {
  template: `
    <div>{{ text }}</div>
  `,
  data() {
    return {
      text: 123
    }
  }
}

const CompVue = Vue.extend(component);
