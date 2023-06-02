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
    };
  },

  watch: {
    meetupId: {
      immediate: true,

      handler() {
        this.meetup = 'Загрузка...';

        fetchMeetupById(this.meetupId).then(
          (result) => {
            this.meetup = result;
          },
          (error) => {
            this.meetup = error.message;
          }
        );
      }
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="typeof meetup === 'object'" :meetup="meetup"/>

      <UiContainer v-else>
        <UiAlert>{{ meetup }}</UiAlert>
      </UiContainer>
    </div>`,
});
