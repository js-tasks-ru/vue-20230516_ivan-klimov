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
      fetchState: {
        load: true,
        succes: false,
        error: false,
      },
    };
  },

  watch: {
    meetupId: {
      immediate: true,

      handler() {
        this.fetchState.succes = false;
        this.fetchState.load = true;
        this.fetchState.error = false;
        this.meetup = 'Загрузка...';

        fetchMeetupById(this.meetupId).then(
          (result) => {
            this.fetchState.load = false;
            this.fetchState.succes = true;
            this.meetup = result;
          },
          (error) => {
            this.fetchState.load = false;
            this.fetchState.succes = false;
            this.fetchState.error = true;
            this.meetup = error.message;
          }
        );
      }
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="fetchState.succes" :meetup="meetup"/>

      <UiContainer v-if="fetchState.load">
        <UiAlert>{{ meetup }}</UiAlert>
      </UiContainer>

      <UiContainer v-if="fetchState.error">
        <UiAlert>{{ meetup }}</UiAlert>
      </UiContainer>
    </div>`,
});
