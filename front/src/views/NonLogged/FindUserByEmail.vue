<template>
    <v-container>
        <v-row>
            <v-col>
                <v-alert v-if="showMessageAlert" v-text="message" type="warning"></v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form v-model="form" @submit.prevent="onsubmit">
                    <v-row>
                        <v-col>
                            <h1>Type your e-mail</h1>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <p>We will send an e-mail with the code to restore your password</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="2">
                            <v-text-field
                                variant="outlined"
                                placeholder="User@gmail.com"
                                clearable
                                label="Login"
                                v-model="email"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn 
                                :loading="loading"
                                block
                                color="success"
                                size="large"
                                type="submit"
                                variant="elevated"  
                            >Sign in
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import router from '@/router';
import userService from '@/services/Userservice';
import UserFindByEmail from '@/models/Users/UserFindByEmail';
import UserEmailResetPassword from '@/models/Users/UserEmailResetPassword';

export default {
    data() {
        return{
            form: false,
            email: "",
            loading: false,
            message: "",
            showMessageAlert: false,
            emailRules: [
                isValid => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(isValid) || 'E-mail must be valid'
            ]
        }
    },
    methods:{
        onsubmit(){
            if (!this.form) 
                return;
            this.loading = true;

            let user = new UserFindByEmail();
            user.email = this.email;

            let request = userService.userExists(user);
            
            request.then((result) => {
                if(result.statusCode == 0){
                    //Se o usuário existe, manda código de reset
                    setTimeout(() => (this.loading = false), 2000);
                    userService.userEmail = user.email;
                    userService.sendEmailRestPassword(user).then((resultEmail) =>{
                        if(result.statusCode == 0){
                            //Se e-mail com reset code funcionou, directiona para forgot password
                            // salva e-mail para a proxima tela.
                            setTimeout(() => router.push("/forgotpassword") , 2000);
                        }
                    }
                    );
                }
                else{
                    this.loading = false;
                    this.message = result.message ?? result;
                    this.showMessageAlert = true;
                }
            })
        }
    }
}
</script>