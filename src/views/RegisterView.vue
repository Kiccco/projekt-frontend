<script setup>
</script>

<template>
    <main>
        <div class="login">
        <h1>Registracija</h1>
        <form action="">

            <div class="control-group">
                <label for="form-email">Uporabniško Ime</label>
                <input type="text" name="username" class="form-control" id="form-email">
            </div>
            <div class="control-group">
                <label for="form-email">Email</label>
                <input type="text" name="mail" class="form-control" id="form-email">
            </div>

            <div class="control-group">
                <label for="form-pass">Geslo</label>
                <input type="password" name="pass" class="form-control" id="form-pass">
            </div>

            <div class="control-group">
                <label for="form-pass-conf">Potrdi Geslo</label>
                <input type="password" name="pass" class="form-control" id="form-pass-conf">
            </div>
            <input type="submit" value="Registriraj se">
            <div id="register-here">Že imaš račun? <router-link to="/login">Prijavi se tukaj!</router-link></div>

        </form>
    </div>
    </main>
</template>

<style>

</style>