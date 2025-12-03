<script setup lang="ts">
import { useSidebarProvider } from './composables/useSidebar'

useSidebarProvider()
</script>

<template>
  <router-view />
</template>

<style scoped></style>
