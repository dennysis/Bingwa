<template>
  <div class="admin-dashboard">
    <header class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userName }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="quick-stats">
        <div class="stat-card">
          <h3>Total Users</h3>
          <p>{{ stats.users }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Customers</h3>
          <p>{{ stats.customers }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p>{{ stats.projects }}</p>
        </div>
        <div class="stat-card">
          <h3>New Leads</h3>
          <p>{{ stats.leads }}</p>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/users" class="action-btn">Manage Users</router-link>
        <router-link to="/customers" class="action-btn">Manage Customers</router-link>
        <router-link to="/projects" class="action-btn">Manage Projects</router-link>
        <router-link to="/leads" class="action-btn">Manage Leads</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    const userName = ref('')
    const stats = ref({
      users: 0,
      customers: 0,
      projects: 0,
      leads: 0
    })

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      router.push('/login')
    }

    onMounted(async () => {
      try {
        const [users, customers, leads] = await Promise.all([
          api.getUsers(),
          api.getCustomers(),
          api.getLeads()
        ])
        
        stats.value = {
          users: users.data.length,
          customers: customers.data.length,
          projects: 0, // Add when project endpoint is available
          leads: leads.data.length
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    })

    return {
      userName,
      stats,
      logout
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.action-btn {
  background: #0077cc;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background: #005fa3;
}
</style>
