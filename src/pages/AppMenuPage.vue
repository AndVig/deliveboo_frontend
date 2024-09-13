<script>
export default {
    name: 'AppMenuPage',
};
</script>

<template>
    <h1>menu</h1>
    <div>
        <div class="row">
            <div class="col-4 py-3" v-for="restaurants in response.results?.data">
                <ListProject :title="project.title" :slug="project.slug" :description="project.description" />
            </div>
            <nav class="d-flex justify-content-around">
                <div class="btn btn-primary" @click="prevPage" v-if="response.results?.prev_page_url">Prev</div>
                <div class="btn btn-primary" @click="nextPage" v-if="response.results?.next_page_url">Next</div>
            </nav>
        </div>
    </div>
</template>

<style></style>