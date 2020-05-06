import Vue from 'vue'
import router from '@/router'

const link = {
    namespaced: true,
    state: { 
      src: ''
    },
    getters: {
       
    },
    mutations: { 
        
    },
    actions: {
        toLink({state}, src){
            
            state.src = src
           
            router.push('/link/link')
        } 
    }
}
export default link
