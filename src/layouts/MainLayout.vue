<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: darkslateblue">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>KND</q-toolbar-title>
        <q-toolbar-title style="padding-right: 150px">
          {{ currentMonth }}월 {{ currentDate }}일 {{ currentHours }}:{{
            currentMinutes
          }}:{{ currentSeconds }}
          <q-spinner-hourglass color="white"></q-spinner-hourglass
        ></q-toolbar-title>

        <div>KND</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "포트폴리오",
    caption: "https://portfolio-knduck.netlify.app/#/",
    icon: "school",
    link: "https://portfolio-knduck.netlify.app/#/",
  },
  {
    title: "깃허브",
    caption: "github.com/anndy2231",
    icon: "code",
    link: "https://github.com/anndy2231",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    var currentMonth = ref();
    var currentDate = ref();
    var currentHours = ref();
    var currentMinutes = ref();
    var currentSeconds = ref();
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      currentMonth,
      currentDate,
      currentHours,
      currentMinutes,
      currentSeconds,
      getTime() {
        setInterval(() => {
          var today = new Date();
          currentMonth.value = ref(today.getMonth() + 1);
          currentDate.value = ref(today.getDate());
          currentHours.value = ref(today.getHours());
          currentMinutes.value = ref(today.getMinutes());
          currentSeconds.value = ref(today.getSeconds());
        }, 1000);
      },
    };
  },
  mounted() {
    this.getTime();
  },
});
</script>
