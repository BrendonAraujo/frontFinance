<template>
    <v-container>
        <h1 class="text-center">User Created!</h1>
        <p class="text-center">Return to page of login to acess the Finance Controller</p>
        <v-btn
            block
            color="success"
            size="large"
            variant="elevated" 
            @click="goToLogin"
        >Login
        </v-btn>
    </v-container>
</template>

<script>
import router from '@/router';

export default{
    methods:{
        goToLogin(){
           router.push("/login");
        }
    }
}
</script>
