import ReleaseFiance from '@/models/ReleasesFiance/ReleaseFiance'
import User from '@/models/Users/User'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number,
  user: User,
  finance: any[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
      count: 0,
      user: new User(),
      finance: []
  },
  mutations:{
    deleteFinance(state, id){
      var index = state.finance.indexOf(state.finance.find(c => c.id = id))
      state.finance.splice(index, 1);
    },
    editFinance(state, finance){
      console.log('Atual')
      console.log(finance)
      console.log("Antigo")
      console.log(state.finance.find(c => c.id = finance.id))

      var index = state.finance.indexOf(state.finance.find(c => c.id = finance.id))
      state.finance.splice(index, 1);
      state.finance.push(finance)
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
