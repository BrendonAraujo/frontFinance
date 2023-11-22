<template>
    <v-container fluid ainer>
        <v-row>
            <v-col>
                <v-alert v-if="showMessageAlert" v-text="message" type="warning"></v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-container class="mx-auto" align-center>
            <v-img
            class="mx-auto" align-center
            :width="300"
            aspect-ratio="16/9"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            />
            <h1 class="text-center">Finance Controler</h1>
            </v-container>
        </v-row>
        <v-row>
            <v-col>
                <v-form v-model="form" @submit.prevent="onsubmit">
                    <v-container>
                        <v-text-field
                            variant="outlined"
                            placeholder="User@gmail.com"
                            clearable
                            label="E-mail"
                            v-model="email"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                        <v-text-field
                            variant="outlined"
                            label="Senha"
                            clearable
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            v-model="password"
                            :rules="passwordRules"
                            @click:append="showPassword = !showPassword"
                            required
                        ></v-text-field>
                        <v-btn 
                            :loading="loading"
                            block
                            color="success"
                            size="large"
                            type="submit"
                            variant="elevated"  
                        >Entrar
                        </v-btn>
                        <a 
                            href="/finduseremail"
                        >
                            Esqueceu a senha?
                        </a>
                        <v-divider :thickness="50" class="border-opacity-0"></v-divider>
                        <v-btn
                            @click="singUp"
                            block
                            color="red"
                            size="large"
                            variant="elevated"  
                        >Criar Conta
                        </v-btn>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router';
import UserSigin from '@/models/Users/UserSignIn';
import userService from '@/services/Userservice';
import User from '@/models/Users/User';
import { store, useStore } from '@/store'

export default {
    data() {
        return{
            email: "",
            password: "",
            showPassword: false,
            message: "",
            showMessageAlert: false,
            loading: false,
            form: false,
            passwordRules: [
                hasValue => hasValue.length >= 6 || 'Senha precisa ter mais de 5 caracteres',
            ],
            emailRules: [
                isValid => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(isValid) || 'Email precisa ser válido'
            ]
        }
    },
    methods:{
        onsubmit(){
            if (!this.form) 
                return;
            this.loading = true;

            let user = new UserSigin();
            user.email = this.email;
            user.password = this.password;
            let request = userService.login(user);

            request.then((result) => {
                if(result.statusCode == 0){                   
                    let loggedUser = new User();
                    loggedUser.token = result.data.token;
                    loggedUser.UserData.id = result.data.user.id;
                    loggedUser.UserData.name = result.data.user.name;
                    loggedUser.UserData.type = result.data.user.type;
                    loggedUser.UserData.email = result.data.user.email;

                    userService.user = loggedUser;
                    
                    store.commit("addUser",loggedUser);
                    // store.state.user = loggedUser;

                    setTimeout(() => (this.loading = false), 2000);
                    setTimeout(() => router.push("/home") , 2000);
                }
                else{
                    this.loading = false;
                    this.message = result.message ?? result;
                    this.showMessageAlert = true;
                }
            })
        },
        singUp() {
            router.push("/singup");
        }
    }
}

</script>
