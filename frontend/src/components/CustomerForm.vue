<template>
  <div class="customer-form-container">
    <h2>{{ isEditing ? 'Edit Customer' : 'Add New Customer' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="customer-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
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
        <label for="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone"
        >
      </div>

      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input 
          type="text" 
          id="companyName" 
          v-model="formData.companyName"
        >
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <textarea 
          id="address" 
          v-model="formData.address"
          rows="3"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ isEditing ? 'Update' : 'Create' }} Customer
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
  name: 'CustomerForm',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isEditing = ref(false)

    const formData = ref({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      address: ''
    })

    const fetchCustomer = async (id) => {
      try {
        const response = await api.getCustomerById(id)
        formData.value = response.data
      } catch (error) {
        console.error('Error fetching customer:', error)
      }
    }

    const handleSubmit = async () => {
      try {
        if (isEditing.value) {
          await api.updateCustomer(route.params.id, formData.value)
        } else {
          await api.createCustomer(formData.value)
        }
        router.push('/customers')
      } catch (error) {
        console.error('Error saving customer:', error)
      }
    }

    const handleCancel = () => {
      router.push('/customers')
    }

    onMounted(() => {
      if (route.params.id) {
        isEditing.value = true
        fetchCustomer(route.params.id)
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
.customer-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.customer-form {
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

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

textarea {
  resize: vertical;
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
