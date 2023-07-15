import Account from "../Account/Account";

export default class ReleaseFiance {
    public Id : number = 0;
    public Type : number = 0;
    public Account : Account = new Account();
    public DateExec : Date = new Date();
    public Observation : string = "";
    public UserId : number = 0;
    public Value: number = 0;
}
