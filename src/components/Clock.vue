<template>
  <van-circle
    key="second"
    class="outer"
    :value="secondRate"
    :color="color"
    :layer-color="layerColor"
    :speed="100"
  >
    <van-circle
      key="minute"
      class="middle"
      :layer-color="layerColor"
      :color="color"
      :value="minuteRate"
      :speed="100"
    >
      <van-circle
        class="inner"
        :layer-color="layerColor"
        :color="color"
        :value="hourRate"
        :speed="100"
      >
        <span class="inner__text">
          {{ text }}
        </span>
      </van-circle>
    </van-circle>
  </van-circle>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { zeroPadding, YMoment, TimeUnit } from "../utils";

@Component
export default class Clock extends Vue {
  @Prop() moment!: YMoment;

  color = {
    "0%": "#2C3E50",
    "100%": "#007EA7"
  };

  layerColor = "#f5f5f5";

  get text() {
    const date = this.moment.format().split(" ")[0];

    return `${date}
     ${zeroPadding(this.hour, 2)}:${zeroPadding(this.minute, 2)}:${zeroPadding(
      this.second,
      2
    )}`;
  }

  get secondRate() {
    return (this.second / 60) * 100;
  }

  get minuteRate() {
    return (this.minute / 28) * 100;
  }

  get hourRate() {
    return (this.hour / 14) * 100;
  }

  get second() {
    return this.moment.get(TimeUnit.SECOND);
  }

  get minute() {
    return this.moment.get(TimeUnit.MINUTE);
  }

  get hour() {
    return this.moment.get(TimeUnit.HOUR);
  }
}
</script>

<style lang="scss" scoped>
.outer {
  width: 200px !important;
  height: 200px !important;
}

.middle {
  width: 180px !important;
  height: 180px !important;
  top: 10px;
  // margin-bottom: 10px;
}

.inner {
  width: 160px !important;
  height: 160px !important;
  top: 10px;
  // margin-bottom: 10px;

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
}
</style>
