<template>
  <div id="app">
    <header v-if="isAuthenticated">
      <h1>Sahihi Interior Builders</h1>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/users">Manage Users</router-link>
        <router-link to="/customers">Manage Customers</router-link>
        <router-link to="/leads">Manage Leads</router-link>
        <button @click="logout" class="logout-btn">Logout</button>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2024 Sahihi Interior Builders. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import {  computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    
    const isAuthenticated = computed(() => {
      return localStorage.getItem('token') !== null
    })

    const logout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    return {
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #35424a;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #2c3e50;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

main {
  flex: 1;
  padding: 2rem;
  background: #f4f6f9;
}

footer {
  background: #35424a;
  color: white;
  padding: 1rem;
  text-align: center;
}

.router-link-active {
  background-color: #2c3e50;
}
</style>
