import { YMoment, TimeUnit } from "@/utils";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const timestamp = Date.now();

    const moment = new YMoment(timestamp);

    expect(moment.valueOf()).toEqual(timestamp);
    expect(moment.get(TimeUnit.SECOND)).toEqual(
      new Date(timestamp).getSeconds()
    );
  });
});
