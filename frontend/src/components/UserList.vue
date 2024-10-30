<template>
  <div class="user-list-container">
    <div class="list-header">
      <h2>Users</h2>
      <router-link to="/users/new" class="add-btn">Add User</router-link>
    </div>

    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search users..."
        @input="handleSearch"
      >
    </div>

    <div class="table-container">
      <table v-if="users.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.phone_number }}</td>
            <td class="actions">
              <router-link 
                :to="`/users/${user.id}/edit`" 
                class="edit-btn"
              >
                Edit
              </router-link>
              <button 
                @click="handleDelete(user.id)" 
                class="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">
        No users found
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from '../api'

export default {
  name: 'UserList',
  setup() {
    const users = ref([])
    const searchQuery = ref('')

    const fetchUsers = async () => {
      try {
        const response = await api.getUsers()
        users.value = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    const handleSearch = () => {
      // Implement search functionality
    }

    const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await api.deleteUser(id)
          await fetchUsers()
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      searchQuery,
      handleSearch,
      handleDelete
    }
  }
}
</script>

<style scoped>
.user-list-container {
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
