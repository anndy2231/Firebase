<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Index Page
    </p>
    <div class="q-pa-lg" v-if="isUserAuth">
      <div>{{ getFireUser.email }}님이 로그인하셨습니다.{{ isUserAuth }}</div>

      <div class="q-pa-lg">
        <q-btn color="purple" label="로그아웃" @click="logout"></q-btn>
      </div>
    </div>
    <div class="q-pa-lg" v-if="!isUserAuth">
      <div style="font-size: 20px">로그아웃 완료</div>
      <div>{{ isUserAuth }}</div>
    </div>

    <router-link to="/" style="text-decoration: none">
      <a style="font-size: 20px">로그인 화면으로</a>
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { auth } from "src/boot/firebase";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";

export default defineComponent({
  name: "Index",
  data() {
    return {
      count: null,
    };
  },
  computed: {
    ...mapGetters(["getFireUser", "isUserAuth"]),
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.signOutAction;
      this.$router.go("index");
      // this.$router.push("/");
    },
    ...mapActions(["signOutAction", "authAction"]),
  },
  // created() {
  //   this.authAction();
  // },
});
</script>

<style></style>
