<script setup>
import FriendsComponent from '../components/FriendsComponent.vue'
import ChatComponent from '../components/ChatComponent.vue'
import TopComponent from '../components/TopComponent.vue'
</script>

<template>

<TopComponent :frend="trenutnUser" />

    <div class="row">
            <div class="col-5 border-end">
                <FriendsComponent :frendi="frendi" :frendRequesti="frendRequesti"
                @odstrani-frenda="odstraniFrenda"
                @sprejmi-prosnjo="sprejmiProsnjo"
                @odstrani-prosnjo="zavrniProsnjo"
                @select="select"
                />
            </div>
            <div class="col">
                <ChatComponent :messages="sporocila" :selected="Selektan" :ime="pridobiIme" :userId="store.state.id"/>
            </div>
    </div>

    <div class="d-flex position-fixed w-100 bottom-0 bg-dark text-white">
        <div class="border-end d-flex flex-row align-items-center p-2" style="width:50%">
                <div class="ms-2">
                    <div class="">Ime: {{ user }}</div>
                    <div>Online</div>
                </div>
                
               
                <font-awesome-icon class="ms-auto options" :icon="['fas', 'gear']" />
                <font-awesome-icon class="options" @click="this.$router.push('/addFriend')" :icon="['fas', 'user-plus']" />
                <font-awesome-icon @click="odjava" class="ms-1 options" :icon="['fas', 'sign-out']" />
        </div>
        <form class="border-top d-flex justify-content-center align-items-center w-75" @submit="poslji">
                <div class="input-group w-75"> 
                        <input type="text" class="form-control" placeholder="Sporočilo" v-model="sporocilo">
                            <input type="submit" class="btn btn-success" value="Pošlji">
                </div>
        </form>

    </div>



</template>
<script>
import store from '../store';
import router from "../router";
export default {
    data() {
        return { 
            selected: 0,
            chatSelected: "",
            frendi: [],
            frendRequesti: [],
            chatSock: null,
            messages: [],
            sporocilo: ""
        }
    },
    methods: {
        odjava() {
            store.commit("setUser", null)
            store.commit("setToken", null)
            router.push("/login")
            this.chatSock.close()
        },

        select(id) {
            this.chatSelected = id
            this.refreshiMessage()
        },

        refreshiMessage() {
            const messages = this.messages.find(m => m.uuid == this.chatSelected)
            if(messages != null) return

            this.chatSock.send(JSON.stringify({type: "getMessages", data: {uuid: this.chatSelected}}))
        },

        poslji(e) {
            e.preventDefault()
            document.getElementById("cht").scrollTop = document.getElementById("cht").scrollHeight
            const messages = this.messages.find(m => m.uuid == this.chatSelected)
            if(messages == null) return
            if(this.sporocilo == "") return
            this.chatSock.send(JSON.stringify({type: "sendMessage", data: {uuid: this.chatSelected, message: this.sporocilo}}))
        },

        pridobiFrende() {
            const req = {
                method: 'GET', 
                headers: { Authorization: "Bearer " + store.state.token }, 
            }
            fetch("http://localhost:8080/api/getFriends", req).then(async res => {

                const data  = await res.json()
                if(res.status != 200) return

                data.forEach(user => {
                    this.frendi.push({id: user.id, ime: user.user, status: "Offline", lastSeen: "Neznano", chat: user.chatUUID})
                })

                
                console.log(this.frendi)
                
            }).catch(async res => {
                console.log(res)
            })
        },

        odstraniFrenda(event) {
            const id = event.currentTarget.id
            const req = {
                method: 'POST', 
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.state.token }, 
                body: JSON.stringify({id: parseInt(id)})
            }

            fetch("http://localhost:8080/api/removeFriend", req).then(async res => {
                
                if(res.status != 200) {
                    console.log("error status " + res.status)
                    return
                }
                console.log(req)
                const u = this.frendi.findIndex((res) => res.id == id)
          
                this.frendi.splice(u, 1)


            }).catch(async res => {
                console.log(res)
            })
        },

        pridobiProsnje() {
            const req = {
                method: 'GET', 
                headers: { Authorization: "Bearer " + store.state.token }, 
            }
            fetch("http://localhost:8080/api/getFriendRequests", req).then(async res => {

                const data  = await res.json()
                if(res.status != 200) return
                this.frendRequesti = data
                console.log(this.frendRequesti)
                
            }).catch(async res => {
                console.log(res)
            })
        },

        sprejmiProsnjo(event) {
            const id = event.currentTarget.id
            const req = {
                method: 'POST', 
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.state.token }, 
                body: JSON.stringify({id: parseInt(id)})
            }

            fetch("http://localhost:8080/api/acceptFriendReq", req).then(async res => {
                
                if(res.status != 200) {
                    console.log("error status " + res.status)
                    return
                }
                console.log(req)
                const fRIndex = this.frendRequesti.findIndex((res) => res.id == id)
                const a = this.frendRequesti[fRIndex]
                this.frendi.push({ime: a.user, id: a.id, status: "Offline", lastSeen: "13:00"})
                this.frendRequesti.splice(fRIndex, 1)
                this.chatSock.send(JSON.stringify({type: "friendAccept", data: {friend: id} }))


            }).catch(async res => {
                console.log(res)
            })
        },

        zavrniProsnjo(event) {
            const id = event.currentTarget.id
            const req = {
                method: 'POST', 
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.state.token }, 
                body: JSON.stringify({id: parseInt(id)})
            }

            fetch("http://localhost:8080/api/declineFriendReq", req).then(async res => {
                
                if(res.status != 200) {
                    console.log("error status " + res.status)
                    return
                }
                console.log(req)
                const fRIndex = this.frendRequesti.findIndex((res) => res.id == id)
                this.frendRequesti.splice(fRIndex, 1)
                this.chatSock.send(JSON.stringify({type: "friendDecline", data: {friend: id} }))

            }).catch(async res => {
                console.log(res)
            })
        }


    },

    computed: {
        user() {
            return store.state.user
        },

        Selektan() {
            return this.chatSelected
        },

        sporocila() {
            return this.messages
        },


        trenutnUser() {
            const u = this.frendi.find(u => u.chat == this.chatSelected)
            return u != null ? u : {ime: "Jaz", status: "Online"}

        },

        pridobiIme() {
            if(this.chatSelected == "") return "Jaz"
            return this.frendi.find(f => f.chat == this.chatSelected).ime
        }

    },


    setup() {

        
        
    },

    created() {
        console.log(store.state.user)
        if(store.state.token == null) {
            this.$router.push("/login")
            return
        }

        //Frend requesti
        this.pridobiProsnje()

        //Frendi
        this.pridobiFrende()

        if(this.chatSock == null) {
            this.chatSock = new WebSocket("ws://localhost:8080/api/chat?token=" + store.state.token)
            this.chatSock.onopen = () => {
                console.log("Connected to chat")

                let ids = this.frendi.map(f => f.id)
                console.log(ids)
                this.chatSock.send(JSON.stringify({type: "friendList", data: {friends: ids}}))
                
            }

            this.chatSock.onmessage = (msg) => {
                const data = JSON.parse(msg.data)
                console.log(data)
                if(data.type == "message") {
                    const messages = this.messages.find(m => m.uuid == data.chatUUID)
                    if(messages == null) {
                        this.messages.push({uuid: data.chatUUID, messages: data.messages})
                    } else {
                        messages.messages = data.messages
                    }
                } else if(data.type == "messageSent") {
                    const messages = this.messages.find(m => m.uuid == data.chatUUID)
                    if(messages == null) {
                        this.messages.push({uuid: data.chatUUID, messages: [{msg: data.message, id: data.userID, ura: data.time}]})
                    } else {
                        messages.messages.push({msg: data.message, id: data.userID, ura: "13:00"})
                    }
                } else if(data.type == "login") {
                    console.log(data)
                    const user = this.frendi.find(u => u.id == data.userID)
                    if(user != null) {
                        user.status = "Online"
                    }
                    console.log("login")
                } else if(data.type == "logout") {
                    const user = this.frendi.find(u => u.id == data.userID)
                    if(user != null) {
                        user.status = "Offline"
                    }
                    console.log("logout")

                } else if(data.type == "friendAccept") {
                 
                } else if(data.type == "friendDecline") {
                    const fRIndex = this.frendRequesti.findIndex((res) => res.id == data.friend)
                    this.frendRequesti.splice(fRIndex, 1)
                }
            }

            this.chatSock.onclose = () => {
                console.log("Disconnected from chat")
            }

        }
        


    }
}
</script>
<style>
    body {
     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
     overflow: hidden;
    }

   .name {
    font-weight: bolder;
   }

   .chat {
    overflow-y: auto;
    height: 83vh;
   }

   .vokn {
       
        background-color: rgb(224, 224, 224);
        left: 50px;
        
        border-radius: 5px;
        overflow: hidden;
   }

   .vokn > div {
    text-align: center;
    padding: 6px;
   
   }

   .vokn > div:hover {
    background-color: rgb(129, 128, 128);

   }

   .options {
    padding: 4px
   }

   .clicked {
    background-color: rgb(129, 128, 128);
   }

   .options:hover {
    background-color: rgb(197, 196, 196);
    cursor: pointer;
    border-radius: 3px;
   }




</style>