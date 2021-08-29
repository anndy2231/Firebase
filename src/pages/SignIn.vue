<template>
  <q-page class="text-center q-pa-xl">
    <p class="text-bold" style="font-size: 60px; color: darkslateblue">
      Welcome!
    </p>

    <div class="q-pa-lg">
      <div class="q-gutter-lg">
        <q-input
          v-model="userId"
          color="purple"
          filled
          label="ID"
          hint="아이디를 입력해주세요"
          ><template v-slot:prepend>
            <q-icon name="format_size"></q-icon> </template
          ><template v-slot:append>
            <q-icon
              name="close"
              @click="userId = ''"
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
    <div class="q-pa-lg">
      <q-btn color="purple" label="로그인" @click="login"></q-btn>
    </div>
    <router-link to="/signup" style="text-decoration: none">
      <a>아직 회원가입을 안 하셨다구요? <br />여기를 클릭해주세요!</a>
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
      isPwd: true,
    };
  },
  methods: {
    login() {
      alert(this.userId);
    },
  },
});
</script>

<style></style>
