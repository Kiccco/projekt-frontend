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
                <a href="#">Pozabljeno geslo?</a>
            </div>
            <input type="submit" value="Prijavi se">
            <div id="register-here">Nimaš računa? <router-link to="/register">Registriraj se zdaj!</router-link></div>
        </form>
    </div>    
    
</template>
<script>
import {mapMutations, mapGetters} from "vuex"
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
        ...mapGetters(["getUser"])
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
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
                localStorage.setItem("token", data.token)
                this.setUser(decoded.username)
                console.log(this.getUser)
                
          
                router.push("/home")
                
                
            }).catch(async res => {
                this.napaka = 'Napaka pri strežniku! Prosim poskusite kasneje'
            })
        }
    }
};
</script>
<style>
    .login {
        margin: 0 auto;
        margin-top: 50px;
        background-color: rgb(255, 255, 255);
       
        border: 1px solid black;
        border-radius: 10px;
        
    }

 

    body {
        background-color: #30363d;
    }
</style>