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
  changePassword(passwordData) {
    return apiClient.post('/auth/change-password', passwordData)
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
    return apiClient.patch(`/users/${id}`, userData)
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  },

  // Customer endpoints
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
    return apiClient.patch(`/customers/${id}`, customerData)
  },
  deleteCustomer(id) {
    return apiClient.delete(`/customers/${id}`)
  },

  // Lead endpoints
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
    return apiClient.patch(`/leads/${id}`, leadData)
  },
  deleteLead(id) {
    return apiClient.delete(`/leads/${id}`)
  }
}
