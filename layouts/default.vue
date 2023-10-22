<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app
      class="custom-drawer accent">
      <div class="sidebarCustom">
        <div class="sidebarCustomContainer">
          <img style="width: 55%;" src="LogoScrum.png">
          <v-list>
            <v-list-group class="spaceSide" :value="false" prepend-icon=" mdi-view-dashboard">
              <template v-slot:activator>
                <v-list-item-title >Dashboard
                </v-list-item-title>            
              </template>
              <v-list-item to="/dashboard" class="justify-center">
                  Graficos
                </v-list-item>
            </v-list-group>
            <v-list-group class="spaceSide" :value="true" prepend-icon="mdi-bag-checked">
              <template v-slot:activator>
                <v-list-item-title>Proyectos
                </v-list-item-title>
              </template>
              <v-list-item to="/proyectos" class="justify-center">
                  Ver todos los proyectos
              </v-list-item>
            </v-list-group>
            <v-list-group class="spaceSide" :value="true" prepend-icon="mdi-account-circle">
              <template v-slot:activator>
                <v-list-item-title>Tableros
                </v-list-item-title>
              </template>
              <v-list-item to="/tablero" class="justify-center">
                  Actividades
              </v-list-item>
            </v-list-group>
          </v-list>
          <v-switch v-model="$vuetify.theme.dark" inset persistent-hint
            :class="{ 'expanded-margin': !miniVariant, 'minimized-margin': miniVariant }"
            style="margin-left: 42%; margin-top: 37%;" class="theme-switch"></v-switch>
          <!-- <v-btn icon @click.stop="toggleDrawer"
            :class="{ 'expanded-margin': !miniVariant, 'minimized-margin': miniVariant }" class="menu-button">
            <v-icon>mdi-menu</v-icon>
          </v-btn> -->
          <!-- <div style="margin-top: 25%; margin-left: 18%;" class="theme-switch">
            <v-btn color="accent">
              <span>Cerrar Sesión</span>
              <v-icon style="transform: rotate(-90deg);">mdi-tray-arrow-down</v-icon>
            </v-btn>
          </div> -->
        </div>
      </div>
    </v-navigation-drawer>
    <v-main style="margin-left: 3.5%; padding: 0px 0px 36px 15% !important;">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
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
  width: 350px !important;
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
  background-color: transparent;
  height: 100%;
  padding: 4% 3% 4% 3%;
  ;
  height: 95%;
}

.sidebarCustomContainer {
  background-color: #6e74c0;
  width: 99%;
  height: 100%;
  border-radius: 20px;
  padding: 6%;
}

.spaceSide {
  margin-bottom: 7%;
}
</style>