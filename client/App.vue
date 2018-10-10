<template>
  <div id="app">
    <div id="cover">
      <Header />
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './layout/Header.vue';
import Footer from './layout/Footer.jsx';

export default {
  data () {
    return {
      text: 'abcde'
    };
  },
  components: {
    Header, Footer
  }
};
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
