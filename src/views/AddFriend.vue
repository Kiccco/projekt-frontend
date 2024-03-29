<script setup>
import store from "../store"
</script>

<template>
    <div><a @click="this.$router.push('/home')">Exit</a>
    </div>
    <div class="container">
        <h1>Dodaj prijatelja</h1>
        <div v-if="napaka" class="alert alert-danger alert-dismissible fade show text-center fs-6">{{ napaka }}<button type="button" @click="this.napaka = null"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
        <div>Tukaj lahko dodas prijatelja</div>
        <form @submit="isci" class="d-flex">
            <div class="input-group w-75"> 
                <input v-model="user" type="text" class="form-control" placeholder="Išči uporabnika">
                <input type="submit" class="btn btn-success" value="Išči">
        </div>
        </form>
        <div class="d-flex flex-column mt-4">
            <div v-for="u in users" class="bg-light w-50 p-2 d-flex align-items-center">
                <span class="fs-3">{{ u.user }}</span>
                <button :id="u.id" class="btn btn-info ms-auto" @click="dodaj($event)">Dodaj</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: () => {
        return {
            user: "",
            users: [],
            napaka: null
        }
    },
    methods: {
            
        isci(e) {
            e.preventDefault();
            const req = {
                method: 'GET', 
            }
            fetch("http://localhost:8080/api/search/" + this.user, req).then(async res => {
                
                if(res.status == 500) {
                    this.napaka = "Napaka pri strežniku! Prosimo poskusite kasneje!"
                }

                const data = await res.json()
                console.log(data)
                this.users = data.result 
                
            }).catch(async res => {

            })
        },
        dodaj(event) {
            const ids = event.currentTarget.id
       
            const req = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + store.state.token},
                body: JSON.stringify({id: parseInt(ids)})
            }
            fetch("http://localhost:8080/api/addFriend", req).then(async res => {
                console.log(req.body)
                if(res.status == 500) {
                    this.napaka = "Napaka pri dodajanju prijatelja! Prosim poskusite znova pozneje."
                    return
                } else {
                    document.getElementById(ids).classList.add('disabled')
                }


            }).catch(async res => {
                console.log(res)
            })
        }
        }
    }


</script>