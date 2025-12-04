<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr v-for="(header, index) in Headers" :key="index" class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                {{ header.name }}
              </p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ header.role }}</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ header.status }}</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Ações
              </p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(body, index) in Body" :key="index" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <span
                    class="flex items-center justify-center w-full h-full text-sm font-medium text-gray-500 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                    {{ body.name.charAt(0) }}
                  </span>
                </div>
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ body.name }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex -space-x-2">
                <span
                  class="inline-block rounded-full bg-gray-100 px-3 py-1 text-theme-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  {{ body.role }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span :class="[
                'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                {
                  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                    body.status === 'Active',
                  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                    body.status === 'Pending',
                  'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                    body.status === 'Cancel',
                },
              ]">
                {{ body.status }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-2">
                <template v-for="(action, idx) in body.actions" :key="idx">
                  <!-- Router Link Button -->
                  <router-link v-if="action.to" :to="action.to" class="inline-block">
                    <Button variant="outline" size="sm">
                      {{ action.label }}
                    </Button>
                  </router-link>

                  <!-- Function Button -->
                  <Button v-else-if="action.onClick" variant="outline" size="sm" :onClick="action.onClick">
                    {{ action.label }}
                  </Button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue'
import type { TableHeader, TableRowData } from '../../types/components/common/table'

interface Props {
  Headers: TableHeader[]
  Body: TableRowData[]
}

defineProps<Props>()
</script>
