<template>
  <div class="create-beer-wrapper">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>
      <v-text-field
        v-model="description"
        name="input-7-1"
        label="Description"
        multi-line
      ></v-text-field>
      <v-text-field
        v-model="alcohol_content"
        label="Alcohol Content"
        type="number"
      ></v-text-field>

      <v-checkbox v-bind:label="`Featured?`" v-model="featured" light></v-checkbox>

      <v-switch v-for="brewer in brewers" v-model="selectedBrewers" :value="brewer.id" :label="brewer.first_name" :key="brewer.id"></v-switch>

      <v-checkbox
        label="Do you agree?"
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        required
      ></v-checkbox>

      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
  import AppService from '@/app.service.js'
  export default {
    data: () => ({
      featured: false,
      alcohol_content: null,
      description: "",
      selectedBrewers: [],
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        // (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      brewers: [],
      checkbox: false
    }),
    created() {
      this.getBrewerNames()
    },
    methods: {
      getBrewerNames() {
        AppService.getBrewerNames()
        .then(data => {
          var brews = data.data
          for (var i=0; i < brews.length; i++) {
            brews[i].id = brews[i].id + ""
          }
          this.brewers = brews
        })
      },
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
<style lang="css">
  .create-beer-wrapper {
    background: white;
  }
</style>
<!-- <template>
  <div class="add-beer">
    <h1>Add New Beer</h1>
    <form class="create-form" ref="createBeerForm" v-on:submit.prevent="handleSubmit" method="post" enctype="multipart/form-data">
      <label for="">Beer Name</label>
      <input type="text" name="name" v-model="name">
      <label for="">Description</label>
      <textarea name="description" v-model="description" rows="8" cols="80"></textarea>
      <label for="">Alc%</label>
      <input type="number" name="alcohol_content" v-model="alcohol_content">
      <label for="">Featured</label>
      <input type="checkbox" name="featured" v-model="featured">
      <label for="">Image</label>
      <input type="file" ref="file" name="image" v-on:change="handleFileUpload">

      <select multiple name="brewers[]" v-model="selectedBrewers">
        <option v-for="brewer in brewers" :value="brewer.id" :key="brewer.id">{{ brewer.first_name }}</option>
      </select>

      <span>Selected: {{selectedBrewers}}</span>

      <button type="submit" name="button">Submit</button>
    </form>
  </div>
</template>
<script>
import AppService from '@/app.service.js'

export default {
  components: {},
  props: [],
  data() {
    return {
      file: '',
      name: '',
      description: '',
      alcohol_content: null,
      featured: false,
      brewers: [],
      selectedBrewers: []
    }
  },
  created() {
    this.getBrewers()
  },
  methods: {
    getBrewers() {
      AppService.getBrewerNames()
      .then(data => {
        var brews = data.data
        for (var i=0; i < brews.length; i++) {
          brews[i].id = brews[i].id + ""
        }
        this.brewers = brews
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    handleSubmit() {
      this.name = this.$refs.createBeerForm.name.value
      this.description = this.$refs.description.value
      var createBeerData = new FormData()

      createBeerData.append('file', this.file, this.file.name)
      createBeerData.append('name', this.name)
      createBeerData.append('description', this.description)

      AppService.imageTest(createBeerData)
    }
  },
  watch: {}
}
</script>

<style lang="css">
  .create-form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
  }
</style> -->
