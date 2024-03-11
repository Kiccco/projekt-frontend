<script setup>
import FriendsComponent from '../components/FriendsComponent.vue'
import ChatComponent from '../components/ChatComponent.vue'
import TopComponent from '../components/TopComponent.vue'

</script>

<template>

    <TopComponent />
    <div class="row">
        
            <div class="col-5">
                <FriendsComponent />
            </div>
            
            <div class="col" style="height:85vh">
                <ChatComponent />
            </div>
          

 

    </div>

    <div class="d-flex position-absolute w-100 bottom-0">
        <div class="border-top d-flex flex-row align-items-center p-2 w-100">
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle mr-1 d-block mt-1" alt="William Harris" width="40" height="40">
                <div class="ms-2">
                    <div class="">{{ user }}</div>
                    <div>Online</div>
                </div>
                <button class="btn btn-secondary ms-auto">Nastavitve</button>
                <button @click="odjava" class="btn btn-success ms-1">Odjava</button>
            </div>
            <div class="border-top d-flex justify-content-center align-items-center w-100">
                    <div class="input-group w-75"> 
                        <input type="text" class="form-control" placeholder="Sporočilo">
                            <button class="btn btn-success">Pošlji</button>
                    </div>
                    
        </div>
    </div>



</template>
<script>
import { useStore } from 'vuex';
import router from "../router";
export default {

    methods: {
        odjava(e) {
            localStorage.removeItem("token")
            router.push("/login")
        }
    },

    setup() {
        let store = useStore()
        let user = store.state.user
        return {
            user
        }
    },

    created() {
        console.log(this.getUser)
        if(localStorage.getItem("token") == null) {
            this.$router.push("/login")
        }
    }
}
</script>
<style>
    body {
      overflow: hidden;
    }

   .name {
    font-weight: bolder;
   }

   .chat {
    overflow-y: auto;
    min-height: 300px;
   }





</style>