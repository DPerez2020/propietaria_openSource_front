<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          permanent
          width="150"
          color="blue-grey-darken-4"
        >
        <v-list
          density="compact"
          nav
        >
          <v-list-item title="Home" value="home" to="/"></v-list-item>
          <v-list-item title="Departamentos" value="departamentos" to="/departamentos"></v-list-item>
          <v-list-item title="Empleados" value="empleados" to="/empleados"></v-list-item>
          <v-list-item title="Tipo de activos" value="tipo activos" to="tipos-activos"></v-list-item>
          <v-list-item title="Activos fijos" value="empleados" to="/activos-fijos"></v-list-item>
          <v-list-item title="Enviar a contabilidad" value="enviarContabilidad" to="/enviar-contabilidad"></v-list-item>
        </v-list>
        <template v-slot:append>
        <div class="pa-2">
          <v-btn variant="plain" @click="logout()">Cerrar sesión</v-btn>          
        </div>
      </template>
      </v-navigation-drawer>
  
        <v-app-bar
          color="blue-grey-darken-4"
          height="48"
          flat
        >
        <v-app-bar-title>Final propietaria / open source</v-app-bar-title>      
      </v-app-bar>       
  
        <v-main>
          <v-container
            class="d-flex justify-center align-center text-h5"
          >
            <v-content>
                <router-view/>
            </v-content>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script>

  export default {
    name: 'PrincipalLayout',
    data () {
      return {
        drawer: true,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        title: 'Principal Layout'
      }
    },
    methods: {
      changeRoute (route) {
        this.$router.push(route)
      },
      logout () {
        //this.$store.dispatch('logout'),
        this.$store.commit('SET_LAYOUT', 'LoginLayout')
        this.$router.push('/login')
      }      
    },
  }
  </script>