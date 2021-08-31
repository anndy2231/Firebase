<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Index Page
    </p>

    <router-link to="/" style="text-decoration: none">
      <a>로그인 화면으로</a>
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Index",
  data() {
    return {};
  },
  methods: {},
});
</script>

<style></style>
