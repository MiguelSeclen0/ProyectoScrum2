<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app class="custom-drawer">
      <div class="sidebarCustom primary">
        <div class="sidebarCustomContainer">
          <v-avatar class="spaceAvatar">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg">
          </v-avatar>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-group :value="true" prepend-icon="mdi-account-circle">
              <template v-slot:activator>
                <v-list-item-title>Users</v-list-item-title>
              </template>
            </v-list-group>
          </v-list>
          <v-switch v-model="$vuetify.theme.dark" inset label="Vuetify" persistent-hint></v-switch>
          <v-btn icon @click.stop="toggleDrawer"
            :class="{ 'expanded-margin': !miniVariant, 'minimized-margin': miniVariant }">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" style="
        margin-left: 42%;">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="margin-left: 2%">
      <v-container>
        <Nuxt />
        <v-fab-transition>
          <v-btn color=" pink" dark absolute bottom right fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-container>
    </v-main>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <div style="background-color: red; padding: 40px;">
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light> mdi-repeat </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Proyecyos',
          to: '/tablero',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Tablero',
          to: '/inspire',
        },
      ],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '',
    }
  },
  methods: {
    toggleDrawer() {
      this.miniVariant = !this.miniVariant;
    },
  },
}
</script>
<style>
.spaceAvatar {
  margin-left: 7%;
}

.spacetext {
  margin-left: 2%;
}

.custom-drawer {
  width: 300px !important;
  /* Ancho inicial */
  transition: width 0.3s;
  /* Agregar una transición para suavizar el cambio de ancho */
}

.custom-drawer.v-navigation-drawer--mini-variant {
  width: 90px !important;
  /* Ancho cuando esté minimizado */
}

/* Margen izquierdo cuando el cajón está expandido */
.expanded-margin {
  margin-left: 42%;
}

/* Margen izquierdo cuando el cajón está minimizado */
.minimized-margin {
  margin-left: 26%;
}

.sidebarCustom {
  background-color: "primary";
  height: 100%;
  padding: 7% 7% 7% 7%;
  height: 100%;
}

.sidebarCustomContainer {
  background-color: blue;
  width: 99%;
  height: 97%;
  border-radius: 20px;
  padding: 6%;
}
</style>