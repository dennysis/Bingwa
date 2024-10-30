<template>
  <div id="app">
    <header v-if="isAuthenticated">
      <div class="header-content">
        <div class="brand">
          <h1>Sahihi Interior Builders</h1>
        </div>
        
        <nav class="main-nav">
          <template v-if="userRole === 'Admin'">
            <router-link to="/admin-dashboard">Dashboard</router-link>
            <router-link to="/users">Users</router-link>
            <router-link to="/customers">Customers</router-link>
            <router-link to="/leads">Leads</router-link>
            <router-link to="/projects">Projects</router-link>
          </template>

          <template v-else-if="userRole === 'Project Manager'">
            <router-link to="/manager-dashboard">Dashboard</router-link>
            <router-link to="/projects">Projects</router-link>
            <router-link to="/customers">Customers</router-link>
            <router-link to="/leads">Leads</router-link>
          </template>

          <template v-else-if="userRole === 'Engineer'">
            <router-link to="/engineer-dashboard">Dashboard</router-link>
            <router-link to="/my-projects">My Projects</router-link>
            <router-link to="/my-tasks">My Tasks</router-link>
          </template>

          <button @click="logout" class="logout-btn">Logout</button>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="footer-content">
        <p>© 2024 Sahihi Interior Builders. All rights reserved.</p>
        <div class="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    
    const isAuthenticated = computed(() => {
      return localStorage.getItem('token') !== null
    })

    const userRole = computed(() => {
      return localStorage.getItem('userRole')
    })

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      router.push('/login')
    }

    return {
      isAuthenticated,
      userRole,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #1a237e;
  color: white;
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand h1 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #b71c1c;
}

main {
  flex: 1;
  background: #f5f5f5;
  padding: 2rem;
}

footer {
  background: #1a237e;
  color: white;
  padding: 1.5rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 1rem 0;
  }

  .main-nav {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
