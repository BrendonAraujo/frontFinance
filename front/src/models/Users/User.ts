export default class User {
    public UserData: UserInfo = new UserInfo();
    public token: string = "";
}


class UserInfo{
    public id : number = 0;
    public name: string = "";
    public email: string = ""
    public type: number = 0;
}