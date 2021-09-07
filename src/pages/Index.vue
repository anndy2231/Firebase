<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Index Page
    </p>
    <div class="q-pa-lg" v-if="isUserAuth">
      <div>{{ getFireUser.email }} 로그인</div>
      <div style="padding: 10px">{{ userName }}님 반갑습니다!</div>

      <div class="q-pa-lg">
        <q-btn color="purple" label="로그아웃" @click="logout"></q-btn>
      </div>
    </div>
    <div class="q-pa-lg" v-if="!isUserAuth">
      <div style="font-size: 20px">로그아웃 완료</div>
    </div>

    <router-link to="/" style="text-decoration: none">
      <a style="font-size: 20px">로그인 화면으로</a>
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { auth, db } from "src/boot/firebase";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";

export default defineComponent({
  name: "Index",
  data() {
    return {
      userName: "",
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

  mounted() {
    console.log("mounted");
    if (this.getFireUser != null) {
      db.collection("users")
        .where("id", "==", this.getFireUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            this.userName = doc.data().name;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  },
});
</script>

<style></style>
