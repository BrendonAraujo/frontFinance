<template>
    <v-container>
        <v-row>
            <v-col>
                <v-alert v-if="showMessageAlert" v-text="message" type="warning"></v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form v-model="form"  @submit.prevent="onsubmit">
                    <h1 class="text-center">Welcome to Finance Mananger</h1>
                    <p class="text-center"> Fill out the form below to register</p>
                    <v-container>
                        <v-text-field 
                            variant="outlined"
                            placeholder="John"
                            clearable
                            label="Nome"
                            v-model="name"
                            :rules="nameRules"
                            required
                        ></v-text-field>
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
                            clearable
                            label="Senha"
                            v-model="password"
                            :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            required
                        ></v-text-field>
                        <v-text-field
                            variant="outlined"
                            clearable
                            label="Confirmação de senha"
                            v-model="confirmPassword"
                            :rules="passwordConfirmRules"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showConfirmPassword = !showConfirmPassword"
                            required
                        ></v-text-field>
                        <v-btn 
                            :disabled="!form"
                            :loading="loading"
                            block
                            color="success"
                            size="large"
                            type="submit"
                            variant="elevated"  
                        >Cadastrar
                        </v-btn>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import userService from '@/services/Userservice';
import UserSingup from '@/models/Users/UserSingUp'
import router from '@/router';

//#region Regex validator
const regexNumber = /[0-9]/;
const regexText = /[a-zA-Z]/;
const regexSpecialCharacters = /[<>{}\"/|;:.,~!?@#$%^=&*\\]/;
//#endregion

export default {
    data() {
        return{
            form: false,
            showPassword: false,
            showConfirmPassword: false,
            loading: false,
            name: "",
            email: "",
            password: "",
            confirmPassword:"",
            message: "",
            showMessageAlert : false,
            nameRules:[
                validLenght => (validLenght?.length > 2) || 'O nom deve container mais que dois caracteres',
            ],
            emailRules: [
                isValid => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(isValid) || 'E-mail precisa ser valido'
            ],
            passwordRules: [
                (validlength => (validlength?.length > 5) || 'A senha precisa ter mais de 5 caracteres'),
                (containsNumber => regexNumber.test(containsNumber) || 'A senha precisa ter pelo menos um número'),
                (constainsText => regexText.test(constainsText) || 'A senha precisa ter pelo menos uma letra'),
                (containsSpecialCaracter => regexSpecialCharacters.test(containsSpecialCaracter) || 'A senha precisa ter pelo menos um caracter especial')
            ],
            passwordConfirmRules: [
                isValid => isValid == this.password || 'O campo confirmação de senha precisa ser igual ao campo senha'
            ]
        }
    },
    methods: {
        onsubmit(){
            if (!this.form) 
                return;
            this.loading
             = true;

            let user = new UserSingup();
            
            user.name = this.name;
            user.email = this.email;
            user.password = this.password;
            user.confirmPassword = this.password;

            let request = userService.singUp(user);

            request.then((result) => {
                if(result.statusCode == 0){
                    setTimeout(() => (this.loading = false), 2000);
                    setTimeout(() => router.push("/login") , 2000);
                }else{
                    this.loading = false;
                    this.message = result.message ?? result;
                    this.showMessageAlert = true;
                }
            })
        }
    }
}
</script>
