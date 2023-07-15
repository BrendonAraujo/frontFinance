export default class UserEmailResetPassword {

    public UserEmailResetPassword(email: string, code: string){
        this.email = email;
        this.code = code;
    }
    public email: string = "";
    public code: string = "";
}