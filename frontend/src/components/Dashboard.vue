<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ userName }} ({{ userRole }})</span>
      </div>
    </header>

    <div class="dashboard-content">
      <!-- Stats Section -->
      <div class="quick-stats">
        <!-- Admin Stats -->
        <div v-if="userRole === 'Admin'" class="stat-card">
          <h3>Total Users</h3>
          <p>{{ stats.users }}</p>
        </div>
        
        <!-- Common Stats -->
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p>{{ stats.projects }}</p>
        </div>
        
        <div v-if="userRole !== 'Engineer'" class="stat-card">
          <h3>Customers</h3>
          <p>{{ stats.customers }}</p>
        </div>
        
        <div v-if="userRole !== 'Engineer'" class="stat-card">
          <h3>Leads</h3>
          <p>{{ stats.leads }}</p>
        </div>
        
        <div v-if="userRole === 'Engineer'" class="stat-card">
          <h3>My Tasks</h3>
          <p>{{ stats.tasks }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-grid">
        <!-- Admin Actions -->
        <div v-if="userRole === 'Admin'" class="action-section">
          <h2>Administration</h2>
          <div class="action-buttons">
            <router-link to="/users" class="action-btn">Manage Users</router-link>
            <router-link to="/settings" class="action-btn">System Settings</router-link>
          </div>
        </div>

        <!-- Project Management -->
        <div v-if="userRole !== 'Engineer'" class="action-section">
          <h2>Projects & Customers</h2>
          <div class="action-buttons">
            <router-link to="/projects" class="action-btn">Manage Projects</router-link>
            <router-link to="/customers" class="action-btn">Manage Customers</router-link>
            <router-link to="/leads" class="action-btn">Manage Leads</router-link>
          </div>
        </div>

        <!-- Engineer Actions -->
        <div v-if="userRole === 'Engineer'" class="action-section">
          <h2>My Work</h2>
          <div class="action-buttons">
            <router-link to="/my-projects" class="action-btn">My Projects</router-link>
            <router-link to="/my-tasks" class="action-btn">My Tasks</router-link>
            <router-link to="/submit-update" class="action-btn">Submit Update</router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <span class="activity-time">{{ activity.time }}</span>
            <span class="activity-description">{{ activity.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { api } from '../api'

export default {
  name: 'MainDashboard',
  setup() {
    const stats = ref({
      users: 0,
      projects: 0,
      customers: 0,
      leads: 0,
      tasks: 0
    })

    const recentActivities = ref([])
    const userName = ref('')
    const userRole = computed(() => localStorage.getItem('userRole'))

    const updateDashboardStats = (responses) => {
      if (userRole.value === 'Admin') {
        stats.value.users = responses[0].length;
        stats.value.projects = responses[1].length;
        stats.value.customers = responses[2].length;
        stats.value.leads = responses[3].length;
        stats.value.tasks = responses[4].length;
      } else if (userRole.value === 'Project Manager') {
        stats.value.projects = responses[0].length;
        stats.value.customers = responses[1].length;
        stats.value.leads = responses[2].length;
      } else {
        stats.value.projects = responses[0].length; // Only assigned projects
      }
    }

    const fetchDashboardData = async () => {
      try {
        const promises = [];
        if (userRole.value === 'Admin') {
          promises.push(
            api.getUsers(),
            api.getProjects(),
            api.getCustomers(),
            api.getLeads(),
            api.getInteractions()
          );
        } else if (userRole.value === 'Project Manager') {
          promises.push(
            api.getProjects(),
            api.getCustomers(),
            api.getLeads()
          );
        } else {
          promises.push(api.getProjects());
        }

        const responses = await Promise.all(promises);
        updateDashboardStats(responses);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    onMounted(fetchDashboardData)

    return {
      stats,
      recentActivities,
      userName,
      userRole
    }
  }
}
</script>
<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.action-grid {
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
}

.action-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.action-btn {
  background: #1a237e;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background: #283593;
}

.recent-activity {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.activity-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 20px;
}

.activity-time {
  color: #666;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .quick-stats {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
