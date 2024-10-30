<template>
  <div class="customer-list-container">
    <div class="list-header">
      <h2>Customers</h2>
      <router-link to="/customers/new" class="add-btn">Add Customer</router-link>
    </div>

    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search customers..."
        @input="handleSearch"
      >
    </div>

    <div class="table-container">
      <table v-if="customers.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.companyName }}</td>
            <td class="actions">
              <router-link 
                :to="`/customers/${customer.id}/edit`" 
                class="edit-btn"
              >
                Edit
              </router-link>
              <button 
                @click="handleDelete(customer.id)" 
                class="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">
        No customers found
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from '../api'

export default {
  name: 'CustomerList',
  setup() {
  
    const customers = ref([])
    const searchQuery = ref('')

    const fetchCustomers = async () => {
      try {
        const response = await api.getCustomers()
        customers.value = response.data
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }

    const handleSearch = () => {
      // Implement search logic here
    }

    const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this customer?')) {
        try {
          await api.deleteCustomer(id)
          await fetchCustomers()
        } catch (error) {
          console.error('Error deleting customer:', error)
        }
      }
    }

    onMounted(() => {
      fetchCustomers()
    })

    return {
      customers,
      searchQuery,
      handleSearch,
      handleDelete
    }
  }
}
</script>

<style scoped>
.customer-list-container {
  padding: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  padding: 4px 8px;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
