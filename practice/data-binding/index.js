import Vue from 'vue';

var globalVar = '111';

new Vue({
  el: '#root',
  // template: `
  //   <div v-bind:id="aaa" v-on:click="handleClick">
  //     <p v-html="html"></p>
  //     {{ html }}
  //   </div>
  // `,
  template: `
    <div :class="{active: !isActive}">
      <p :class="['aaa', {active: !isActive}]" :style="{color: 'red'}"></p>
      <p>{{ getJoinedArr(arr) }}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main'
  },
  methods: {
    handleClick() {
      alert('clicked');
    },
    getJoinedArr(arr) {
      return arr.join(' ');
    }
  }
});;
