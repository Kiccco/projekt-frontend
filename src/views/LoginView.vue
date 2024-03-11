<script setup>

</script>

<template>
  
  <div class="login">
        <h1>Prijava</h1>
        <div v-if="napaka" class="alert alert-danger alert-dismissible fade show text-center fs-6">{{ napaka }}<button type="button" @click="this.napaka = null"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
        <form @submit="login">
            <div class="control-group">
                <label for="form-email">Uporabniško ime</label>
                <input v-model="username" type="text" name="user" class="form-control" id="form-email">
            </div>

            <div>
                <label for="form-pass">Geslo</label>
                <input v-model="password" type="password" name="pass" class="form-control" id="form-pass">
                <a id="switch-forms" href="#">Pozabljeno geslo?</a>
            </div>
            <input type="submit" value="Prijavi se">
            <div id="register-here">Nimaš računa? <router-link to="/register">Registriraj se zdaj!</router-link></div>
        </form>
    </div>    
    
    
</template>
<script>
import store from "../store"
import {jwtDecode} from "jwt-decode"
import router from "../router";
export default {
    data: () => {
        return {
            username: "",
            password: "",
            napaka: ""
        };
    },
    computed: {
       
    },
    methods: {

        login(e) {
            e.preventDefault();
            const req = {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ username: this.username, password: this.password})
            }
            fetch("http://localhost:8080/api/auth/login", req).then(async res => {
                const data = await res.json()
                console.log(data)

                if(data.status == "error" && data.code == "authbadc") {
                    this.napaka = "Napačno uporabniško ime ali geslo!"
                    return
                }
               

                let decoded = jwtDecode(data.token)
                console.log(decoded)

                store.commit("setToken", data.token)
                store.commit("setUser", decoded.username)
                
                console.log(store.state.user)
                
                router.push("/home")
                
                
            }).catch(async res => {
                this.napaka = 'Napaka pri strežniku! Prosim poskusite kasneje'
            })
        }
    },

    created() {
        if(store.state.user != null) {
            router.push("/home")
        }
    }
};
</script>
<style>
      body {
            background: linear-gradient(to bottom right, #1E2132, #4C566A, #A3BE8C);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .login {
            
            max-width: 400px;
            padding: 30px;
            background-color: #2C2F33;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            color: #FFFFFF;
            text-align: center;
            margin: 0 auto;
            margin-top: 50px;
        }

        .control-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-size: 16px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #40444B;
            border-radius: 5px;
            background-color: #36393F;
            color: #FFFFFF;
            font-size: 14px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .form-control:focus {
            transform: scale(1.05);
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .btn-primary {
            background-color: #5865F2;
            color: #FFFFFF;
        }

        .btn-primary:hover {
            background-color: #4853A7;
        }

        .alert {
            margin-bottom: 20px;
        }

        #register-here,
        #switch-forms {
            margin-top: 20px;
            font-size: 14px;
            color: #B3B3B3;
            transition: color 0.3s ease, transform 0.2s ease;
            cursor: pointer;
            text-decoration: none;
            color: #FFFFFF;
        }

        #register-here:hover,
        #switch-forms:hover {
            color: #FFFFFF;
            transform: scale(1.05);
        }
</style>