<template>
  <div class="login-wrapper">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 elevation-7>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-text-field
                label="Enter a password"
                v-model="password"
                type="password"
                hint="Atleast 8 characters in length"
                min="8"
                :append-icon="pwd ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (pwd = !pwd)"
                :type="pwd ? 'password' : 'text'"
              ></v-text-field>

              <v-btn :disabled="!valid" @click.prevent="handleSubmit" style="background-color: #F4812D; color: white;">Submit</v-btn>

              <v-btn v-on:click="clear" style="color: #F4812D;">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AppService from '@/app.service.js'
export default {
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      pwd: true
    }
  },
  methods: {
    handleSubmit() {
      // TODO success and redirect
      if (this.$refs.form.validate()) {
        var data = new FormData

        data.append('email', this.email)
        data.append('password', this.password)

        AppService.login(data)
        .then(result => {
          if (result.Error) {
            this.$emit("auth", false)
          } else if (result.Success) {
            this.$emit("auth", true)
            this.$router.push("/")
            window.localStorage.setItem("brewToken", result.Success.brewToken)
          } else {
            this.$emit("auth", false)
          }
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss">
  .login-wrapper {
    @include flexRowC;
    min-height: calc(100% - 74px);

    .layout {
      margin-top: -15rem;

      .card {
        .clear-btn {
          background-color: red !important;
        }
      }
    }
  }
</style>
