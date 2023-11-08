import { DayModel } from "./day-model"

enum MonthNames {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}

export class MonthModel {
    constructor(private dateInfo: Date) {}

    month = this.dateInfo.getMonth()
    year = this.dateInfo.getFullYear()


    changeMonth(year: number, month: number) {
        this.dateInfo = new Date(year, month)
        this.month = this.dateInfo.getMonth()
        this.year = this.dateInfo.getFullYear()
    }

    generateCalendar() {
        let calendar: DayModel[] = []
        let firstWeekday = new Date(this.year, this.month, 1).getDay()
        let lastDateOfMonth: number = new Date(this.year, this.month + 1, 0).getDate()
        let date: number = 1
        let prevMonthPaddingDays: number = -firstWeekday
        let nextMonthPaddingDays: number = 1
        
        while (prevMonthPaddingDays < 0) {
            calendar.push(new DayModel(
                new Date(this.year, this.month, prevMonthPaddingDays),
                'adjacent-month'))
            prevMonthPaddingDays++
        }
        while (date <= lastDateOfMonth) {
            calendar.push(new DayModel(
                new Date(this.year, this.month, date),
                (date === new Date().getDate()) ? 'today' : 'this-month'))
            date++
        }
        while (calendar.length % 7 !== 0) {
            calendar.push(
                new DayModel(new Date(this.year, this.month + 1, nextMonthPaddingDays),
                'adjacent-month'))
            nextMonthPaddingDays++
        }

        return calendar
    }

    generateMonthInfo() {
        return `${MonthNames[this.month]}, ${this.year}`
    }
}