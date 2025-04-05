import { ref, onMounted, onUnmounted } from 'vue'

export function useDropdown() {
  const isOpen = ref(false)
  const triggerRef = ref<HTMLElement | null>(null)
  
  // Close the dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (triggerRef.value && !triggerRef.value.contains(e.target as Node) && isOpen.value) {
      isOpen.value = false
    }
  }
  
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  
  const close = () => {
    isOpen.value = false
  }
  
  const open = () => {
    isOpen.value = true
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  
  return {
    isOpen,
    triggerRef,
    toggle,
    close,
    open
  }
} 