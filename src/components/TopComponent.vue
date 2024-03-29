<template>
    <div class="row w-100">
        <div class="col-5 border-end">
            <div class="d-flex justify-content-center border-bottom">
                <input type="text" placeholder="Išči" class="form-control w-75 my-3">
            </div>
        </div>
        <div class="col">
                <div class="d-flex flex-row border-bottom pb-2 p-3">
                    <div class="ms-3 fw-bold">
                        {{ frend.ime}}
                        <div>{{frend.status}}</div>
                    </div>
                    <button class="btn btn-success ms-auto h-25">Klic</button>
                    <button class="btn btn-info ms-2 h-25">Video Call</button>
                </div>
        </div>

    </div>
</template>
<style>

</style>
<script>
export default {
    props: {
        frend: Object
    }
}
</script>