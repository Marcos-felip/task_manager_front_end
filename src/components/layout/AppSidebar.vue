<template>
  <aside :class="[
    'fixed top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out border-r border-gray-200',
    {
      'w-[290px]': isExpanded || isHovered,
      'w-[90px]': !isExpanded && !isHovered,
    },
  ]" @mouseenter="!isExpanded && (isHovered = true)" @mouseleave="isHovered = false">
    <div :class="[
      'py-8 flex',
      !isExpanded && !isHovered ? 'justify-center' : 'justify-start',
    ]">
      <router-link to="/">
        <img v-if="isExpanded || isHovered" class="dark:hidden" src="/images/logo/logo.svg" alt="Logo"
          width="150" height="40" />
        <img v-if="isExpanded || isHovered" class="hidden dark:block" src="/images/logo/logo-dark.svg"
          alt="Logo" width="150" height="40" />
        <img v-else src="/images/logo/logo-icon.svg" alt="Logo" width="32" height="32" />
      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div>
            <ul class="flex flex-col gap-4">
              <li>
                <router-link to="/" :class="[
                  'menu-item group',
                  {
                    'menu-item-active': isActive('/'),
                    'menu-item-inactive': !isActive('/'),
                  },
                ]">
                  <span :class="[
                    isActive('/')
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive',
                  ]">
                    <GridIcon />
                  </span>
                  <span v-if="isExpanded || isHovered" class="menu-item-text">Painel</span>
                </router-link>
              </li>
              <li>
                <router-link to="#" :class="[
                  'menu-item group',
                  {
                    'menu-item-active': isActive('/profile'),
                    'menu-item-inactive': !isActive('/profile'),
                  },
                ]">
                  <span :class="[
                    isActive('/profile')
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive',
                  ]">
                    <UserCircleIcon />
                  </span>
                  <span v-if="isExpanded || isHovered" class="menu-item-text">Usuários do Sistema</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import {
  GridIcon,
  UserCircleIcon,
} from "../../icons";
import { useSidebar } from "../../composables/useSidebar";

const route = useRoute();

const { isExpanded, isHovered } = useSidebar();

const isActive = (path: string) => route.path === path;
</script>
