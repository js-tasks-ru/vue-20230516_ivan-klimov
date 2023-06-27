import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      fetchMessage: '',
      error: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,

      handler() {
        this.meetup = null;
        this.fetchMessage = 'Загрузка...';

        fetchMeetupById(this.meetupId).then(
          (result) => {
            this.meetup = result;
          },
          (error) => {
            this.fetchMessage = error.message;
            this.error = error;
          }
        );
      }
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->

      <MeetupView v-if="meetup" :meetup="meetup"/>

      <UiContainer v-else>
        <UiAlert>{{ fetchMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
