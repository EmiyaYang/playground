// 纪元开始时间戳
export const START_TIMESTAMP = 1579478400000;

export enum MonthSymbol {
  E = 0,
  F,
  G,
  A,
  X,
  Y,
  Z
}

export enum TimeUnit {
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
  YEAR = "year"
}

const DigitArr = [
  { unit: TimeUnit.SECOND, preDigit: 1000 },
  { unit: TimeUnit.MINUTE, preDigit: 60 },
  { unit: TimeUnit.HOUR, preDigit: 28 },
  { unit: TimeUnit.DAY, preDigit: 12 },
  { unit: TimeUnit.MONTH, preDigit: 17 },
  { unit: TimeUnit.YEAR, preDigit: 7 }
];

export class YMoment {
  timestamp: number;
  timeMap: {
    [key in TimeUnit]: { value: number; preDigit: number; nextDigit: number };
  };

  constructor(timestamp?: number) {
    if (timestamp == undefined) {
      timestamp = Date.now();
    }

    this.timestamp = timestamp;
    this.timeMap = serialize(this.timestamp);
  }

  get(type: TimeUnit) {
    return this.timeMap[type] && this.timeMap[type].value;
  }

  getDayOfWeek() {
    return new Date(this.timestamp).getDay();
  }

  // 输出示例: A070017 07:24:10
  format() {
    const month = MonthSymbol[this.timeMap.month.value];
    const day = zeroPadding(this.timeMap.day.value);
    const year = zeroPadding(this.timeMap.year.value, 4);
    const hour = zeroPadding(this.timeMap.hour.value);
    const minute = zeroPadding(this.timeMap.minute.value);
    const second = zeroPadding(this.timeMap.second.value);

    return `${month}${day}${year} ${hour}:${minute}:${second}`;
  }

  valueOf() {
    return this.timestamp;
  }
}

/**
 * 将不同单位的时间字符串转为数字
 */
export function getValue(value: number, unit: TimeUnit) {
  if (value === 0) return value;

  let index = DigitArr.findIndex(value => value.unit === unit);

  if (index < 0 || value < 0) throw new TypeError();

  let res = value;

  do {
    const digit = DigitArr[index].preDigit;

    res *= digit;
  } while (index-- > 0);

  return res;
}

/**
 * 将时间串转化为时间戳
 * @param str
 */
export function parse(str: string): number {
  const arr = JSON.parse(JSON.stringify(DigitArr));
  arr.reverse();

  const inputOrder = [
    TimeUnit.MONTH,
    TimeUnit.DAY,
    TimeUnit.YEAR,
    TimeUnit.HOUR,
    TimeUnit.MINUTE,
    TimeUnit.SECOND
  ];
  const reg = /(\w)(\d{2})(\d{4})\s(\d{2}):(\d{2}):(\d{2})/;

  return (
    inputOrder.reduce((acc, current, index) => {
      let value = 0;
      const char = str.replace(reg, "$" + (index + 1));

      if (current === TimeUnit.MONTH) {
        value = Number(MonthSymbol[<any>char]);
      } else if (current === TimeUnit.DAY) {
        value = Number(char) - 1;
      } else {
        value = Number(char);
      }

      value = value || 0;

      return acc + getValue(value, current);
    }, 0) + START_TIMESTAMP
  );
}

/**
 * 将时间戳格式化
 * @param timestamp
 */
export function format(timestamp: number) {
  const timeMap = serialize(timestamp);

  const month = MonthSymbol[timeMap.month.value];
  // 每月从第一天开始
  const day = zeroPadding(timeMap.day.value + 1);
  const year = zeroPadding(timeMap.year.value, 4);
  const hour = zeroPadding(timeMap.hour.value);
  const minute = zeroPadding(timeMap.minute.value);
  const second = zeroPadding(timeMap.second.value);

  return `${month}${day}${year} ${hour}:${minute}:${second}`;
}

function serialize(timestamp: number) {
  if (timestamp < START_TIMESTAMP) throw new TypeError("黄元前的就不算了.");

  let value = timestamp - START_TIMESTAMP;

  return DigitArr.reduce((acc: any, { unit, preDigit }, index) => {
    value = Math.floor(value / preDigit);
    const nextDigit =
      (DigitArr[index + 1] && DigitArr[index + 1].preDigit) || 0;

    let resValue = nextDigit ? value % nextDigit : value;

    acc[unit] = {
      value: resValue,
      preDigit,
      nextDigit
    };

    return acc;
  }, {});
}

export function zeroPadding(value: number | string, digit: number = 2): string {
  if (digit <= 0) throw new TypeError();

  let res = String(value);

  while (res.length < digit) res = "0" + res;

  return res;
}

/**
 * 1. 准备一个 4 * 7 的数组
 * 2. 获取首月首日的星期数记为起始点, 依次填入
 */
export function getMonthArr(year: number, month: number) {
  const arr = [];
}
