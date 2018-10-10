import Vue from 'vue';

const app = new Vue({
  // el: '#root',
  // template: '<div>{{ text }}</div>',
  data: {
    text: 0
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate');
  },
  created() {
    console.log(this.$el, 'created');
  },
  beforeMount() {   // SSR 不会调用
    console.log(this.$el, 'beforeMount');
  },
  mounted() {   // SSR 不会调用
    console.log(this.$el, 'mounted');
  },
  beforeUpdate() {
    console.log(this, 'beforeUpdate');
  },
  updated() {
    console.log(this, 'updated');
  },
  activated() {   // keep-alive
    console.log(this, 'activated');
  },
  deactivated() {
    console.log(this, 'deactivated');
  },
  beforeDestroy() {
    console.log(this, 'beforeDestroy');
  },
  destroyed() {
    console.log(this, 'destroyed');
  },
  errorCaptured() {
    // 子组件出错
    console.log(this, 'errorCaptured');
  },
  render(h) {
    // 在 beforeMoount 和 mounted 之间执行
    console.log('render function invoked');
    return h('div', {}, this.text)
  },
  renderError(h, err) {
    // 当前组件出错
    return h('div', {}, err.stack);
  }
});

app.$mount('#root');

// setInterval(() => {
//   app.text = app.text + 1;
// }, 1000);

setTimeout(() => {
  app.$destroy();
}, 1000);
