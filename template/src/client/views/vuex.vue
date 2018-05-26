<template>
  <div class="page">
    <h1>vuex</h1>
    <p>vuex test</p>
    <div>
      <h2>State</h2>
      <p>num: {{num}}</p>
      <p>firstName: {{firstName}}</p>
      <p>lastName: {{lastName}}</p>
    </div>
    <div>
      <h2>Mutations</h2>
      <input type="text" v-model.number="increNum" placeholder="num增加">
      <button @click="syncUpdateNum">+</button>
    </div>
    <div>
      <h2>getters</h2>
      <p>fullName: {{fullName}}</p>
    </div>
    <div>
      <h2>actions</h2>
      <h4>让num在{{time}}毫秒后,自增{{addNum}}</h4>
      <input type="text" v-model.number="time" placeholder="时间毫秒">
      <input type="text" v-model.number="addNum" placeholder="num自增的值">
      <button @click="asyncUpdateNum">开始</button>
      <p>num: {{num}}</p>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  metaInfo: {
    title: 'vuex',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'i am some description'
      }
    ]
  },
  data () {
    return {
      increNum: null,
      time: null,
      addNum: null
    }
  },
  computed: {
    ...mapState(['num', 'firstName', 'lastName']),
    ...mapGetters({
      fullName: 'getFullName'
    })
  },
  methods: {
    // 用mapMutations,mapActions辅助函数的写法
    ...mapMutations([
      'increment'
    ]),
    ...mapActions(['updateNum']),
    syncUpdateNum () {
      this.increment(this.increNum)
      this.increNum = null
    },
    asyncUpdateNum () {
      const data = {
        time: this.time,
        num: this.addNum
      }
      this.updateNum(data)
    }
    // 使用this.$store的写法
    // syncUpdateNum () {
    //   this.$store.commit('increment', this.increNum)
    //   this.increNum = null
    // },
    // asyncUpdateNum () {
    //   let data = {
    //     time: this.time,
    //     num: this.addNum
    //   }
    //   this.$store.dispatch('updateNum', data)
    // }
  }
}
</script>
<style lang="less" scoped>
.page {
  background-color: rgba(201, 179, 179, .3);
}
</style>
