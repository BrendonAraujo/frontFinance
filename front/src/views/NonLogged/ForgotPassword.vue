<template>
    <v-container class="mx-auto" align-center>
        <v-row>
            <v-col>
                <v-alert v-if="showMessageAlert" v-text="message" type="warning"></v-alert>
            </v-col>
        </v-row>
        <v-container>
            <h1>Reset password</h1>
            <p>Type the number we sent to your e-mail</p>
        </v-container>
        <v-form v-model="form" @submit.prevent="onsubmit">
            <v-container>
                <v-row>
                    <v-col xs="2">
                        <v-text-field
                            md="1"
                            v-model.number="firstNumber"
                            type="number"
                            shaped
                            filled
                        />    
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model.number="secondNumber"
                            type="number"
                            filled
                        />    
                    </v-col>    
                    <v-col>
                        <v-text-field
                            v-model.number="thridNumber"
                            type="number"
                            filled
                        />    
                    </v-col>     
                    <v-col>
                        <v-text-field
                            v-model.number="fourthNumber"
                            type="number"
                            filled
                        />    
                    </v-col>                     
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn 
                    :disabled="!form"
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
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
import userService from '@/services/Userservice';
import UserValidateResetCode from '@/models/Users/UserValidateResetCode';
import router from '@/router';

export default {
    data(){
        return{
            form : false,
            loading: false,
            message: "",
            showMessageAlert: false,
            firstNumber: 0,
            secondNumber: 0,
            thridNumber: 0,
            fourthNumber: 0
        }
    },
    methods:{
        onsubmit(){
            let resetCode;
            resetCode = this.firstNumber.toString() + this.secondNumber.toString() + this.thridNumber.toString() + this.fourthNumber.toString();

            let user = new UserValidateResetCode();
            user.email = userService.userEmail;
            user.code = resetCode;
            let request = userService.validateResetPasswordCode(user);
            userService.Resetcode = resetCode;

            request.then((result) => {
                if(result.statusCode == 0){
                    if(result.data){
                        setTimeout(() => (this.loading = false), 2000);
                        setTimeout(() => router.push("/resetpassword") , 2000);
                    }else{
                        this.loading = false;
                        this.message = result.message ?? result;
                        this.showMessageAlert = true;
                        setTimeout(() => router.push("/login") , 5000);
                    }
                }
            })
        }
    }
}

</script>