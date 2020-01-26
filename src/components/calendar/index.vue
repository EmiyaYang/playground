<template>
  <table></table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// import Button from "vant/lib/button";
// import "vant/lib/button/style";

/**
 * 指定某年某月, 表格展现当月的日期与星期的分布关系
 * 1. 高亮显示当天
 * 2. 获取首月第一天的星期数
 *
 * 1. 准备一个 4 * 7 的数组
 * 2. 获取首月首日的星期数记为起始点, 依次填入
 */
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
