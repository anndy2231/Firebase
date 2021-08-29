<template>
  <q-page class="text-center q-pa-xl">
    <p
      class="text-weight-medium"
      style="font-size: 100px; color: darkslateblue"
    >
      Sign Up
    </p>

    <div class="q-pa-xl">
      <div class="q-gutter-lg">
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

        <q-input
          v-model="userId"
          color="purple"
          filled
          label="ID"
          hint="아이디를 입력해주세요"
          ><template v-slot:prepend>
            <q-icon name="format_size"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="userId = ''"
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
          v-model="password"
          color="purple"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          hint="비밀번호는 최대 15 자리까지 가능합니다"
          :rules="[
            (val) =>
              val.length <= 15 || '비밀번호는 최대 15 자리까지 가능합니다',
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
          hint="비밀번호 입력 후 '삼각형' 버튼을 클릭해주세요"
          :rules="[
            (val) =>
              val.length <= 15 || '비밀번호는 최대 15 자리까지 가능합니다',
          ]"
        >
          <template v-slot:prepend
            ><q-icon
              color="red"
              class="cursor-pointer"
              name="warning"
              @click="isMatched"
            ></q-icon
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
          v-model="email"
          color="purple"
          filled
          type="email"
          label="E-mail address"
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
          hint="오른쪽 '달력' 버튼을 클릭해주세요"
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

    <q-btn color="purple" label="회원가입" @click="register"></q-btn>
    <router-link to="/" style="text-decoration: none">
      <p style="padding: 30px">로그인 화면으로</p></router-link
    >
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      userId: "",
      userName: "",
      gender: "",
      genderOptions: ["남성", "여성"],
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      date: "",
      isPwd: true,
      isPwd2: true,
    };
  },
  methods: {
    register() {
      alert(this.userId);
    },
    isMatched() {
      if (this.password != this.passwordConfirm) {
        alert("비밀번호를 다시 확인해주세요");
      } else if (this.password == "" || this.passwordConfirm == "") {
        alert("비밀번호를 입력해주세요");
      } else {
        alert("비밀번호가 일치합니다");
      }
    },
  },
});
</script>

<style></style>
