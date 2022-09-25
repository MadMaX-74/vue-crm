import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filters'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)


firebase.initializeApp({
  apiKey: "AIzaSyAv0U15IvZQIF2y74Jg8R6eav0zz0K3qdA",
  authDomain: "vue-use-crm.firebaseapp.com",
  projectId: "vue-use-crm",
  storageBucket: "vue-use-crm.appspot.com",
  messagingSenderId: "541779271956",
  appId: "1:541779271956:web:2573377f417f5cbe8d6201"
});

let app :any;

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }  
})

