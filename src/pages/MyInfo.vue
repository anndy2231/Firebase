<template>
  <div id="app" align="center">
    <q-card-section class="q-qt-none">
      성명 : {{ name }}
      <p></p>
      아이디 : {{ email }}
      <p></p>
      가입일 : {{ creationTime }}
      <p></p>
      마지막 로그인 날짜 : {{ lastSignInTime }}
      <p></p>
      <div>
        <q-btn
          color="purple"
          label="내정보수정"
          @click="$router.replace('/update')"
        ></q-btn>
      </div>
      <div>
        <q-btn color="purple" label="회원탈퇴" @click="confirm"></q-btn>
      </div>
    </q-card-section>
  </div>
</template>
<script>
import { auth, g_auth, db } from "src/boot/firebase";
export default {
  data() {
    return {
      name: "",
      email: "",
      creationTime: "",
      lastSignInTime: "",
    };
  },
  methods: {
    deleteUserInfo(users) {
      return new Promise(function (resolve, reject) {
        db.collection("users")
          .where("id", "==", users.email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection("users")
                .doc(doc.id)
                .delete()
                .then(() => {
                  console.log("doc deleted");
                  resolve("success");
                })
                .catch((err) => {
                  console.log("delete error ", err);
                  reject(err);
                });
            });
          });
      });
    },
    confirm() {
      const user = auth.currentUser;
      console.log("current user>>>", user);
      //  if(user.providerData[0].providerId == "password"){}
      this.$q
        .dialog({
          title: "정말 회원탈퇴를 하시겠습니까?",
          message: "비밀번호를 입력해주세요",
          prompt: {
            model: "",
            type: "password",
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          var credentials = g_auth.EmailAuthProvider.credential(
            user.email,
            data
          );
          user.reauthenticateWithCredential(credentials).then(() => {
            console.log("reauth ok");
            // users collenction -> delete info
            this.deleteUserInfo(user)
              .then((res) => {
                console.log(res);
                user.delete().then(() => {
                  console.log("firebase auth acccount deleted");
                  this.$q.notify({
                    position: "top",
                    message: "회원탈퇴 완료",
                    color: "blue",
                    type: "positive",
                  });
                  this.$router.push("/");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
    },
    update() {
      // alert("update");
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user>>>", user);
        this.email = user.email;
        this.creationTime = user.metadata.creationTime;
        this.lastSignInTime = user.metadata.lastSignInTime;
        this.name = user.displayName;
      } else {
        console.log("user signed out");
      }
    });
  },
};
</script>
<style></style>
