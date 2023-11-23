<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="active()"
      icon="mdi-plus"
      small
    >
    </v-btn>

    <v-dialog
      v-model="dialog"
    >
      <v-card
        elevation="2"
      >
        <v-toolbar
          dark 
        >
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="save()"
          >
            Salvar
          </v-btn>
        </v-toolbar-items>
        </v-toolbar>
        <v-card-title>
              Adicione o Lançamento
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  label="Tipo de laçamento"
                  v-model="tipoLancamento"
                  row  
                >
                  <v-radio
                    row
                    label="Receita"
                    :value="0"
                  >
                  </v-radio>
                  <v-radio 
                    row  
                    label="Despesa"
                    :value="1"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="acountSelected"
                  :items="banckAcounts"
                  item-title="name"
                  item-value="id"
                  :return-object="true"
                  label="Selecione uma conta bancária"
                  outlined
                  clearable
                  hide-selected
                >
                </v-combobox>
            </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <VueDatePicker :format="format" cols="12" sm="6" md="4" large dark v-model="date" />
              </v-col>
              <v-col>
                <input 
                  hidden
                  v-maska="bindedObject"
                  data-maska="9 99#,##"
                  data-maska-tokens="9:[0-9]:repeated"
                  data-maska-reversed
                  v-model="value"
                >
                <v-text-field
                  v-model="value"
                  clearable
                  Outlined 
                  label="Valor"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  clearable
                  Outlined 
                  label="Obs"
                  type="text"
                  v-model="obs"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import accountService from '@/services/AccountService'
  import FinanceCreate from '@/models/ReleasesFiance/FinanceCreate'
  import financeService from '@/services/FinanceService'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import { ref,reactive } from 'vue';
  import { vMaska } from "maska"

  export default {
    components: { VueDatePicker },
    setup(){
      const fnanceValue = 0;
      const date = ref(new Date());
      const maskedValue = ref('')
      const bindedObject = reactive({})
      // In case of a range picker, you'll receive [Date, Date]
      const format = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      }
      return {
        format,
        maskedValue,
        bindedObject,
        fnanceValue
      }
    },
    data () {
      return {
        dialog: false,
        teste: null,
        tipoLancamento: null,
        receita: 0,
        despesa: 1,
        value: 0,
        date:new Date(),
        banckAcounts: accountService.Accounts,
        acountSelected: null,
        obs: ""
      }
    },
    methods:{
      getAccount(){
        accountService.GetAllAccount().then((result) => {
          if(result != undefined){
            accountService.Accounts = result;
            this.banckAcounts = result;
          }else{
          }
        });
      },
      clearValues(){
        this.tipoLancamento = null,
        this.receita = 0,
        this.despesa =  1,
        this.value = 0,
        this.date = new Date(),
        this.banckAcounts = accountService.Accounts,
        this.acountSelected = null,
        this.obs = ""
      },
      active(){
        this.clearValues();
        this.dialog = true
      },
      save(){
        console.log('Teste')
        if(this.acountSelected != null || this.acountSelected != undefined){
          let finance = new FinanceCreate();
          finance.AccountId = this.acountSelected.id
          finance.TypeFinanceRelease = this.tipoLancamento
          finance.DateExec = this.date

          let teste = this.tipoLancamento == 0 ? 
            this.bindedObject.masked.replace(",",".").replaceAll(" ","") :
            (this.bindedObject.masked.replace(",",".").replaceAll(" ","") * (-1));

          finance.Value = teste;//this.bindedObject.masked.replace(",",".").replaceAll(" ","")
          finance.Obs = this.obs;
          financeService.add(finance);

          this.dialog = false
        }else{
          alert("Select an Account")
        }
      }
    },
    mounted(){
      this.clearValues();
    },
    created: function(){
      this.clearValues();
      this.getAccount();
    }
  }
</script>