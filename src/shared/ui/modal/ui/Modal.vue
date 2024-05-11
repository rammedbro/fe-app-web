<script setup lang="ts">

const opened = defineModel({
  type: Boolean,
  default: false,
});
const closed = computed(() => !opened.value);

function open() {
  opened.value = true;
}

function close() {
  opened.value = false;
}
</script>

<template>
  <button v-if="closed" @click="open">Open modal</button>

  <Teleport to="body">
    <Transition
      :enter-active-class="$style.transitionEnter"
      :leave-active-class="$style.transitionLeave"
    >
      <div
        v-if="opened"
        :class="$style.layout"
        @click="close"
      >
        <div
          v-focus
          tabindex="0"
          :class="$style.modal"
          @click.stop
          @keyup.esc="close"
        >
          <div :class="$style.title">
            <slot name="title">Modal title</slot>
          </div>

          <div :class="$style.content">
            <slot name="default">Modal content!</slot>
          </div>

          <button
            :class="$style.close"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  background: rgba(0, 0, 0, .3);
}

.modal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  overflow: scroll;
  padding: 20px;
  border-radius: 4px;
  background: white;
  color: black;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.content {
  margin-bottom: 20px;
}

.close {
  width: 100%;
  margin-top: auto;
}

.transitionEnter {
  animation: bounce-in 0.5s;
}

.transitionLeave {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
