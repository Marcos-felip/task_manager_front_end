<template>
  <AdminLayout>
    <Breadcrumb :pageTitle="currentPageTitle" />
    <form @submit.prevent="handleSubmit">
      <div class="space-y-5 sm:space-y-6">
        <Card title="Criar Usuário">
          <!-- Full Name -->
          <FormField label="Nome Completo" id="full_name" name="full_name" type="text"
            placeholder="Digite o nome completo" required v-model="fullName" />
          <!-- Role -->
          <SelectInput label="Função do Usuário" :options="[
            { value: 'owner', label: 'Conta Principal' },
            { value: 'manager', label: 'Administrador do Sistema' },
            { value: 'member', label: 'Membro' }
          ]" required v-model="userRole" />
          <!-- Email -->
          <FormField label="Email" id="email" name="email" type="email" placeholder="Digite seu email" required
            v-model="email" />
          <!-- Password -->
          <PasswordField label="Senha" id="password" name="password" placeholder="Digite sua senha" required
            v-model="password" />
          <!-- Button -->
          <div class="flex justify-start">
            <Button type="submit" variant="primary" size="sm">
              Criar Usuário
            </Button>
          </div>
        </Card>
      </div>
    </form>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from "../../components/layout/AdminLayout.vue";
import Breadcrumb from "../../components/common/Breadcrumb.vue";
import Card from "../../components/common/Card.vue";
import FormField from '../../components/ui/FormField.vue'
import PasswordField from '../../components/ui/PasswordField.vue'
import Button from '../../components/ui/Button.vue'
import SelectInput from '../../components/ui/SelectInput.vue'
import { createUser } from '../../services/accounts/users'

const router = useRouter()

const currentPageTitle = ref('Usuários do Sistema')

const fullName = ref('')
const email = ref('')
const password = ref('')
const userRole = ref('')

const organizationKey = localStorage.getItem('organization_key')

const handleSubmit = () => {
  try {
    const response = createUser({
      full_name: fullName.value,
      email: email.value,
      password: password.value,
      role: userRole.value,
      organization_key: organizationKey || ''
    })
    console.log('Usuário criado com sucesso:', response)
    router.push({
      name: 'ListUser'
    })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
  }
}

defineExpose({
  fullName,
  email,
  password,
  userRole,
  handleSubmit,
})
</script>
