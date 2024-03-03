<script setup>
</script>

<template>
    <div class="login">
        <h1>Registracija</h1>
        <div v-if="napaka" class="alert alert-danger alert-dismissible fade show text-center fs-6">{{ napaka }}<button type="button" @click="this.napaka = null"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
        <form action="" @submit="register">

            <div class="control-group">
                <label for="form-email">Uporabniško Ime</label>
                <input v-model="username" type="text" name="user" class="form-control" id="form-email">
            </div>
            <div class="control-group">
                <label for="form-email">Email</label>
                <input v-model="email" type="text" name="mail" class="form-control" id="form-email">
            </div>

            <div class="control-group">
                <label for="form-pass">Geslo</label>
                <input v-model="password" type="password" name="pass" class="form-control" id="form-pass">
            </div>

            <div class="control-group">
                <label for="form-pass-conf">Potrdi Geslo</label>
                <input type="password" name="pass" class="form-control" id="form-pass-conf">
            </div>
            <input type="submit" value="Registriraj se">
            <div id="register-here">Že imaš račun? <router-link to="/login">Prijavi se tukaj!</router-link></div>

        </form>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            napaka: "",
            username: "",
            password: "",
            email: ""
        };
    },
    methods: {
        register(e) {
            e.preventDefault();
            const req = {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ username: this.username, password: this.password, mail: this.email})
            }
            fetch("http://localhost:8080/api/auth/register", req).then(async res => {
                const data = await res.json()
                if(data.status == "ok") {
                    this.$router.push('/login')
                    return
                } 
                console.log(data)

                switch(data.code) {
                    case "userdupl":
                        this.napaka = "Uporabniško ime je že v uporabi!"
                        return
                    case "maildupl":
                        this.napaka = "Email je že v uporabi!"
                        return
                    case "mailbadc":
                        this.napaka = "Neveljaven email!"
                        return
                }

            }).catch(async res => {
                this.napaka = 'Napaka pri strežniku! Prosimo poskusite kasneje'
            })
        }
    }
};
</script>
<style>

</style>