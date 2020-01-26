<template>
  <div id="app" class="app">
    <section class="app-header">冕历</section>

    <section class="app-body">
      <Clock class="app-body__clock" :text="showTime">
        <!-- <section>{{ showTime }}</section> -->
      </Clock>
      <van-grid class="calendar" :column-num="4">
        <van-grid-item
          v-for="value in 17"
          :class="{
            calendar__item: true,
            'calendar__item--active': value === currentDay,
            'calendar__item--inactive': value > currentDay
          }"
          :key="value"
          :text="`Day ${value}`"
        />
      </van-grid>
    </section>

    <van-divider class="app-footer">一路前行, 冕历勉励🍐</van-divider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { YMoment, TimeUnit } from "./utils";
import Clock from "@/components/Clock.vue";

@Component({
  components: {
    Clock
  }
})
export default class App extends Vue {
  showTime: String = "";
  currentDay: Number = 0;
  timer: number = 0;

  created() {
    this.timer = setInterval(() => {
      const moment = new YMoment();

      this.showTime = moment.format();

      this.currentDay = moment.get(TimeUnit.DAY);
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  &-header {
    padding-top: 10px;
    height: 10vh;
    font-size: 2em;
  }

  &-body {
    height: 80vh;

    &__clock {
      margin-bottom: 10px;
    }
  }

  &-footer {
    height: 10vh;
    margin: 0;
  }
}

.calendar {
  &__item {
    &--active {
      .van-grid-item__content {
        background: #2c3e50;
      }

      .van-grid-item__text {
        color: white;
      }
    }

    &--inactive {
      .van-grid-item__text {
        color: #64656675;
      }
    }
  }
}
</style>
