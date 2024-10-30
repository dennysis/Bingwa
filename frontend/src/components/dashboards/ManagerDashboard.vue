<template>
  <div class="manager-dashboard">
    <header class="dashboard-header">
      <h1>Project Manager Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userName }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="quick-stats">
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p>{{ stats.activeProjects }}</p>
        </div>
        <div class="stat-card">
          <h3>Team Members</h3>
          <p>{{ stats.teamMembers }}</p>
        </div>
        <div class="stat-card">
          <h3>Assigned Customers</h3>
          <p>{{ stats.customers }}</p>
        </div>
        <div class="stat-card">
          <h3>Pending Tasks</h3>
          <p>{{ stats.tasks }}</p>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/projects" class="action-btn">View Projects</router-link>
        <router-link to="/team" class="action-btn">Manage Team</router-link>
        <router-link to="/customers" class="action-btn">View Customers</router-link>
        <router-link to="/tasks" class="action-btn">Manage Tasks</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api'

export default {
  name: 'ManagerDashboard',
  setup() {
    const router = useRouter()
    const userName = ref('')
    const stats = ref({
      activeProjects: 0,
      teamMembers: 0,
      customers: 0,
      tasks: 0
    })

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      router.push('/login')
    }

    onMounted(async () => {
      try {
        const customers = await api.getCustomers()
        stats.value.customers = customers.data.length
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
/* Same styles as AdminDashboard */
</style>
