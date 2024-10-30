<template>
  <div class="landing-container">
    <h1>Welcome to CRM System</h1>
    <div v-if="!isAuthenticated" class="auth-buttons">
      <router-link to="/login" class="btn btn-login">Login</router-link>
      <router-link to="/signup" class="btn btn-signup">Sign Up</router-link>
    </div>
    <div v-else class="dashboard-link">
      <router-link to="/dashboard" class="btn btn-dashboard">Go to Dashboard</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>
.landing-container {
  text-align: center;
  padding: 50px;
}

.auth-buttons, .dashboard-link {
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-login {
  background-color: #4CAF50;
  color: white;
}

.btn-signup {
  background-color: #2196F3;
  color: white;
}

.btn-dashboard {
  background-color: #FF9800;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
