<template>
  <AdminLayout>
    <Breadcrumb :pageTitle="currentPageTitle" />
    <Card title="Atualizar Usuário">
    </Card>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from "../../components/layout/AdminLayout.vue";
import Breadcrumb from "../../components/common/Breadcrumb.vue";
import Card from "../../components/common/Card.vue";

const currentPageTitle = ref('Usuários do Sistema')
</script>
