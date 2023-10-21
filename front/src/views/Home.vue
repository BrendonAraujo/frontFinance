<template >
  <v-container>
    <v-col cols="12">
      <h1>Welcome {{ userName }}</h1>
    </v-col>
    <v-col cols="12">
      <v-card class="text-center">
        <v-card-title>
          Resultado Mensal
        </v-card-title>
        <v-card-text>
          <v-col :style="totalValue > 0 ? 'color:green' : 'color:red'">
            <span style="font-size: x-large">
              R${{ totalValue }}
            </span>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-radio-group @change="load()" v-model="tipoLancamento" inline label="Tipo de laçamento">
        <v-radio label="Todas" :value="2"/> 
        <v-radio label="Receita" :value="0"/> 
        <v-radio label="Despesa" :value="1"/> 
      </v-radio-group>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-row class="text-center">
          <v-col cols="4">
            <v-btn>
              <v-icon @click="previousMonth()">
                mdi-arrow-left
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn @click="load()">
              {{months[selectedMonth]}}
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn @click="nextMonth()">
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-container @load="load()" fluid>
        <v-row>
          <v-col cols="6">
            <v-btn @click="load()">Atualiza</v-btn>
          </v-col>
          <v-col cols="6">
            <add-finance></add-finance>
          </v-col>
        </v-row>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item, Id) in itensFinance" :key="Id"      
            multiple
          >
            <v-expansion-panel-title>
              <v-row>
                <v-col cols="5">
                  {{ new Date(item.dateExec).toISOString().split('T')[0] }}
                </v-col>
                <v-col :style="item.type == 0 ? 'color:green' : 'color:red'" cols="3">
                  <v-label >R${{ item.value }}</v-label>
                </v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="auto">
                      <v-btn
                        color="red"
                        size="x-small"
                        @click="deleteItem(item.id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="auto">
                    <p>Account: {{ item.account.name }}</p>
                  </v-col>
                  <v-col cols="auto">
                    <edit-finance :finance="item"></edit-finance>
                  </v-col>
                </v-row>      
                <v-row>
                    <v-col>
                      <v-textarea 
                        label="Obs"
                        type="text"
                        disabled
                        :model-value="item.obs"
                      > 
                      </v-textarea>
                    </v-col>                
                </v-row>                
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
import userService from '@/services/Userservice';
import router from '@/router';
import AddFinance from '@/components/AddFinance.vue'
import EditFinance from '@/components/EditFinance.vue'
import financeService from '@/services/FinanceService'
import FinanceFilter from '@/models/ReleasesFiance/FinanceFilter'
import { store } from '@/store';
import { mapState } from 'vuex';

if(store.state.user.token == "")
  router.push('/login');

export default {
  components:{
    AddFinance,
    EditFinance
  },
  data(){
    return{
      userName: userService.user.UserData.name,
      itens: [],
      tipoLancamento: 2,
      selectedMonth: 0,
      months:[
        'Janeiro','Fevereiro','Março','Abril',
        'Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'        
      ],
      totalValue: 0
    }
  },
  created: function(){
    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.totalValue = 0;
    financeService.token = userService.user.token;
    let filter = new FinanceFilter();

    filter.month = this.selectedMonth + 1;
    filter.year = today.getFullYear();
  
    financeService.GetByFilter(filter).then((result) => {
      store.state.finance = result;
    });
  
  },
  methods:{
    load(){
      this.totalValue = 0;
      financeService.token = userService.user.token;

      let filter = new FinanceFilter();

      filter.month = this.selectedMonth + 1;
      filter.year = new Date().getFullYear();
      filter.type = this.tipoLancamento;

      financeService.GetByFilter(filter).then((result) => {
        store.state.finance = result;
        store.state.finance.forEach(x => this.totalValue  += x.value);
      });
    },
    deleteItem(item){
      financeService.token = userService.user.token;
      financeService.delete(item);
    },
    nextMonth(){
      if(this.selectedMonth < 11)
      {
        this.selectedMonth+=1;
      }
      else
      {
        this.selectedMonth = 0;
      }
      this.load()
    },
    previousMonth(){
      if(this.selectedMonth >= 1)
      {
        this.selectedMonth-=1;
      }
      else
      {
        this.selectedMonth = 11;
      }
      this.load()
    }
  },
  computed: mapState ({
    itensFinance: state => state.finance,
  }),
}


</script>
