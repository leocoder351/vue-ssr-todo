import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <p v-show="active" v-text="'Text: ' + text">Text: {{ text }}</p>
      <p v-if="active" v-html="html"></p>
      <p v-else-if="text === 0">else if content</p>
      <p v-else>else content</p>
      <ul>
        <li v-for="(item, index) in arr" :key="item">第{{ index }}个： {{ item }}</li>
        <li v-for="(val, key, index) in obj" :key="val">{{ key }}: {{ val }}: {{ index }}</li>  
      </ul>
      <div>
        <button @click="isShowUsername = !isShowUsername">切换</button>
        <div v-if="isShowUsername">
          <label for="username"></label>
          登录：<input type="text" id="username">
        </div>
        <div v-else>
          <label for="sign"></label>
          注册：<input type="text" id="sign">
        </div>
      </div>
    </div>
  `,
  data: {
    arr: [1,2,3],
    isShowUsername: true,
    obj: {
      a: 123,
      b: 456,
      c: 789
    },
    text: 0,
    active: false,
    html: '<h3>This is html</h3>'
  }
})
