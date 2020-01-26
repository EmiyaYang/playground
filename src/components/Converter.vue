<template>
  <section class="converter">
    <van-overlay z-index="2" :show="commonDatePickerVisible">
      <van-datetime-picker
        class="picker"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        type="datetime"
      />
    </van-overlay>
    <van-cell-group class="converter-main">
      <van-field
        v-model="commonDate"
        label="公历"
        @click="commonDatePickerVisible = true"
      />
      <van-field v-model="yDate" :label="appTitle" readonly />
      <van-icon class="converter-main__icon" name="exchange" />
    </van-cell-group>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import { format, YMoment, appTitle, START_TIMESTAMP } from "../utils";

@Component
export default class Converter extends Vue {
  @Prop() private init!: YMoment;

  currentDate = new Date();

  commonDatePickerVisible = false;

  commonDate = "";

  yDate = "";

  get minDate() {
    return new Date(START_TIMESTAMP);
  }

  get maxDate() {
    return new Date("2100-10-10");
  }

  get appTitle() {
    return appTitle;
  }

  handleCancel() {
    this.commonDatePickerVisible = false;
  }

  handleConfirm() {
    this.commonDatePickerVisible = false;
    this.updateFields();
  }

  updateFields() {
    this.commonDate = moment(this.currentDate).format("YYYY-MM-DD HH:mm:ss");
    this.yDate = format(this.currentDate.valueOf());
  }

  mounted() {
    this.currentDate = new Date(this.init.valueOf());
    this.updateFields();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.picker {
  bottom: 0;
  position: absolute;
  left: 0;
  width: 100%;
}

.converter {
  .van-cell {
    padding: 10px 0;
  }

  &-main {
    position: relative;
    &__icon {
      position: absolute;
      background: white;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
