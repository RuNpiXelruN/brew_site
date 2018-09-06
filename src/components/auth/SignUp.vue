<template>
    <div class="signup-wrapper">
        <v-card>
            <v-layout justify-center>
                <v-flex xs10>
                    <div class="signup-flexend">
                        <h1>Signup</h1>
                    </div>
                    <v-form ref="signupForm" id="formm" v-model="valid" @submit.prevent lazy-validation>
                        <v-text-field
                            label="Email"
                            v-model="email"
                            :rules=emailRules
                            required>                    
                        </v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (showPassword = !showPassword)"
                            :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'"
                            label="Password"
                            hint="At least 8 characters"
                            required
                            counter>
                        </v-text-field>
                        <div class="signup-flexend">
                            <v-btn color="info" @click="handleSignup">Signup</v-btn>
                            <v-btn color="info" @click="clear">Clear</v-btn>
                        </div>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-card>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            email: null,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: null,
            showPassword: false,
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 8) || 'Min 8 characters',
            ],
            valid: true,
        }
    },
    methods: {
        handleSignup() {
            if (this.$refs.signupForm.validate()) {
                this.$store.dispatch('signUp', {email: this.email, password: this.password})
            }
        },
        clear() {
            this.$refs.signupForm.reset()
        }
    }
}
</script>
<style lang="scss">
    .signup-wrapper {
        min-height: 100%;

        .signup-flexend {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-end;
        }
    }
</style>


