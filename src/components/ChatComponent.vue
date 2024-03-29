<template>
                <div class="chat p-3 d-flex flex-column-reverse" id="cht"> 
                    <div v-for="m in messages">
                        <div v-if="selected == m.uuid">
                            <div v-for="sporocil in m.messages">
                                <div v-if="sporocil.id != userId">
                                    <div class="d-flex my-3">
                                        <div>
                                            <div class="fs-6 text-body-tertiary">
                                                {{sporocil.ura}}
                                            </div>
                                        </div>
                                        <div class="bg-body-secondary mx-2 p-2 rounded">
                                            <div class="name">{{ ime }}</div>
                                            <div>{{ sporocil.msg }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="d-flex my-3 flex-row-reverse">
                                        <div>
                                            <div class="fs-6 text-body-tertiary">
                                                {{sporocil.ura}}
                                            </div>
                                        </div>
                                        <div class="bg-primary-subtle mx-2 p-2 rounded">
                                            <div class="name">Jaz</div>
                                            <div>{{ sporocil.msg }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

</template>
<script>
export default {
    props: {
        messages: Object,
        selected: String,
        ime: String,
        userId: Number
    }
}
</script>