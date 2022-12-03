<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Home_Bookkeeping' | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required)||($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">{{'InputMail' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'IncorrectMail' | localize}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required)||($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">{{ 'Input_Password' | localize }}</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{`Min length ${$v.password.$params.minLength.min} symbols`}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ 'LogIn' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'no_account' | localize }}
        <router-link to="/register">{{ 'Register' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

  export default {
    name: 'login',
    data: () => ({
      email: '',
      password: ''
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    mounted(){
      if(messages[this.$route.query.message]){
        this.$message(messages[this.$route.query.message])
      }
    },
    methods: {
      async submitHandler() :any {
        if (this.$v.$invalid){
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password
        }
        try{
          await this.$store.dispatch('login', formData)
          this.$router.push('/')
        }catch(e){
          console.warn(e.message)
        }

      }
    }
  }
</script>


