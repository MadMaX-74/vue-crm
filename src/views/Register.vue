<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'Home_Bookkeeping' | localize }}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required)||($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">{{ 'InputMail' | localize }}</small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{ 'IncorrectMail' | localize }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required)||($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">{{ 'InputPassword' | localize }}</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{`Min length ${$v.password.$params.minLength.min}`}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim = "name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{ 'InputName' | localize }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ 'rules_agree' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ 'Register' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'no_account' | localize }}
        <router-link to="/login">{{'Enter' | localize}}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators';

  export default {
   metaInfo () {
     return {
       title: this.$title('Home_Bookkeeping')
     }
   },
  data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      name: {required},
      agree: {checked: v => v}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
          await this.$router.push('/')
        }catch (e){
          console.warn(e.message)
        }

      }
    }
 }
</script>
