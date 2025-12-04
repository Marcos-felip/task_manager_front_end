<template>
  <Table :Headers="headers" :Body="body" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Table from '../../components/common/Table.vue'
import { getUsers } from '../../services/accounts/users'
import type { UserResponse } from '../../types/accounts/users'
import type { TableHeader, TableRowData } from '../../types/components/common/table'

const headers = ref<TableHeader[]>([
  {
    name: 'Nome',
    role: 'Função',
    status: 'Status'
  },
])

const body = ref<TableRowData[]>([])

const loadUsers = async () => {
  try {
    const response = await getUsers()
    console.log('Usuários carregados:', response)

    body.value = response.map((user: UserResponse) => {

      return {
        name: user.first_name + ' ' + user.last_name || user.email,
        role: user.role,
        status: user.status ? 'Ativo' : 'Inativo',
        actions: [
          {
            label: 'Editar',
            to: `/accounts/update/${user.id}`,
          },
          {
            label: 'Excluir',
            onClick: () => {
              console.log(`Excluir usuário ${user.id}`)
            }
          }
        ],
      }
    })
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  }
}

onMounted(() => {
  loadUsers()
})
</script>
