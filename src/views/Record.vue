<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_New_Record' | localize }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">{{ 'no_categories' | localize }} <router-link to="/categories">{{ 'Add_Category' | localize }}</router-link></p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{ 'Select_Category' | localize }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'Spend' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
        >
        <label for="amount">{{ 'Sum' | localize }}</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Min value {{$v.amount.$params.minValue.min}}</span>
      </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
              :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
          >
          <label for="description">{{ 'Description' | localize }}</label>
          <span class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">{{ 'Input_descr' | localize }}</span>
        </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from "vuex";

export default Vue.extend({
  name: 'record',
  validations: {
    description: {required},
    amount: {minValue: minValue(1)}
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  async mounted() :Promise<void>{
    this.categories = await this.$store.dispatch('fetchCategory')
    this.loading = false

    if(this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields();
    }, 0)

  },
  destroyed() :void{
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income'){
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill :number = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.warn(e.message)
        }
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  }

})

</script>
