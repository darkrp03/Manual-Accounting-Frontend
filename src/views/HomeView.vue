<template>
  <main>
    <div class="flex-holder">
      <div v-if="searchMode" class="dataGrid-container">
        <DataGrid :visitors="foundVisitors" />
      </div>
      <div v-else class="dataGrid-container">
        <DataGrid :visitors="visitors" />
      </div>
      <div class="button-with-search">
        <div class="search-bar">
          <SearchBar @data-updated="findVisitor" />
        </div>
        <div class="add-button">
          <AddButton @click="handleOpenForm" />
        </div>
      </div>
      <div class="logout-button">
        <LogoutButton @click="logout" />
      </div>
      <VisitorForm :visible="isVisibleForm" @data-updated="addVisitor" @close="handleCloseForm" />
    </div>
  </main>
</template>

<script lang="ts">
import DataGrid from '../components/DataGrid.vue';
import AddButton from '../components/AddButton.vue';
import SearchBar from '../components/SearchBar.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import VisitorForm from '@/components/VisitorForm.vue';
import type { Visitor } from '@/models/visitor';
import { DateGenerator } from '@/models/date-generator';
import { v4 as uuidv4 } from 'uuid';
import router from '@/router';

export default {
  components: {
    DataGrid,
    AddButton,
    SearchBar,
    VisitorForm,
    LogoutButton
  },
  data() {
    return {
      visitors: [] as Visitor[],
      foundVisitors: [] as Visitor[],
      isVisibleForm: false,
      searchMode: false,
    }
  },
  async created() {
    await this.getVisitors();
  },
  methods: {
    handleOpenForm() {
      this.isVisibleForm = true;
    },
    handleCloseForm() {
      this.isVisibleForm = false;
    },
    async getVisitors() {
      const response = await fetch(import.meta.env.VITE_GET_VISITORS, { credentials: "include" });
      const data = await response.json();

      data.forEach((element: any) => {
        const visitor: Visitor = element;

        this.visitors.push(visitor);
      });
    },
    async addVisitor(data: any) {
      const { visitorName, visitorSurname } = data;

      if (!visitorName || !visitorSurname) {
        return;
      }

      this.isVisibleForm = false;

      const dateGenerator = new DateGenerator();

      const visitor: Visitor = {
        visitorId: uuidv4(),
        visitorName: visitorName,
        visitorSurname: visitorSurname,
        visitorEntryTime: dateGenerator.getDateWithTime()
      }

      this.visitors.push(visitor);

      await fetch(import.meta.env.VITE_ADD_VISITOR, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(visitor),
        credentials: "include"
      })
    },
    findVisitor(data: string) {
      const searchValue = data;

      if (searchValue == '') {
        this.searchMode = false;

        return;
      }

      this.searchMode = true;
      this.foundVisitors = this.visitors.filter(visitor => visitor.visitorName == searchValue || visitor.visitorSurname == searchValue); 
    },
    async logout() {
      await fetch(import.meta.env.VITE_LOGOUT, { credentials: 'include' });

      router.push({path: '/login'});
    }
  }
}
</script>

<style scoped>
@import "../assets/css/homeView.css";
</style>