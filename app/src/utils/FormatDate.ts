export class FormatDate {
  private constructor() {}
  static leadingZero = (num: number) => `0${num}`.slice(-2);

  static datePattern = (date: Date) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.getHours()}:${FormatDate.leadingZero(
      date.getMinutes()
    )}`;
  };
}
