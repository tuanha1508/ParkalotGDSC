<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-4">
      <h3 class="text-xl font-semibold text-white flex items-center">
        <UIcon name="i-heroicons-clock" class="h-5 w-5 mr-2" />
        Recent Activity
      </h3>
    </div>
    <div class="p-5">
      <div class="overflow-x-auto">
        <table class="w-full text-white">
          <thead>
            <tr>
              <th class="text-left px-3 py-2 text-white/70">Time</th>
              <th class="text-left px-3 py-2 text-white/70">License Plate</th>
              <th class="text-left px-3 py-2 text-white/70">Section</th>
              <th class="text-left px-3 py-2 text-white/70">Type</th>
              <th class="text-left px-3 py-2 text-white/70">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, i) in activities" :key="i" class="border-t border-white/10">
              <td class="px-3 py-3">{{ formatDateTime(activity.timestamp.toString()) }}</td>
              <td class="px-3 py-3">{{ activity.licensePlate }}</td>
              <td class="px-3 py-3">Section {{ activity.section }}</td>
              <td class="px-3 py-3">
                <span 
                  :class="{
                    'bg-blue-400/20 text-blue-400': activity.type === 'student',
                    'bg-yellow-400/20 text-yellow-400': activity.type === 'staff',
                    'bg-pink-400/20 text-pink-400': activity.type === 'visitor'
                  }"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ activity.type }}
                </span>
              </td>
              <td class="px-3 py-3">
                <span 
                  :class="{
                    'bg-green-400/20 text-green-400': activity.action === 'entry',
                    'bg-red-400/20 text-red-400': activity.action === 'exit'
                  }"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ activity.action }}
                </span>
              </td>
            </tr>
            <tr v-if="activities.length === 0" class="border-t border-white/10">
              <td colspan="5" class="px-3 py-4 text-center text-white/50">No recent activity</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useParking } from '~/composables/useParking'

const { formatDateTime } = useParking()

interface Activity {
  timestamp: number;
  licensePlate: string;
  section: string;
  type: 'student' | 'staff' | 'visitor';
  action: 'entry' | 'exit';
}

const props = defineProps<{
  activities: Activity[];
}>()
</script> 