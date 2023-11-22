import ReleaseFiance from '@/models/ReleasesFiance/ReleaseFiance'
import User from '@/models/Users/User'
import { stat } from 'node:fs'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number,
  user: User,
  finance: any[],
  isLogged: boolean,
  valorTotal: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
      count: 0,
      user: new User(),
      isLogged: false,
      finance: [],
      valorTotal: 0
  },
  mutations:{
    addAllFinances(state, finances){
      state.finance = finances;
      state.valorTotal = 0;
      state.finance.forEach(x => {
        state.valorTotal += (x.value)
      });
    },
    deleteFinance(state, id){
      var index = state.finance.indexOf(state.finance.find(c => c.id = id))
      state.finance.splice(index-1, 1);
      state.valorTotal = 0;
      state.finance.forEach(x => {
        state.valorTotal += (x.value)
      });
    },
    editFinance(state, finance){
      var index = state.finance.indexOf(state.finance.find(c => c.id = finance.id))
      state.finance.splice(index, 1);
      state.finance.push(finance)
      state.valorTotal = 0;
      state.finance.forEach(x => {
        state.valorTotal += (x.value)
      });
    },
    addFinance(state, finance){
      state.finance.push(finance)
      state.valorTotal = 0;
      state.finance.forEach(x => {
        state.valorTotal += (x.value)
      });
    },
    addUser(state, user){
      if(user == null){
        state.isLogged= false;
      }else{
        state.isLogged= true;
      }
      state.user = user;
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
