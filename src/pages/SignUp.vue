<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Sign Up
    </p>
    <p style="font-size: 15px; color: darkslateblue">회원가입</p>

    <div class="q-pa-lg">
      <div class="q-gutter-lg">
        <q-input
          v-model="email"
          color="purple"
          filled
          type="email"
          label="E-mail"
          hint="이메일을 입력해주세요"
          ><template v-slot:prepend> <q-icon name="mail"></q-icon> </template>
          <template v-slot:append>
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
          hint="비밀번호는 최대 10 자리까지 가능합니다"
          :rules="[
            (val) =>
              val.length <= 10 || '비밀번호는 최대 10 자리까지 가능합니다',
          ]"
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

        <q-input
          v-model="passwordConfirm"
          color="purple"
          filled
          :type="isPwd2 ? 'password' : 'text'"
          label="Confirm Password"
          hint="비밀번호를 한번 더 입력해주세요"
          :rules="[
            (val) =>
              val.length <= 10 || '비밀번호는 최대 10 자리까지 가능합니다',
          ]"
        >
          <template v-slot:prepend
            ><q-icon name="font_download"></q-icon
          ></template>
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            ></q-icon>
          </template>
        </q-input>

        <q-input
          v-model="userName"
          color="purple"
          filled
          label="Name"
          hint="이름을 입력해주세요"
          ><template v-slot:prepend>
            <q-icon name="favorite"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="userName = ''"
              class="cursor-pointer"
            ></q-icon> </template
        ></q-input>

        <q-select
          filled
          v-model="gender"
          :options="genderOptions"
          label="Gender"
          hint="성별을 선택해주세요"
          ><template v-slot:prepend>
            <q-icon name="record_voice_over"></q-icon> </template
        ></q-select>

        <q-input
          filled
          color="purple"
          v-model="phone"
          label="Phone Number"
          mask="### - #### - ####"
          hint="핸드폰 번호를 입력해주세요"
          ><template v-slot:prepend><q-icon name="style"></q-icon></template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="phone = ''"
              class="cursor-pointer"
            ></q-icon> </template
        ></q-input>
        <q-input
          color="purple"
          v-model="date"
          filled
          type="date"
          hint="오른쪽에 있는 버튼을 클릭해주세요"
          ><template v-slot:prepend
            ><div
              style="font-size: 11px; font-weight: bolder; text-align: center"
            >
              Date
              <br />
              of
              <br />
              Birth
            </div></template
          ></q-input
        >
      </div>
    </div>

    <q-btn color="purple" label="회원가입" @click="validation"></q-btn>
    <router-link to="/" style="text-decoration: none">
      <p style="padding: 30px">로그인 화면으로</p></router-link
    >
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { auth, db } from "src/boot/firebase";

export default defineComponent({
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      userName: "",
      gender: "",
      genderOptions: ["남성", "여성"],
      phone: "",
      date: "",
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {
    validation() {
      if (!this.email || !this.password || !this.passwordConfirm) {
        this.$q.notify({
          position: "top",
          message: "이메일, 비밀번호는 필수 입력사항입니다",
          color: "red",
          type: "negative",
        });
      } else if (
        this.password.length > 10 ||
        this.password.length < 6 ||
        this.passwordConfirm.length > 10 ||
        this.passwordConfirm.length < 6
      ) {
        this.$q.notify({
          position: "top",
          message: "비밀번호는 최소 6자리 ~ 최대 10자리까지만 가능합니다",
          color: "red",
          type: "negative",
        });
      } else if (this.password != this.passwordConfirm) {
        this.$q.notify({
          position: "top",
          message: "비밀번호가 일치하지 않습니다",
          color: "red",
          type: "negative",
        });
      } else {
        db.collection("users")
          .add({
            id: this.email,
            name: this.userName,
            gender: this.gender,
            phone: this.phone,
            birthdate: this.date,
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.$q.notify({
              message: "Register Success",
              color: "blue",
            });
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.$q.notify({
              message: error,
              color: "red",
            });
          });
        this.signup();
      }
    },
    signup() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user.email);

          this.$q.notify({
            position: "top",
            message: "SignUp Success",
            color: "blue",
            type: "positive",
          });
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          this.$q.notify({
            position: "top",
            message: errorMessage,
            color: "red",
            type: "negative",
          });
        });
    },
  },
});
</script>

<style></style>
