<script setup>

</script>

<template>
<div id="sidebar">
    <div id="user">

        
        <div class="placehold">
            <div >User: {{ user }}</div>
            <div>Status: Online</div>
        </div>
        <div class="setting">
            <div class="setting-obj"><font-awesome-icon :icon="['fas', 'gear']" /></div>
            <div class="setting-obj" @click="odjava"><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /></div>
        </div>
        
    </div>
    
    <div class="search">
        <input type="text" class="form-control" placeholder="išci prijatelja">
    </div>
    <div id="friendlist">
        <div class="friend">
            <div class="icon"><font-awesome-icon :icon="['fas', 'user']" /></div>
            <div class="name">
                <div>Test</div>
                <div class="message">test mesg</div>
            </div>

            <div class="last-seen">12:00</div>
        </div>
        <div class="friend">
            <div class="icon"><font-awesome-icon :icon="['fas', 'user']" /></div>
            <div class="name">
                <div>Test</div>
                <div class="message">test mesg</div>
            </div>

            <div class="last-seen">12:00</div>
        </div>
        <div class="friend">
            <div class="icon"><font-awesome-icon :icon="['fas', 'user']" /></div>
            <div class="name">
                <div>Test</div>
                <div class="message">test mesg</div>
            </div>

            <div class="last-seen">12:00</div>
        </div>
        <div class="friend">
            <div class="icon"><font-awesome-icon :icon="['fas', 'user']" /></div>
            <div class="name">
                <div>Test</div>
                <div class="message">test mesg</div>
            </div>

            <div class="last-seen">12:00</div>
        </div>
    </div>
</div>
<div >

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
    #sidebar {
      background-color: rgb(241, 238, 238);
      font-size: 1.9em;
      display: inline-block;
      position: fixed;
     
      height: 100%;
      width: 250px;

    }
    #main {
        display: inline-block;
        width: 60%;
        background-color: aliceblue;

    }
    #odjava {
       cursor: pointer;
       margin-left: auto;
    }

    #friendlist {
        border: 1px solid rgb(177, 177, 177);
        height: 100%;
        padding: 5px;
    }

    .friend {
        border: 1px solid rgb(187, 178, 178);
        margin: 4px;
        border-radius: 6px;
        display: flex;
    }

    .friend:hover {
        cursor: pointer;
        background-color: aliceblue;
    }

    .friend > .name {
        display: inline-block;
        font-size: 0.8em;
    }

    .friend .message {
        font-size: 0.7em;
        align-self: flex-end;
        color: rgb(161, 156, 156);
    }


    #user {
        display: flex;
        width: 100%;
        justify-content: space-between;

    }

    .last-seen {
        font-size: 0.5em;
        color: rgb(177, 175, 175);
        padding: 3px;
        margin-left: auto;
    }

    .icon {
        padding: 10px;
    }

    .placehold {
        font-size: 0.8em;
    }

    .setting {
        padding-right: 15px;
    }

    .setting-obj {
        padding: 4px;
    }


</style>