<template>
  <v-row>
    <v-btn
      elevation="2"
      icon
      size="x-small"
      outlined
      @click.stop="dialog = true"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>

    <v-dialog
    v-model="dialog"
    >
      <v-card elevation="2">
        <v-toolbar dark>
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
            Edit Finance
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
                <VueDatePicker cols="12" sm="6" md="4" large dark v-model="dataExect" />
              </v-col>
              <v-col>
                <!-- TODO: Ajustar máscara -->
                <v-text-field
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
import financeService from '@/services/FinanceService'
import FinanceEdit from '@/models/ReleasesFiance/FinanceEdit'

export default{
  props:['finance'],
  data(){
      return  {
        dialog: false,
        tipoLancamento: this.finance.type,
        receita: 0,
        despesa: 1,
        dataExect: this.finance.dateExec,
        value: this.finance.value,
        banckAcounts: accountService.Accounts,
        acountSelected: this.finance.account,
        obs: this.finance.obs
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
        console.log(this.finance);
        if(this.acountSelected != null || this.acountSelected != undefined){
           let finance = new FinanceEdit();
           finance.AccountId = this.acountSelected.id
           finance.TypeFinanceRelease = this.tipoLancamento
           finance.Value = this.value;
           finance.DateExec = this.dataExect
           finance.Obs = this.obs;
           finance.id = this.finance.id;

           console.log(financeService.token)
           financeService.edit(finance);

           this.dialog = false
         }else{
           alert("Select an Account")
         }
      }
    }
}
</script>