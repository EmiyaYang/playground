import {
  YMoment,
  TimeUnit,
  zeroPadding,
  START_TIMESTAMP,
  getValue,
  MonthSymbol,
  parse,
  format
} from "@/utils";

describe("YMoment", () => {
  let timestamp = Date.now();

  let moment = new YMoment(timestamp);

  beforeEach(() => {
    timestamp = Date.now();
    moment = new YMoment(timestamp);
  });

  it("common", () => {
    expect(moment.valueOf()).toEqual(timestamp);

    expect(moment.getDayOfWeek()).toEqual(new Date(timestamp).getDay());
  });

  it("get", () => {
    const ts = timestamp - START_TIMESTAMP;

    let value = Math.floor(ts / 1000);
    value %= 60;

    expect(moment.get(TimeUnit.SECOND)).toEqual(value);

    value = Math.floor(ts / 1000 / 60);
    value %= 28;
    expect(moment.get(TimeUnit.MINUTE)).toEqual(value);

    value = Math.floor(ts / 1000 / 60 / 28);
    value %= 12;
    expect(moment.get(TimeUnit.HOUR)).toEqual(value);

    value = Math.floor(ts / 1000 / 60 / 28 / 12);
    value %= 17;
    expect(moment.get(TimeUnit.DAY)).toEqual(value);

    value = Math.floor(ts / 1000 / 60 / 28 / 12 / 17);
    value %= 7;
    expect(moment.get(TimeUnit.MONTH)).toEqual(value);

    value = Math.floor(ts / 1000 / 60 / 28 / 12 / 17 / 7);
    expect(moment.get(TimeUnit.YEAR)).toEqual(value);
  });

  it("parse", () => {
    const sampleA = "E010000 00:00:00";
    const sampleB = "E010001 00:00:00";
    const sampleC = "A070017 07:24:10";

    expect(parse(sampleA)).toEqual(START_TIMESTAMP);
    expect(parse(sampleB)).toEqual(
      START_TIMESTAMP + 7 * 17 * 12 * 28 * 60 * 1000
    );
    expect(parse(sampleC)).toEqual(
      START_TIMESTAMP +
        getValue(MonthSymbol.A, TimeUnit.MONTH) +
        getValue(7 - 1, TimeUnit.DAY) +
        getValue(17, TimeUnit.YEAR) +
        getValue(7, TimeUnit.HOUR) +
        getValue(24, TimeUnit.MINUTE) +
        getValue(10, TimeUnit.SECOND)
    );
  });

  it("format", () => {
    const sampleA = "E010000 00:00:00";
    const sampleB = "E010001 00:00:00";
    const sampleC = "A070017 07:24:10";

    const timestampA = parse(sampleA);
    const timestampB = parse(sampleB);
    const timestampC = parse(sampleC);

    expect(format(timestampA)).toEqual(sampleA);
    expect(format(timestampB)).toEqual(sampleB);
    expect(format(timestampC)).toEqual(sampleC);
  });

  // it("two directions", () => {
  //   expect(moment.parse(moment.format())).toEqual(timestamp);
  // });
});

describe("otherUtils", () => {
  it("zeroPadding", () => {
    expect(zeroPadding(1)).toEqual("01");
    expect(zeroPadding(1, 3)).toEqual("001");
  });

  it("getValue", () => {
    expect(getValue(0, TimeUnit.SECOND)).toEqual(0);
    expect(getValue(1, TimeUnit.SECOND)).toEqual(1000);
    expect(getValue(1, TimeUnit.MINUTE)).toEqual(1000 * 60);
    expect(getValue(1, TimeUnit.HOUR)).toEqual(1000 * 60 * 28);
    expect(getValue(1, TimeUnit.DAY)).toEqual(1000 * 60 * 28 * 12);
    expect(getValue(1, TimeUnit.MONTH)).toEqual(1000 * 60 * 28 * 12 * 17);
    expect(getValue(1, TimeUnit.YEAR)).toEqual(1000 * 60 * 28 * 12 * 17 * 7);
    expect(getValue(2, TimeUnit.YEAR)).toEqual(
      1000 * 60 * 28 * 12 * 17 * 7 * 2
    );
  });
});
