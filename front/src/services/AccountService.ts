import Account from '@/models/Account/Account';
import FinanceCreate from '@/models/ReleasesFiance/FinanceCreate';
import axios from 'axios';

const urlApi = 'https://backendfinanceprod.azurewebsites.net/'; //'https://localhost:7245/';

const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
};

class   AccountService { 
    public Accounts : Account[] = [new Account()];
    GetAllAccount(){
        return axios.get(urlApi+'Account/v1/')
            .then(function(response){
                return response.data.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    }
}

const accountService = new AccountService();

export default accountService;
