<template>
  <div class="project-list">
    <div class="header-actions">
      <h2>Projects</h2>
      <button v-if="canCreateProject" @click="openCreateModal">New Project</button>
    </div>
    
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-actions">
          <button @click="viewProject(project.id)">View</button>
          <button v-if="canEditProject" @click="editProject(project.id)">Edit</button>
          <button v-if="canDeleteProject" @click="deleteProject(project.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { api } from '../api'

export default {
  setup() {
    const projects = ref([])
    const userRole = computed(() => localStorage.getItem('userRole'))
    
    const canCreateProject = computed(() => userRole.value === 'Admin')
    const canEditProject = computed(() => ['Admin', 'Project Manager'].includes(userRole.value))
    const canDeleteProject = computed(() => userRole.value === 'Admin')

    const fetchProjects = async () => {
      try {
        const response = await api.getProjects()
        projects.value = response.data
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    onMounted(fetchProjects)

    return {
      projects,
      canCreateProject,
      canEditProject,
      canDeleteProject
    }
  }
}
</script>
