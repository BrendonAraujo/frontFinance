import FinanceCreate from '@/models/ReleasesFiance/FinanceCreate';
import FinanceEdit from '@/models/ReleasesFiance/FinanceEdit';
import FinanceFilter from '@/models/ReleasesFiance/FinanceFilter';
import axios from 'axios';

const urlApi = 'https://localhost:7245/';

class FinanceService { 
    public token : string = "";
    GetAll(){
        return axios.get(urlApi+'Finance/v1/userId/',this.getConfigRequest())
            .then(function(response){
                return response.data.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    };
    GetByFilter(filter : FinanceFilter){
        console.log(filter)
        return axios.post(urlApi+'Finance/v1/by-filter/',filter,this.getConfigRequest())
            .then(function(response){
                return response.data.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    }
    add(finance : FinanceCreate){
        return axios.post(urlApi+'Finance/v1/',finance,this.getConfigRequest())
            .then(function(response){
                return response.data.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    };
    edit(finance: FinanceEdit){
        return axios.put(urlApi+'Finance/v1/',finance,this.getConfigRequest())
            .then(function(response){
                return response.data.data
            })
            .catch(function (error) {
                // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
                return false;
            })
    };
    delete(itemId : number){
        let config = this.getConfigRequest();
        console.log(this.token)
        return axios.delete(urlApi + 'Finance/v1/'+itemId, config)
            .then(function(response){
                return response.data.data
            })
            .catch(function (error){
                return false;
            })
    };

    getConfigRequest(){
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer '
            }
        };
        config.headers.Authorization = 'Bearer ' + this.token;
        return config;
    }
}

const financeService = new FinanceService();

export default financeService;