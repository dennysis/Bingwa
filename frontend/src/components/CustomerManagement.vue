<template>
  <div class="customer-management">
    <div class="tabs">
      <button 
        :class="{ active: activeTab === 'customers' }" 
        @click="activeTab = 'customers'"
      >
        Customers
      </button>
      <button 
        :class="{ active: activeTab === 'leads' }" 
        @click="activeTab = 'leads'"
      >
        Leads
      </button>
    </div>

    <div v-if="activeTab === 'customers'" class="customers-section">
      <div class="header-actions">
        <h2>Customers</h2>
        <button @click="createCustomer">New Customer</button>
      </div>
      <div class="customers-grid">
        <!-- Customer cards -->
      </div>
    </div>

    <div v-if="activeTab === 'leads'" class="leads-section">
      <div class="header-actions">
        <h2>Leads</h2>
        <button @click="createLead">New Lead</button>
      </div>
      <div class="leads-grid">
        <!-- Lead cards -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from '../api'

export default {
  setup() {
    const activeTab = ref('customers')
    const customers = ref([])
    const leads = ref([])

    const fetchCustomers = async () => {
      const response = await api.getCustomers()
      customers.value = response.data
    }

    const fetchLeads = async () => {
      const response = await api.getLeads()
      leads.value = response.data
    }

    onMounted(() => {
      fetchCustomers()
      fetchLeads()
    })

    return {
      activeTab,
      customers,
      leads
    }
  }
}
</script>
