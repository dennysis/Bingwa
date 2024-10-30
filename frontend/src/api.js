import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const api = {
  // Auth endpoints
  register(userData) {
    return apiClient.post('/auth/register', userData)
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials)
  },
  logout() {
    return apiClient.post('/auth/logout')
  },
  getProfile() {
    return apiClient.get('/auth/profile')
  },
  getPermissions() {
    return apiClient.get('/auth/permissions')
  },

  // User endpoints
  getUsers() {
    return apiClient.get('/users')
  },
  getUserById(id) {
    return apiClient.get(`/users/${id}`)
  },
  createUser(userData) {
    return apiClient.post('/users', userData)
  },
  updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData)
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  },

  // Role endpoints
  getRoles() {
    return apiClient.get('/roles')
  },
  createRole(roleData) {
    return apiClient.post('/roles', roleData)
  },
  updateRole(id, roleData) {
    return apiClient.put(`/roles/${id}`, roleData)
  },
  deleteRole(id) {
    return apiClient.delete(`/roles/${id}`)
  },

  // Project endpoints
  getProjects() {
    return apiClient.get('/projects')
  },
  getProjectById(id) {
    return apiClient.get(`/projects/${id}`)
  },
  createProject(projectData) {
    return apiClient.post('/projects', projectData)
  },
  updateProject(id, projectData) {
    return apiClient.put(`/projects/${id}`, projectData)
  },
  deleteProject(id) {
    return apiClient.delete(`/projects/${id}`)
  },
  assignUserToProject(projectId, assignData) {
    return apiClient.put(`/projects/${projectId}/assign`, assignData)
  },

  // CRM Customer endpoints
  getCustomers() {
    return apiClient.get('/customers')
  },
  getCustomerById(id) {
    return apiClient.get(`/customers/${id}`)
  },
  createCustomer(customerData) {
    return apiClient.post('/customers', customerData)
  },
  updateCustomer(id, customerData) {
    return apiClient.put(`/customers/${id}`, customerData)
  },
  deleteCustomer(id) {
    return apiClient.delete(`/customers/${id}`)
  },

  // CRM Lead endpoints
  getLeads() {
    return apiClient.get('/leads')
  },
  getLeadById(id) {
    return apiClient.get(`/leads/${id}`)
  },
  createLead(leadData) {
    return apiClient.post('/leads', leadData)
  },
  updateLead(id, leadData) {
    return apiClient.put(`/leads/${id}`, leadData)
  },
  deleteLead(id) {
    return apiClient.delete(`/leads/${id}`)
  },

  // CRM Interaction endpoints
  getInteractions() {
    return apiClient.get('/crm/interactions')
  },
  getInteractionById(id) {
    return apiClient.get(`/crm/interactions/${id}`)
  },
  createInteraction(interactionData) {
    return apiClient.post('/crm/interactions', interactionData)
  },
  updateInteraction(id, interactionData) {
    return apiClient.put(`/crm/interactions/${id}`, interactionData)
  },
  deleteInteraction(id) {
    return apiClient.delete(`/crm/interactions/${id}`)
  }
}