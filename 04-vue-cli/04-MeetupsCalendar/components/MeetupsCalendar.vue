<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ calendarDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="nextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="(item, index) in calendar"
        :key="index"
        :class="['calendar-view__cell', item.inactiveClass]"
        :tabindex="index"
      >
        <div class="calendar-view__cell-day">{{ item.day }}</div>
        <div v-if="!!item.content" class="calendar-view__cell-content">
          <a
            v-for="(contentItem, index) in item.content"
            :key="index"
            :href="`/meetups/${index}`"
            class="calendar-event"
          >
            {{ contentItem }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarDayData from './calendarDayData.js';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    calendarDate() {
      return this.date.toLocaleDateString(navigator.language, {month: 'long', year: 'numeric'});
    },
    calendar() {
      return this.createCalendar();
    },
  },

  methods: {
    nextMonth() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    previousMonth() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
    },
    getDayOfTheWeek(day) {
      return new Date(this.date.getFullYear(), this.date.getMonth(), day).getDay();
    },
    getNumberOfDaysInMonth(monthType) {
      switch(monthType) {
        case 'preview':
          return 32 - new Date(this.date.getFullYear(), this.date.getMonth() - 1, 32).getDate();
        default:
          return 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate();
      }
    },
    createCalendar() {
      let calendar = [];
      const dayOfTheWeek = 7;
      const inactiveClass = 'calendar-view__cell_inactive';
      const curentMonthDays = this.getNumberOfDaysInMonth();
      let firstDayOfTheWeek = this.getDayOfTheWeek(1);
      const lastDayOfTheWeek = this.getDayOfTheWeek(curentMonthDays);
      let previewMonthDays = this.getNumberOfDaysInMonth('preview');

      //Массив дней текущего месяца
      for (let i = 1; i <= curentMonthDays; i++) {
        calendar.push(new CalendarDayData(i));
      }

      //Добавляем митапы в нужный день календаря
      this.meetups.forEach((item) => {
        const meetupDate = new Date(item.date);

        if (meetupDate.getFullYear() === this.date.getFullYear() && meetupDate.getMonth() === this.date.getMonth()) {
          let calendarItem = calendar.find(item => item.day === meetupDate.getDate());

          calendarItem.content.push(item.title);
        }
      });

      //Предзаполняем неделю днями прошедшего месяца если это необходимо
      if (firstDayOfTheWeek === 0) firstDayOfTheWeek = 7;

      for (let i = 0; i < firstDayOfTheWeek - 1; i++) {
        calendar.splice(0, 0, new CalendarDayData(previewMonthDays - i, [], inactiveClass));
      }

      //Дозаполняем неделю днями следующего месяца если это необходимо
      for (let i = lastDayOfTheWeek; i < dayOfTheWeek; i++) {
        if (lastDayOfTheWeek === 0) break;

        calendar.splice(calendar.length, 0, new CalendarDayData(i - lastDayOfTheWeek + 1, [], inactiveClass));
      }

      return calendar;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
