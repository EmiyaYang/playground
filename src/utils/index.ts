// 7 个月
const MONTH = ["E", "F", "A", "X", "Y", "Z"];

export enum TimeUnit {
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
  YEAR = "year"
}

function getTimeMap(timestamp: number) {
  const arr = [
    { unit: TimeUnit.SECOND, digit: 1000 },
    { unit: TimeUnit.MINUTE, digit: 60 },
    { unit: TimeUnit.HOUR, digit: 28 },
    { unit: TimeUnit.DAY, digit: 12 },
    { unit: TimeUnit.MONTH, digit: 17 },
    { unit: TimeUnit.YEAR, digit: 7 }
  ];

  return arr.map(({ unit, digit }, index) => {
    let value = Math.floor(timestamp / digit);
    const nextDigit = (arr[index + 1] && arr[index + 1].digit) || 0;

    if (nextDigit) {
      value %= nextDigit;
    }

    return { unit, value };
  });
}

export class YMoment {
  timestamp: number;
  timeArr: Array<{ unit: TimeUnit; value: number }>;

  constructor(timestamp: number) {
    this.timestamp = timestamp;
    this.timeArr = getTimeMap(this.timestamp);
  }

  get(type: TimeUnit) {
    const time = this.timeArr.find(item => item.unit === type);

    return (time && time.value) || undefined;
  }

  valueOf() {
    return this.timestamp;
  }
}
