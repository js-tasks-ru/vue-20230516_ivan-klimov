<template>
  <div class="toasts">
    <UiToast
      v-for="(toast, index) in toasts"
      :key="index"
      :message="toast.message"
      :type="toast.type"
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
      const id = Math.random();

      this.toasts.push({
        id,
        message,
        type: 'success',
      });

      this.removeTost(id, this.toasts);
    },
    error(message) {
      const id = Math.random();

      this.toasts.push({
        id,
        message,
        type: 'error',
      });

      this.removeTost(id, this.toasts);
    },
    removeTost(id, toasts) {
      new Promise((resolve) => {
        setTimeout(() => {
          toasts.forEach((item, index) => {
            if (item.id === id) {
              toasts.splice(index, 1);
              resolve('Done');
            }
          });
        }, 5000);
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
