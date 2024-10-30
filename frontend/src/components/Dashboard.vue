<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ user?.first_name }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </header>

    <nav class="dashboard-nav">
      <router-link to="/customers" class="nav-item">
        <span class="nav-count">{{ customerCount }}</span>
        Customers
      </router-link>
      <router-link to="/users" class="nav-item">
        <span class="nav-count">{{ userCount }}</span>
        Users
      </router-link>
      <router-link to="/leads" class="nav-item">
        <span class="nav-count">{{ leadCount }}</span>
        Leads
      </router-link>
    </nav>

    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Customers</h3>
          <p>{{ customerCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Users</h3>
          <p>{{ userCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Leads</h3>
          <p>{{ leadCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

export default {
  name: 'DashboardView',
  setup() {
    const router = useRouter()
    const user = ref(null)
    const customerCount = ref(0)
    const userCount = ref(0)
    const leadCount = ref(0)

    const fetchDashboardData = async () => {
      try {
        const [customers, users, leads] = await Promise.all([
          api.getCustomers(),
          api.getUsers(),
          api.getLeads()
        ])
        
        customerCount.value = customers.data.length
        userCount.value = users.data.length
        leadCount.value = leads.data.length
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    const handleLogout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      user,
      customerCount,
      userCount,
      leadCount,
      handleLogout
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #f8f9fa;
}

.nav-count {
  background-color: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #666;
}

.stat-card p {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}
</style>
