<template>
  <v-app-bar
    dark
    prominent
    v-show="showBar"
  >
    <v-app-bar-nav-icon @click="load()" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title clas="grey--text">
      <span class="font-weight-light">Finanger</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn 
      flat 
      @click="onExit()"
    >
      <span>Sair</span>
      <v-icon right>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    bottom
    temporary
  >
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-title>{{userLogged.UserData.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  <v-list class="text-center">
    <v-list-item v-for="(screen, name) in screenList" :key="name"  >
      <v-btn @click="goTo(screen.path)" variant="plain" block density="comfortable">
        {{ screen.name }}
      </v-btn>
    </v-list-item>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
import userService from '@/services/Userservice';
import router from '@/router';
import { store, useStore } from '@/store'
import { mapState } from 'vuex';

export default{
  components: {
    
  },
  data(){
    return{
      drawer: store.state.user.token != '',
      userName: "",
      screenList:[
        { name:"Editar usuário", path: "/edituser"}
      ]
    }
  },
  created: function(){

  },
  methods:{
    onExit(){
      // userService.user = null;
      userService.logOug();
      router.push("/");
    },
    load(){
      this.userName = userService.user.UserData.name;
    },
    goTo(path){
      router.push(path)
    }
  },
  computed: mapState ({
    userLogged: state => state.user,
    showBar: state => state.isLogged != ''
  }),
}
</script>
