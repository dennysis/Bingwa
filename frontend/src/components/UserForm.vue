<template>
  <div class="user-form-container">
    <h2>{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input 
          type="text" 
          id="firstName" 
          v-model="formData.first_name" 
          required
        >
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input 
          type="text" 
          id="lastName" 
          v-model="formData.last_name" 
          required
        >
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          required
        >
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone_number"
        >
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input 
          type="text" 
          id="address" 
          v-model="formData.address"
        >
      </div>

      <div class="form-group">
        <label for="kra">KRA PIN</label>
        <input 
          type="text" 
          id="kra" 
          v-model="formData.kra_pin"
        >
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select 
          id="role" 
          v-model="formData.role" 
          required
        >
          <option value="Admin">Admin</option>
          <option value="Engineer">Engineer</option>
          <option value="Project Manager">Project Manager</option>
        </select>
      </div>

      <div class="form-group" v-if="!isEditing">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="formData.password" 
          required
        >
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ isEditing ? 'Update' : 'Create' }} User
        </button>
        <button type="button" @click="handleCancel" class="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'

export default {
  name: 'UserForm',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isEditing = ref(false)

    const formData = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      kra_pin: '',
      role: 'Engineer',
      password: ''
    })

 const fetchUser = async (id) => {
      try {
        const response = await api.getUserById(id)
        formData.value = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    const handleSubmit = async () => {
      try {
        if (isEditing.value) {
          await api.updateUser(route.params.id, formData.value)
        } else {
          await api.createUser(formData.value)
        }
        router.push('/users')
      } catch (error) {
        console.error('Error saving user:', error)
      }
    }

    const handleCancel = () => {
      router.push('/users')
    }

    onMounted(() => {
      if (route.params.id) {
        isEditing.value = true
        fetchUser(route.params.id)
      }
    })

    return {
      isEditing,
      formData,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style scoped>
.user-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover, .cancel-btn:hover {
  opacity: 0.9;
}
</style>
