<template>
  <div :class="{
      'input-group': true,
      'input-group_icon': hasSlot,
      'input-group_icon-left': leftIconSlot,
      'input-group_icon-right': rightIconSlot
    }"
  >
    <div v-if="leftIconSlot" :class="{
        'input-group__icon': true,
        'input-group_icon': leftIconSlot,
        'input-group_icon-left': leftIconSlot
      }"
    >
      <slot name="left-icon"/>
    </div>

    <component
      :is="tag"
      :class="{'form-control': true, 'form-control_rounded': rounded, 'form-control_sm': small}"
      :value="modelValue"
      v-bind="$attrs"
      ref="input"
      @change="onChange"
      @input="onInput"
    ></component>

    <div v-if="rightIconSlot" :class="{
        'input-group__icon': true,
        'input-group_icon': rightIconSlot,
        'input-group_icon-right': rightIconSlot
      }"
    >
      <slot name="right-icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
    modelValue: String,
    modelModifiers: {
      default: () => ({}),
    },
  },
  data() {
    return {
      hasSlot: false,
      leftIconSlot: false,
      rightIconSlot: false,
    };
  },
  computed: {
    tag() {
      return this.multiline ? 'textarea' : 'input';
    },
  },
  created() {
    this.updateIconSlots();
  },
  updated() {
    this.updateIconSlots();
  },
  methods: {
    onChange(event) {
      if (this.modelModifiers.lazy) this.$emit('update:modelValue', event.target.value);
    },
    onInput(event) {
      if (!this.modelModifiers.lazy) this.$emit('update:modelValue', event.target.value);
    },
    updateIconSlots() {
      this.hasSlot = Boolean(this.$slots['left-icon']) || Boolean(this.$slots['right-icon']);
      this.leftIconSlot = Boolean(this.$slots['left-icon']);
      this.rightIconSlot = Boolean(this.$slots['right-icon']);
    },
    focus() {
      this.$refs.input.focus();
    }
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
