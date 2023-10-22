<template>
	<v-container>
		<v-row>
			<v-col>
				<!-- <h1>Reset Password</h1> -->
				<h1>Alteração de senha</h1>
				<!-- <p>Inform the new password</p> -->
				<p>Informe a nova senha</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-form v-model="form" @submit.prevent="onsubmit">
					<v-text-field
						variant="outlined"
						clearable
						label="Senha"
						:rules="passwordRules"
						v-model="password"
						required
					></v-text-field>
					<v-text-field
						variant="outlined"
						clearable
						label="Confirme a senha"
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
					>Atualizar senha
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
                (validlength => (validlength?.length > 5) || 'A senha deve possir mais que 5 caracteres'),
                (containsNumber => regexNumber.test(containsNumber) || 'A senha deve container pelo menos um numero'),
                (constainsText => regexText.test(constainsText) || 'A senha deve possuir pelo menos uma letra'),
                (containsSpecialCaracter => regexSpecialCharacters.test(containsSpecialCaracter) || 'A senha deve conter pelo menos um caracter especial')
            ],
            passwordConfirmRules: [
                isValid => isValid == this.password || 'O campo de confirmação de senha deve ser igual ao campo senha'
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
            userService.resetPassword(user)
                .then((result) =>{
                    if(result.statusCode == 0){
                        if(result.data){
                            alert("Alteração de senha realizada com sucesso");
                            setTimeout(() => (this.loading = false), 2000);
                            setTimeout(() => router.push("/login") , 2000);
                        }
                    }else{
                        alert("Não foi possivel atualizar a senha");
                        setTimeout(() => router.push("/login") , 2000);
                    }
                });
        }
    }
}

</script>