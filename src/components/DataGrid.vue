<template>
    <div class="grid">
        <Loading v-if="showLoadingAnimation" />
        <div class="data">
            <div class="row">
                <div class="col col-header">Name</div>

                <div class="col col-header">Surname</div>
                <div class="col col-header">Entry time</div>
                <div class="col col-header">Actions</div>
            </div>
            <div v-for="visitor in myVisitors" :key="visitor.visitorId">
                <div class="row">
                    <div class="col">
                        {{ visitor.visitorName }}
                    </div>
                    <div class="col">
                        {{ visitor.visitorSurname }}
                    </div>
                    <div class="col">
                        {{ visitor.visitorEntryTime }}
                    </div>
                    <div class="col">
                        <div class="buttons">
                            <div class="edit-button">
                                <EditButton @click="handleOpenForm(visitor.visitorId)" />
                            </div>
                            <div class="delete-button">
                                <DeleteButton @click="deleteVisitor(visitor.visitorId)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <VisitorFormVue :visible="isVisibleForm" @data-updated="updateVisitor" @close="handleCloseForm" />
        </div>
    </div>
</template>

<script lang="ts">
import VisitorFormVue from './VisitorForm.vue';
import EditButton from './EditButton.vue';
import DeleteButton from './DeleteButton.vue';
import Loading from './Loading.vue';
import { Visitor } from '@/models/visitor';

export default {
    components: {
        EditButton,
        DeleteButton,
        VisitorFormVue,
        Loading
    },
    props: {
        visitors: Array<Visitor>
    },
    data() {
        return {
            myVisitors: this.visitors,
            isVisibleForm: false,
            showLoadingAnimation: false,
            visitorId: ''
        }
    },
    methods: {
        async updateVisitor(data: any) {
            const { visitorName, visitorSurname } = data;

            if (visitorName == '' && visitorSurname == '') {
                return;
            }

            this.isVisibleForm = false;

            this.showLoadingAnimation = true;

            const visitorIndex = this.myVisitors!.findIndex(visitor => visitor.visitorId == this.visitorId);
            const oldVisitorName = this.myVisitors![visitorIndex].visitorName;
            const oldVisitorSurname = this.myVisitors![visitorIndex].visitorSurname;

            const visitor: Visitor = {
                visitorId: this.visitorId,
            }

            if ((visitorName != '' && visitorName != oldVisitorName)) {
                visitor.visitorName = visitorName;
                this.myVisitors![visitorIndex].visitorName = visitorName;
            }

            if (visitorSurname != '' && visitorSurname != oldVisitorSurname) {
                visitor.visitorSurname = visitorSurname;
                this.myVisitors![visitorIndex].visitorSurname = visitorSurname;
            }

            await fetch(import.meta.env.VITE_UPDATE_VISITOR, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitor),
                credentials: "include"
            });

            this.showLoadingAnimation = false;
        },
        async deleteVisitor(id?: string) {
            this.showLoadingAnimation = true;

            this.myVisitors = this.visitors?.filter(visitor => visitor.visitorId != id);

            const deleteUserURL = `${import.meta.env.VITE_DELETE_VISITOR}`;
            await fetch(deleteUserURL, {
                method: 'POST',
                body: JSON.stringify({
                    visitorId: id
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            this.showLoadingAnimation = false;
        },
        handleOpenForm(visitorId?: string) {
            this.isVisibleForm = true;

            if (visitorId) {
                this.visitorId = visitorId;
            }
        },
        handleCloseForm() {
            this.isVisibleForm = false;

            this.visitorId = '';
        }
    }
}
</script>

<style scoped>
@import "../assets/css/dataGrid.css";
</style>