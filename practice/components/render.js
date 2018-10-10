import Vue from 'vue';

new Vue({
  template: `
    <comp-one ref="comp">
      <span ref="span">{{value}}</span>
    </comp-one>
  `,
  render(createElement) {
    return createElement('comp-one', {
      ref: 'comp'
    }, [
      createElement('span', {
        ref: 'span'
      }, this.value)
    ]);
  }
});
