<template>
  <van-circle
    class="outer"
    v-model="currentRate"
    color="2C3E50"
    layer-color="#64656630"
    :rate="30"
    :speed="100"
  >
    <van-circle
      class="inner"
      layer-color="#64656630"
      color="2C3E50"
      v-model="currentRate"
      :rate="30"
      :speed="100"
      :text="text"
    >
      <slot />
    </van-circle>
  </van-circle>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Clock extends Vue {
  @Prop() text!: string;
  currentRate: number = 0.5;
}
</script>

<style lang="scss" scoped>
.outer {
  width: 200px !important;
  height: 200px !important;
}

.inner {
  width: 180px !important;
  height: 180px !important;
  top: 10px;
  // margin-bottom: 10px;
}
</style>
