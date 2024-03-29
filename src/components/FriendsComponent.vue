<template>
                <div class="chat d-flex flex-column">
                    <div>
                        <div class="border-bottom p-1">Prijatelji</div>
                        <a href="#" class="list-group p-2" v-for="frend in frendi" :key="frend.id" @click="$emit('select', frend.chat)">
                    
                            <div class="d-flex flex-row">
                                <div class="ms-3">
                                    {{ frend.ime }}
                                <div class="small"><span class="fas fa-circle chat-online"></span> {{frend.status}}</div>
                            </div>
                            <div class="ms-auto d-flex align-items-end flex-column position-relative">
                                <div>{{frend.lastSeen}}</div>
                                <font-awesome-icon :icon="['fas', 'ellipsis']" class="options" @click="" />
                                <div class="vokn bg-light">
                                    <div :id="frend.id" @click="$emit('odstraniFrenda', $event)" class="text-danger">
                                        Odstrani {{ frend.ime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </a>
                    </div>
                    <div>
                        <div class="border-bottom p-1">Prošnje za prijateljstvo</div>
                        <a href="#" class="list-group p-2" v-for="frend in frendRequesti">
                            <div class="d-flex flex-row align-items-center">
                                <div class="ms-3">
                                    {{ frend.user }}
                                    
                                </div>
                                <div class="ms-auto btn-group">
                                    <button type="button" @click="$emit('sprejmiProsnjo', $event)" :id="frend.id" class="btn btn-success">Sprejmi</button>
                                    <button type="button" :id="frend.id" @click="$emit('zavrni-prosnjo',$event)" class="btn btn-secondary">Odstrani</button>
                                </div>
                            </div>
                        </a>
                    </div>
        
                </div>
</template>
<script>
export default {
	props: {
		frendi: Array,
		frendRequesti: Array,
		selected: Number
	},
	emits: ['sprejmi-prosnjo', 'zavrni-prosnjo', 'odstrani-frenda']
}
</script>