<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Welcome
    </p>
    <p style="font-size: 15px; color: darkslateblue">환영합니다</p>

    <div class="q-pa-lg">
      <div class="q-gutter-lg">
        <q-input
          v-model="email"
          color="purple"
          filled
          label="E-mail"
          hint="이메일을 입력해주세요"
          ><template v-slot:prepend><q-icon name="mail"></q-icon></template
          ><template v-slot:append>
            <q-icon
              name="close"
              @click="email = ''"
              class="cursor-pointer"
            ></q-icon> </template
        ></q-input>
        <q-input
          v-model="password"
          color="purple"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          hint="비밀번호를 입력해주세요"
          ><template v-slot:prepend
            ><q-icon name="font_download"></q-icon
          ></template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <q-checkbox v-model="remember" label="ID 기억하기" color="teal" />
    <div class="q-pa-sm">
      <q-btn
        color="purple"
        style="width: 200px"
        label="로그인"
        @click="login"
      ></q-btn>
    </div>
    <div class="q-pa-sm">
      <q-btn padding="none">
        <img
          src="../assets/google.png"
          style="width: 200px"
          @click="googleLogin"
        />
      </q-btn>
    </div>
    <div class="q-pa-sm">
      <q-btn padding="none">
        <img
          src="../assets/github.png"
          style="width: 200px"
          @click="githubLogin"
        />
      </q-btn>
    </div>
    <div class="q-pa-sm">
      <router-link to="/signup" style="text-decoration: none">
        <a>아직 회원가입을 안 하셨다구요? <br />여기를 클릭해주세요!</a>
      </router-link>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { auth, g_auth, db } from "src/boot/firebase";

export default defineComponent({
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      remember: false,
    };
  },
  methods: {
    googleLogin() {
      var provider = new g_auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          this.$store.commit("setFireUser", user);
          db.collection("users")
            .where("id", "==", user.email)
            .get()
            .then((snapshot) => {
              if (snapshot.empty == true) {
                db.collection("users").add({
                  id: user.email,
                  name: user.displayName,
                });
                this.$q.notify({
                  position: "top",
                  message: "Login Success",
                  color: "blue",
                  type: "positive",
                });
                this.$router.push({ path: "index" });
              } else {
                console.log(snapshot);
                snapshot.forEach((doc) => {
                  db.collection("users").doc(doc.id).set({
                    id: user.email,
                    name: user.displayName,
                  });
                });
                this.$q.notify({
                  position: "top",
                  message: "Login Success",
                  color: "blue",
                  type: "positive",
                });
                this.$router.push({ path: "index" });
              }
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.$q.notify({
            position: "top",
            message: errorMessage,
            color: "red",
            type: "negative",
          });
        });
    },
    githubLogin() {
      var provider = new g_auth.GithubAuthProvider();
      auth
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          this.$store.commit("setFireUser", user);
          db.collection("users")
            .where("id", "==", user.email)
            .get()
            .then((snapshot) => {
              if (snapshot.empty == true) {
                db.collection("users").add({
                  id: user.email,
                  name: user.displayName,
                });
                this.$q.notify({
                  position: "top",
                  message: "Login Success",
                  color: "blue",
                  type: "positive",
                });
                this.$router.push({ path: "index" });
              } else {
                console.log("github >>", snapshot);
                snapshot.forEach((doc) => {
                  db.collection("users").doc(doc.id).set({
                    id: user.email,
                    name: user.displayName,
                  });
                  this.$q.notify({
                    position: "top",
                    message: "Login Success",
                    color: "blue",
                    type: "positive",
                  });
                  this.$router.push({ path: "index" });
                });
              }
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.$q.notify({
            position: "top",
            message: errorMessage,
            color: "red",
            type: "negative",
          });
        });
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user.email);
          this.$store.commit("setFireUser", user);

          if (this.remember == true) {
            localStorage.username = this.email;
            localStorage.checkbox = this.remember;
          } else {
            localStorage.username = "";
            localStorage.checkbox = "";
          }

          this.$q.notify({
            position: "top",
            message: "Login Success",
            color: "blue",
            type: "positive",
          });
          this.$router.push({ path: "index" });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.$q.notify({
            position: "top",
            message: errorMessage,
            color: "red",
            type: "negative",
          });
        });
    },
  },
  mounted() {
    if (localStorage.checkbox && localStorage.checkbox !== "") {
      this.remember = true;
      this.email = localStorage.username;
    } else {
      this.remember = false;
    }
  },
});
</script>

<style></style>
