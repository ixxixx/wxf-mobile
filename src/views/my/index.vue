<template>
  <div id="me">
    <router-view />
      <TabNav></TabNav>
  </div>
</template>

<script>
import TabNav from '@/components/tabNav.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    TabNav
  }
}
</script>

<style lang="less" scoped>
</style>
