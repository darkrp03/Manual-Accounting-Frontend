<template>
  <main>
    <div class="flex-holder">
      <Loading v-if="showLoadingAnimation" />
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
import Loading from '@/components/Loading.vue';
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
    LogoutButton,
    Loading
  },
  data() {
    return {
      visitors: [] as Visitor[],
      foundVisitors: [] as Visitor[],
      isVisibleForm: false,
      showLoadingAnimation: false,
      searchMode: false,
      myTimer: 0
    }
  },
  async created() {
    await this.getVisitors();
    await this.getLoginStatus();
  },
  methods: {
    async getLoginStatus() {
      this.myTimer = setInterval(async () => {
        const response = await fetch(import.meta.env.VITE_LOGIN_STATUS, {
          credentials: 'include'
        });

        if (response.status == 401) {
          router.push('/login');
          clearInterval(this.myTimer);
        } 
      }, 500000);
    },
    async logout() {
      await fetch(import.meta.env.VITE_LOGOUT, { credentials: 'include' });

      router.push('/login');
    },
    async getVisitors() {
      this.showLoadingAnimation = true;
      
      const response = await fetch(import.meta.env.VITE_GET_VISITORS, { credentials: "include" });
      const data = await response.json();

      data.forEach((element: any) => {
        const visitor: Visitor = element;

        this.visitors.push(visitor);
      });

      this.showLoadingAnimation = false;
    },
    async addVisitor(data: any) {
      const { visitorName, visitorSurname } = data;

      if (!visitorName || !visitorSurname) {
        return;
      }

      this.isVisibleForm = false;

      this.showLoadingAnimation = true;

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
      });

      this.showLoadingAnimation = false;
    },
    handleOpenForm() {
      this.isVisibleForm = true;
    },
    handleCloseForm() {
      this.isVisibleForm = false;
    },
    findVisitor(data: string) {
      const searchValue = data;

      if (searchValue == '') {
        this.searchMode = false;

        return;
      }

      this.searchMode = true;
      this.foundVisitors = this.visitors.filter(visitor => visitor.visitorName == searchValue || visitor.visitorSurname == searchValue); 
    }
  }
}
</script>

<style scoped>
@import "../assets/css/homeView.css";
</style>