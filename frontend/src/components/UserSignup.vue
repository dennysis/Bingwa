<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Create Account</h2>
      
      <form @submit.prevent="handleSignup" class="signup-form">
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
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password" 
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
          >
            <option value="Engineer">Engineer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit" class="submit-btn">Sign Up</button>
      </form>

      <div class="auth-links">
        <router-link to="/login">Already have an account? Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

export default {
  name: 'UserSignup',
  setup() {
    const router = useRouter()
    const formData = ref({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      kra_pin: '',
      role: 'Engineer'
    })

    const handleSignup = async () => {
      try {
        await api.register(formData.value)
        router.push('/login')
      } catch (error) {
        console.error('Signup failed:', error)
      }
    }

    return {
      formData,
      handleSignup
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e6e9ef;
  font-family: Arial, sans-serif;
}

.signup-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #4a4a4a;
  text-align: center;
  font-weight: 700;
}

.signup-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #333;
}

input, select {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, select:focus {
  outline: none;
  border-color: #1e90ff;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.25rem;
}

.submit-btn:hover {
  background-color: #1c7ed6;
}

.auth-links {
  margin-top: 1rem;
  text-align: center;
}

.auth-links a {
  color: #1e90ff;
  text-decoration: none;
  font-weight: 500;
}

.auth-links a:hover {
  text-decoration: underline;
}
</style>
