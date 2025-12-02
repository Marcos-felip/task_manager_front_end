<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-5">
      <!-- Email -->
      <FormField label="Email" id="email" name="email" type="email" placeholder="email@gmail.com" required
        v-model="email" />
      <!-- Password -->
      <PasswordField label="Password" id="password" name="password" placeholder="Digite sua senha" required
        v-model="password" />
      <!-- Checkbox -->
      <div class="flex items-center justify-between">
        <CheckboxField id="keepLoggedIn" name="keepLoggedIn" v-model="keepLoggedIn">
          Manter-me conectado
        </CheckboxField>
        <router-link to="/reset-password" class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
          Esqueceu sua senha?
        </router-link>
      </div>
      <!-- Button -->
      <div>
        <Button type="submit" variant="primary" size="sm" className="w-full" :disabled="isLoading">
          <!-- Spinner -->
          <div v-if="isLoading" class="flex items-center gap-2">
            <Spinners size="sm" color="white" />
            Entrando...
          </div>
          <span v-else>Entrar</span>
        </Button>
      </div>
    </div>
    <!-- Modal de Erro -->
    <ModalAlert :isOpen="showModal" variant="error" title="Erro ao entrar"
      message="Por favor, verifique suas credenciais e tente novamente." buttonText="Fechar"
      @confirm="showModal = false" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '@/components/ui/FormField.vue'
import PasswordField from '@/components/ui/PasswordField.vue'
import CheckboxField from '@/components/ui/CheckboxField.vue'
import Button from '@/components/ui/Button.vue'
import Spinners from '@/components/ui/Spinners.vue'
import ModalAlert from '@/components/ui/ModalAlert.vue'
import { authUser } from '@/services/auth/authService'

const router = useRouter()

const email = ref('')
const password = ref('')
const keepLoggedIn = ref(false)
const isLoading = ref(false)
const showModal = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    const response = await authUser({
      email: email.value,
      password: password.value,
    })
    console.log('Login realizado com sucesso', response)

    localStorage.setItem('access_token', response.access_token)
    localStorage.setItem('refresh_token', response.refresh_token)

    router.push({
      name: 'Home',
    })
  } catch (error) {
    console.error('Falha no login', error)
    showModal.value = true
  } finally {
    isLoading.value = false

  }
}

defineExpose({
  email,
  password,
  keepLoggedIn,
  handleSubmit,
})
</script>
