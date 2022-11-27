<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите имя</small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: ''
  }),
  validations: {
    name: {required}
  },
  mounted() {
    this.name = this.info.name
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      M.updateTextFields()
    })

  },
  computed:{
    ...mapGetters(['info'])
  },
  methods: {
    async submitHandler()  {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }

      try{

      }catch(e){
        console.warn(e.message)
      }

    }
  }
}

</script>

<style scoped>
  .switch{
    margin-bottom: 2rem;
  }
</style>
