<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="auth-header">
        <h2>{{ currentView === 'login' ? 'Login' : currentView === 'signup' ? 'Sign Up' : 'Reset Password' }}</h2>
      </div>

      <!-- Login Form -->
      <form v-if="currentView === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="loginForm.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="loginForm.password" required>
        </div>
        <button type="submit" class="submit-btn">Login</button>
      </form>

      <!-- Sign Up Form -->
      <form v-if="currentView === 'signup'" @submit.prevent="handleSignup" class="auth-form">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="signupForm.first_name" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="signupForm.last_name" required>
        </div>
        <div class="form-group">
          <label for="signupEmail">Email</label>
          <input type="email" id="signupEmail" v-model="signupForm.email" required>
        </div>
        <div class="form-group">
          <label for="signupPassword">Password</label>
          <input type="password" id="signupPassword" v-model="signupForm.password" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="text" id="phone" v-model="signupForm.phone_number">
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="signupForm.address">
        </div>
        <div class="form-group">
          <label for="kra">KRA PIN</label>
          <input type="text" id="kra" v-model="signupForm.kra_pin">
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="signupForm.role">
            <option value="Admin">Admin</option>
            <option value="Engineer">Engineer</option>
            <option value="Project Manager">Project Manager</option>
          </select>
        </div>
        <button type="submit" class="submit-btn">Sign Up</button>
      </form>

      <!-- Reset Password Form -->
      <form v-if="currentView === 'reset'" @submit.prevent="handleResetPassword" class="auth-form">
        <div class="form-group">
          <label for="resetEmail">Email</label>
          <input type="email" id="resetEmail" v-model="resetForm.email" required>
        </div>
        <button type="submit" class="submit-btn">Reset Password</button>
      </form>

      <div class="auth-links">
        <a v-if="currentView !== 'login'" @click="currentView = 'login'" href="#">Back to Login</a>
        <a v-if="currentView === 'login'" @click="currentView = 'signup'" href="#">Create Account</a>
        <a v-if="currentView === 'login'" @click="currentView = 'reset'" href="#">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

export default {
  name: 'UserLogin',
  setup() {
    const router = useRouter()
    const currentView = ref('login')
    
    const loginForm = ref({
      email: '',
      password: ''
    })

    const signupForm = ref({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      kra_pin: '',
      role: 'Engineer'
    })

    const resetForm = ref({
      email: ''
    })
const handleLogin = async () => {
  try {
    const response = await api.login(loginForm.value)
    localStorage.setItem('token', response.data.token)
    const profile = await api.getProfile()
    localStorage.setItem('userRole', profile.data.role)
    localStorage.setItem('userName', profile.data.name)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}


const handleSignup = async () => {
  try {
    await api.register(signupForm.value)
    currentView.value = 'login'
    router.push('/') 
  } catch (error) {
    console.error('Signup failed:', error)
  }
}


    const handleResetPassword = async () => {
      try {
        await api.changePassword(resetForm.value)
        currentView.value = 'login'
      } catch (error) {
        console.error('Password reset failed:', error)
      }
    }

    return {
      currentView,
      loginForm,
      signupForm,
      resetForm,
      handleLogin,
      handleSignup,
      handleResetPassword
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
}

.auth-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.auth-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.auth-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #0077cc;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem;
  background-color: #0077cc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #005fa3;
}

.auth-links {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #0077cc;
}

.auth-links a {
  color: #0077cc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.auth-links a:hover {
  color: #005fa3;
  text-decoration: underline;
}
</style>
