<script setup>
</script>

<template>
    <main>
        <div class="login">
        <h1>Prijava</h1>
        <form @submit="login">
            <div class="control-group">
                <label for="form-email">Email</label>
                <input v-model="username" type="text" name="mail" class="form-control" id="form-email">
            </div>

            <div>
                <label for="form-pass">Geslo</label>
                <input v-model="password" type="password" name="pass" class="form-control" id="form-pass">
                <a href="#">Pozabljeno geslo?</a>
            </div>
            <input type="submit" value="Prijavi se">
            <div id="register-here">Nimaš računa? <router-link to="/register">Registriraj se zdaj!</router-link></div>
        </form>
    </div>    </main>
</template>
<script>
export default {
    data: () => {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login(e) {
            e.preventDefault();
           
        }
    }
};
</script>
<style>

</style>