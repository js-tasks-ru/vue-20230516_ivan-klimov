export default class CalendarDayData {
  constructor(day = 1, content = [], inactiveClass = '') {
    this.day = day;
    this.content = content;
    this.inactiveClass = inactiveClass;
  }
}