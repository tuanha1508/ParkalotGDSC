import { defineStore } from 'pinia'

interface ParkingSlot {
  id: string
  section: string
  number: number
  isOccupied: boolean
  carInfo?: {
    licensePlate: string
    entryTime: string
    type: 'student' | 'staff' | 'visitor'
  }
}

interface ParkingHistory {
  id: string
  licensePlate: string
  entryTime: string
  exitTime?: string
  slotId: string
  type: 'student' | 'staff' | 'visitor'
}

interface ParkingState {
  slots: ParkingSlot[]
  history: ParkingHistory[]
  totalSlots: number
  loading: boolean
  error: string | null
}

export const useParkingStore = defineStore('parking', {
  state: (): ParkingState => ({
    slots: [],
    history: [],
    totalSlots: 0,
    loading: false,
    error: null
  }),
  
  getters: {
    occupiedSlots: (state) => state.slots.filter(slot => slot.isOccupied).length,
    availableSlots: (state) => state.totalSlots - state.slots.filter(slot => slot.isOccupied).length,
    occupancyRate: (state) => {
      if (state.totalSlots === 0) return 0
      return (state.slots.filter(slot => slot.isOccupied).length / state.totalSlots) * 100
    },
    sectionStats: (state) => {
      const sections: Record<string, { total: number, occupied: number }> = {}
      
      state.slots.forEach(slot => {
        if (!sections[slot.section]) {
          sections[slot.section] = { total: 0, occupied: 0 }
        }
        
        sections[slot.section].total++
        if (slot.isOccupied) {
          sections[slot.section].occupied++
        }
      })
      
      return sections
    }
  },
  
  actions: {
    initializeData() {
      // In a real app, this would fetch from an API
      // For demo purposes, generate some sample data
      this.loading = true
      this.error = null
      
      try {
        // Generate parking slots
        const sections = ['A', 'B', 'C']
        const slotsPerSection = 20
        
        const slots: ParkingSlot[] = []
        
        sections.forEach(section => {
          for (let i = 1; i <= slotsPerSection; i++) {
            slots.push({
              id: `${section}${i}`,
              section,
              number: i,
              isOccupied: Math.random() > 0.7 // 30% occupied for demo
            })
          }
        })
        
        // Generate some occupied slots with car info
        slots.forEach(slot => {
          if (slot.isOccupied) {
            slot.carInfo = {
              licensePlate: this.generateRandomLicensePlate(),
              entryTime: new Date(Date.now() - Math.floor(Math.random() * 8 * 60 * 60 * 1000)).toISOString(),
              type: ['student', 'staff', 'visitor'][Math.floor(Math.random() * 3)] as 'student' | 'staff' | 'visitor'
            }
          }
        })
        
        // Generate some parking history
        const history: ParkingHistory[] = []
        
        // Current day entries
        slots.forEach(slot => {
          if (slot.isOccupied && slot.carInfo) {
            history.push({
              id: `hist-${Math.random().toString(36).slice(2)}`,
              licensePlate: slot.carInfo.licensePlate,
              entryTime: slot.carInfo.entryTime,
              slotId: slot.id,
              type: slot.carInfo.type
            })
          }
        })
        
        // Past entries (completed with exit times)
        for (let i = 0; i < 50; i++) {
          const entryTime = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
          const exitTime = new Date(entryTime.getTime() + Math.floor(Math.random() * 8 * 60 * 60 * 1000))
          
          history.push({
            id: `hist-${Math.random().toString(36).slice(2)}`,
            licensePlate: this.generateRandomLicensePlate(),
            entryTime: entryTime.toISOString(),
            exitTime: exitTime.toISOString(),
            slotId: slots[Math.floor(Math.random() * slots.length)].id,
            type: ['student', 'staff', 'visitor'][Math.floor(Math.random() * 3)] as 'student' | 'staff' | 'visitor'
          })
        }
        
        this.slots = slots
        this.history = history
        this.totalSlots = slots.length
      } catch (error) {
        this.error = 'Failed to initialize parking data'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    
    carEntry(slotId: string, licensePlate: string, type: 'student' | 'staff' | 'visitor') {
      const slot = this.slots.find(s => s.id === slotId)
      
      if (!slot) {
        this.error = 'Parking slot not found'
        return false
      }
      
      if (slot.isOccupied) {
        this.error = 'Parking slot is already occupied'
        return false
      }
      
      const entryTime = new Date().toISOString()
      
      // Update slot
      slot.isOccupied = true
      slot.carInfo = {
        licensePlate,
        entryTime,
        type
      }
      
      // Add to history
      this.history.push({
        id: `hist-${Math.random().toString(36).slice(2)}`,
        licensePlate,
        entryTime,
        slotId,
        type
      })
      
      return true
    },
    
    carExit(slotId: string) {
      const slot = this.slots.find(s => s.id === slotId)
      
      if (!slot) {
        this.error = 'Parking slot not found'
        return false
      }
      
      if (!slot.isOccupied || !slot.carInfo) {
        this.error = 'Parking slot is not occupied'
        return false
      }
      
      const exitTime = new Date().toISOString()
      
      // Find the corresponding history entry and update it
      const historyEntry = this.history.find(h => 
        h.slotId === slotId && 
        h.licensePlate === slot.carInfo?.licensePlate && 
        !h.exitTime
      )
      
      if (historyEntry) {
        historyEntry.exitTime = exitTime
      }
      
      // Clear slot
      slot.isOccupied = false
      slot.carInfo = undefined
      
      return true
    },
    
    generateRandomLicensePlate() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numbers = '0123456789'
      
      let plate = ''
      
      // Format: 2 letters, 3 numbers, 2 letters
      for (let i = 0; i < 2; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length))
      }
      
      plate += '-'
      
      for (let i = 0; i < 3; i++) {
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length))
      }
      
      plate += '-'
      
      for (let i = 0; i < 2; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length))
      }
      
      return plate
    }
  }
}) 