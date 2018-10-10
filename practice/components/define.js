import Vue from 'vue';

const component = {
  template: `
    <div>This is component {{ text }}</div>
  `,
  data() {
    return {
      text: 123
    }
  }
};

// Vue.component('CompOne', component);

new Vue({
  el: '#root',
  // template: '<comp-one></comp-one>'
  template: '<CompOne></CompOne>',
  components: {
    CompOne: component
  }
});
