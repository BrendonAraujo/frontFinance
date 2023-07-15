<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
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
            Save
          </v-btn>
        </v-toolbar-items>
        </v-toolbar>
        <v-card-title>
            <!-- TODO: Melhorar nome do card -->
            Finance register
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
                  @click="getAccount()"
                  v-model="acountSelected"
                  :items="banckAcounts"
                  item-title="name"
                  item-value="id"
                  :return-object="true"
                  label="Select an item.."
                  outlined
                  clearable
                  hide-selected
                >
                </v-combobox>
            </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <VueDatePicker cols="12" sm="6" md="4" large dark v-model="date" />
              </v-col>
              <v-col>
                <!-- TODO: Ajustar máscara -->
                <v-text-field
                  clearable
                  Outlined 
                  v-model="value"
                  label="Value"
                  type="number"
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

  export default {
    components: { VueDatePicker },
    data () {
      return {
        dialog: false,
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
            console.log("undefined")
          }
        });
      },
      save(){
        if(this.acountSelected != null || this.acountSelected != undefined){
          console.log(this.tipoLancamento)
          let finance = new FinanceCreate();
          finance.AccountId = this.acountSelected.id
          finance.TypeFinanceRelease = this.tipoLancamento
          finance.DateExec = this.date
          finance.Value = this.value;
          finance.Obs = this.obs;
          console.log(finance);

          console.log(financeService.token)
          financeService.add(finance);

          this.dialog = false
        }else{
          alert("Select an Account")
        }
      }
    }
  }
</script>