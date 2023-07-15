<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Reset Password</h1>
                <p>Inform the new password</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form v-model="form" @submit.prevent="onsubmit">
                    <v-text-field
                        variant="outlined"
                        clearable
                        label="Password"
                        :rules="passwordRules"
                        v-model="password"
                        required
                    ></v-text-field>
                    <v-text-field
                        variant="outlined"
                        clearable
                        label="Confirm Password"
                        required
                        v-model="confirmPassword"
                        :rules="passwordConfirmRules"
                    ></v-text-field>
                    <v-btn 
                        :loading="loading"
                        block
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"  
                    >Reset
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router';
import userService from '@/services/Userservice';
import UserResetPassword from '@/models/Users/UsertResetPassword';

//#region Regex validator
const regexNumber = /[0-9]/;
const regexText = /[a-zA-Z]/;
const regexSpecialCharacters = /[<>{}\"/|;:.,~!?@#$%^=&*\\]/;
//#endregion
export default {
    data() {
        return{
            loading: false,
            form: false,
            password: "",
            confirmPassword: "",
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
    methods:{
        onsubmit(){
            if (!this.form) 
                return;

            this.loading = true;

            let user = new UserResetPassword();
            user.code = userService.Resetcode;
;
            user.email = userService.userEmail;
            user.password = this.password;
            user.confirmPassword = this.confirmPassword;

            console.log(user);
            userService.resetPassword(user)
                .then((result) =>{
                    if(result.statusCode == 0){
                        if(result.data){
                            alert("Restore password completed");
                            setTimeout(() => (this.loading = false), 2000);
                            setTimeout(() => router.push("/login") , 2000);
                        }
                    }else{
                        alert("Cannot reset password");
                        setTimeout(() => router.push("/login") , 2000);
                    }
                });
        }
    }
}

</script>