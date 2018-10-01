<template>
  <div id="app">
    <div id="cover">
      <Header />
      <Todo />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import Footer from './layout/Footer.jsx'
import Todo from './views/todo/Todo.vue'

console.log('docs', Header.__docs )

export default {
  data () {
    return {
      text: 'abcde'
    }
  },
  components: {
    Header, Footer, Todo
  }
}
</script>

<style scoped lang="stylus">
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
