<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          permanent
          width="150"
          color="grey darken-1"
        >
        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
        <v-app-bar
          color="primary"
          height="48"
          flat
        ></v-app-bar>       
  
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
  }
  </script>