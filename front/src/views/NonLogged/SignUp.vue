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
                        label="Name"
                        v-model="name"
                        :rules="nameRules"
                        required
                        ></v-text-field>
                        <v-text-field
                        variant="outlined"
                        placeholder="User@gmail.com"
                        clearable
                        label="Email"
                        v-model="email"
                        :rules="emailRules"
                        required
                        ></v-text-field>
                        <v-text-field
                        variant="outlined"
                        clearable
                        label="Password"
                        v-model="password"
                        :rules="passwordRules"
                        required
                        ></v-text-field>
                        <v-text-field
                        variant="outlined"
                        clearable
                        label="Confirm Password"
                        v-model="confirmPassword"
                        :rules="passwordConfirmRules"
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
                        >Sign Up
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
            loading: false,
            name: "",
            email: "",
            password: "",
            confirmPassword:"",
            message: "",
            showMessageAlert : false,
            nameRules:[
                validLenght => (validLenght?.length > 2) || 'Name too short',
            ],
            emailRules: [
                isValid => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(isValid) || 'E-mail must be valid'
            ],
            passwordRules: [
                (validlength => (validlength?.length > 5) || 'The password  has to be more then 5 caracters'),
                (containsNumber => regexNumber.test(containsNumber) || 'The password has to be a number'),
                (constainsText => regexText.test(constainsText) || 'The password has to be a letter'),
                (containsSpecialCaracter => regexSpecialCharacters.test(containsSpecialCaracter) || 'The password has to be a special character')
            ],
            passwordConfirmRules: [
                isValid => isValid == this.password || 'The confirmed password has to be equals to the password'
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
