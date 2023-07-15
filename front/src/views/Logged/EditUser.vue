<template>
    <v-form v-model="form" @submit.prevent="onsubmit">
        <v-container>
            <v-btn @click="goBack()">
                Voltar
            </v-btn>
            <v-row class="text-center">
                <v-col>
                    <v-card>
                        <v-card-title>
                            Altere as informações do usuário
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        clearable 
                                        required
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Nome"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        clearable 
                                        required 
                                        v-model="email"
                                        :rules="emailRules"
                                        label="Email">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn 
                                        :loading="loading"
                                        block
                                        color="success"
                                        size="large"
                                        type="submit"
                                        variant="elevated"
                                    >
                                        Salvar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import userService from '@/services/Userservice';
import router from '@/router';
import UserUpdate from '@/models/Users/UserUpdate'
// if(userService.user.token == "")
//    router.push("/login");
const regexNumber = /[0-9]/;
const regexText = /[a-zA-Z]/;
const regexSpecialCharacters = /[<>{}\"/|;:.,~!?@#$%^=&*\\]/;

export default{
    data(){
        return{
            form: false,
            loading: false,
            name: "",
            nameRules:[
                validLenght => (validLenght?.length > 2) || 'Name too short',
            ],
            email:"",
            emailRules: [
                isValid => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(isValid) || 'E-mail must be valid'
            ],
            password: "",
            passwordRules: [
                (validlength => (validlength?.length > 5) || 'The password  has to be more then 5 caracters'),
                (containsNumber => regexNumber.test(containsNumber) || 'The password has to be a number'),
                (constainsText => regexText.test(constainsText) || 'The password has to be a letter'),
                (containsSpecialCaracter => regexSpecialCharacters.test(containsSpecialCaracter) || 'The password has to be a special character')
            ],
            passwordConfirm:"",
            passwordConfirmRules: [
                isValid => isValid == this.password || 'The confirmed password has to be equals to the password'
            ]
        }
    },
    created: function(){
        this.name = userService.user.UserData.name;
        this.email = userService.user.UserData.email;
    },
    methods:{
        goBack(){
            router.back()
        },
        onsubmit(){
            if (!this.form) 
                return;

            this.loading = true;

            let user = new UserUpdate();
            user.name = this.name;
            user.email = this.email;
            userService.update(user).then((result) => {
                if(result.statusCode == 0){
                    setTimeout(() => (this.loading = false), 2000);
                }else{
                    this.loading = false;
                    alert("Não foi possível atualizar o usuário");
                }

            }
            );
        }
    }
}

</script>