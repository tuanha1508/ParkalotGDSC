<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
    <div class="bg-black border border-white/30 rounded-lg w-full max-w-md">
      <div class="border-b border-white/20 px-6 py-4 flex items-center justify-between">
        <h3 class="text-xl font-semibold text-white">Record Manual Entry</h3>
        <button 
          @click="closeModal"
          class="text-white opacity-70 hover:opacity-100"
        >
          <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
        </button>
      </div>
      
      <div class="p-6 space-y-5">
        <div>
          <label class="block text-white mb-2">License Plate</label>
          <input 
            v-model="formData.licensePlate" 
            type="text"
            placeholder="e.g. AB-123-CD"
            class="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white"
          />
        </div>
        
        <div>
          <label class="block text-white mb-2">Vehicle Type</label>
          <select
            v-model="formData.type"
            class="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white"
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="visitor">Visitor</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white mb-2">Parking Section</label>
          <select
            v-model="formData.section"
            class="w-full bg-black border border-white/30 rounded-lg px-4 py-2 text-white"
          >
            <option v-for="section in availableSections" :key="section.value" :value="section.value">
              {{ section.label }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="border-t border-white/20 px-6 py-4 flex justify-end space-x-3">
        <button 
          @click="closeModal"
          class="px-4 py-1.5 border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-200"
        >
          Cancel
        </button>
        
        <button 
          @click="submitForm"
          :disabled="!formData.licensePlate || !formData.type"
          class="bg-white hover:bg-gray-200 text-black px-4 py-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Record Entry
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

interface Section {
  label: string;
  value: string;
}

interface FormData {
  licensePlate: string;
  type: 'student' | 'staff' | 'visitor';
  section: string;
}

const props = defineProps<{
  isOpen: boolean;
  availableSections: Section[];
  initialData?: Partial<FormData>;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', data: FormData): void;
}>()

const formData = ref<FormData>({
  licensePlate: '',
  type: 'student',
  section: props.availableSections.length > 0 ? props.availableSections[0].value : ''
})

// Initialize form with any provided initial data
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.initialData) {
    formData.value = {
      ...formData.value,
      ...props.initialData
    }
  } else if (isOpen) {
    // Reset form when opening without initial data
    formData.value = {
      licensePlate: '',
      type: 'student',
      section: props.availableSections.length > 0 ? props.availableSections[0].value : ''
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const submitForm = () => {
  emit('submit', { ...formData.value })
  closeModal()
}
</script> 