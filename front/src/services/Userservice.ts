import UserSigin from '@/models/Users/UserSignIn';
import UserSingUp from '@/models/Users/UserSingUp';
import UserFindByEmail from "@/models/Users/UserFindByEmail";
import axios from 'axios';
import UserEmailResetPassword from '@/models/Users/UserEmailResetPassword';
import UserValidateResetCode from '@/models/Users/UserValidateResetCode';
import UserResetPassword from '@/models/Users/UsertResetPassword';
import User from '@/models/Users/User';
import UserUpdate from '@/models/Users/UserUpdate';

const urlApi = 'https://backendfinanceprod.azurewebsites.net/'; //'https://localhost:7245/';
let resetCode = 0;
let UserEmail = "";

const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    }
};

class UserService {
    public token : string = "";
    public user: User = new User();
    public userEmail = "";
    public Resetcode = "";
    check() {
        return axios.get(urlApi+'Auth/v1/Check/')
            .then(function (response) {
                // aqui acessamos o corpo da resposta:
                // if(response.data.statusCode == 0)

                return response.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    }  

    login(user: UserSigin){
      return axios.post(urlApi+'Auth/v1/Sigin/',user)
        .then(function (response) {
          // aqui acessamos o corpo da resposta:
          return response.data
        })
        .catch(function (error) {
          // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
          return "Server error, try again :(";
        })
    }

    update(user: UserUpdate){
      console.log(user)
      return axios.post(urlApi+'Auth/v1/edit/', user, this.getConfigRequest())
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        return response.data
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        return "Server error, try again :(";
      })
    }

    singUp(user: UserSingUp){
      return axios.post(urlApi+'Auth/v1/Singup/',user)
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        return response.data
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        return "Server error, try again :(";
      })
    }

    userExists(user : UserFindByEmail){
      return axios.post(urlApi+'Auth/v1/Exist-user/',user)
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        return response.data
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        return "Server error, try again :(";
      })
    }

    sendEmailRestPassword(user : UserFindByEmail){
      return axios.post(urlApi+'Auth/v1/Send-email-user-restore-password/',user)
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        return response.data
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        return "Server error, try again :(";
      })
    }

    validateResetPasswordCode(user: UserValidateResetCode){
      return axios.post(urlApi+'Auth/v1/Validates-reset-code/',user)
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        return response.data
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        return "Server error, try again :(";
      })
    }

    resetPassword(user : UserResetPassword){
      return axios.post(urlApi+'Auth/v1/Reset-password/',user)
        .then(function (response){
          return response.data
        }).catch(function(error){
          return "Server error, try again :(";
        })
    }
    
    getConfigRequest(){
      let config = {
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer '
          }
      };
      config.headers.Authorization = 'Bearer ' + this.user.token;
      return config;
    }
}

const userService = new UserService();

export default userService
