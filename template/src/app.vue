<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <page-vue></page-vue>
  </div>
</template>
<script>
import PageVue from '@/components/hello'
export default {
  data () {
    return {
      msg: 'hello world'
    }
  },
  components: {
    PageVue
  }
}
</script>
<style lang="less" scoped>
.app {
  background-image: url('./assets/1.jpg');
  color: red;
  h1 {
    font-size: 50px;
  }
}
</style>


