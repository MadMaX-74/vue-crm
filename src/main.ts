import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filters'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
// @ts-ignore
import tooltipDirective from "@/directives/tooltip.directive.js"
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader.vue'
import firebase from 'firebase/compat/app'
// @ts-ignore
import Paginate from 'vuejs-paginate'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyAv0U15IvZQIF2y74Jg8R6eav0zz0K3qdA",
  authDomain: "vue-use-crm.firebaseapp.com",
  databaseURL: "https://vue-use-crm-default-rtdb.europe-west1.firebasedatabase.app",
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

