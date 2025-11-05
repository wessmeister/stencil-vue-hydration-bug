<script setup lang="ts">
import { ref } from 'vue';
import { MyText } from 'demo-components-vue';

const visible = ref(true);
</script>

<template>
  <div>
    <h1>Vue + Stencil Hydration Bug Reproduction</h1>
    <p>Click the button to toggle the text visibility. Watch the classList in DevTools.</p>

    <button @click="visible = !visible">Toggle Text</button>

    <MyText class="text" :class="{ 'text--visible': visible }">
      Hello from Stencil component!
    </MyText>

    <div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
      <h3>Expected Behavior:</h3>
      <p>The <code>hydrated</code> class should remain on the my-text element after toggling.</p>

      <h3>Actual Behavior with 0.11.8:</h3>
      <p>The <code>hydrated</code> class is <strong>removed</strong> on first toggle and never returns.</p>

      <h3>Actual Behavior with 0.10.7:</h3>
      <p>The <code>hydrated</code> class is <strong>preserved</strong> through all toggles.</p>
    </div>
  </div>
</template>

<style scoped>
.text {
  display: none;
  padding: 10px;
  margin: 10px 0;
  background: #e0f7fa;
  border: 2px solid #00796b;
}

.text--visible {
  display: block;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
}
</style>
