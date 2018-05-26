<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <page-vue></page-vue>
    <router-link to="/">home</router-link>
    <router-link to="/vuex">vuex</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import PageVue from '@/client/components/hello'
export default {
  metaInfo: {
    title: '首页'
  },
  data () {
    return {
      msg: 'vue-ssr-template'
    }
  },
  components: {
    PageVue
  }
}
</script>
<style lang="less" scoped>
.app {
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 14px;
  h1 {
    font-size: 50px;
    margin: 0;
  }
}
</style>
