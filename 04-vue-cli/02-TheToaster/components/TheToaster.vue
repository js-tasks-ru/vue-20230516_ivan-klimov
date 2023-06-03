<template>
  <div class="toasts">
    <UiToast
      v-for="(toast, index) in toasts"
      :key="index"
      :id="toast.id"
      :message="toast.message"
      :type="toast.type"
      :time-to-remove-ms="toast.timeToRemoveMs"
      @tostInit="getTostData"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: {
    UiToast,
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.toasts.push({
        id: Math.random(),
        message,
        type: 'success',
        timeToRemoveMs: 5000,
      });
    },
    error(message) {
      this.toasts.push({
        id: Math.random(),
        message,
        type: 'error',
        timeToRemoveMs: 5000,
      });
    },
    getTostData(toastData) {
      this.removeTost(toastData);
    },
    removeTost(toastData) {
      new Promise((resolve) => {
        setTimeout(() => {
          this.toasts.forEach((item, index) => {
            if (item.id === toastData.id) {
              this.toasts.splice(index, 1);
              resolve('Done');
            }
          });
        }, toastData.ms);
      });
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
