<template>
  <div class="engineer-dashboard">
    <header class="dashboard-header">
      <h1>Engineer Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userName }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="quick-stats">
        <div class="stat-card">
          <h3>Assigned Projects</h3>
          <p>{{ stats.assignedProjects }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Tasks</h3>
          <p>{{ stats.activeTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Completed Tasks</h3>
          <p>{{ stats.completedTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Project Updates</h3>
          <p>{{ stats.updates }}</p>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/my-projects" class="action-btn">My Projects</router-link>
        <router-link to="/my-tasks" class="action-btn">My Tasks</router-link>
        <router-link to="/updates" class="action-btn">Submit Updates</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'EngineerDashboard',
  setup() {
    const router = useRouter()
    const userName = ref('')
    const stats = ref({
      assignedProjects: 0,
      activeTasks: 0,
      completedTasks: 0,
      updates: 0
    })

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      router.push('/login')
    }

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
