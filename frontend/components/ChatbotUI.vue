<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chatbot button -->
    <ClientOnly>
      <div
        v-motion
        :initial="{ x: 100, opacity: 0 }"
        :enter="{ x: 0, opacity: 1, transition: { duration: 500, ease: 'easeOut' } }"
        class="relative"
      >
        <button
          @click="toggleChat"
          class="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <Icon v-if="!isOpen" name="heroicons:chat-bubble-left-right" size="20" />
          <Icon v-else name="heroicons:x-mark" size="20" />
        </button>

        <!-- Chatbot panel -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-90 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-90 opacity-0"
        >
          <div 
            v-show="isOpen"
            class="absolute bottom-16 right-0 w-80 h-96 bg-black dark:bg-[#303131] rounded-lg shadow-xl overflow-hidden flex flex-col border-2 border-[#303131]"
          >
            <!-- Chat messages -->
            <div class="flex-1 overflow-y-auto p-3 space-y-3 bg-black dark:bg-[#303131]" ref="messagesContainer">
              <div v-if="messages.length === 0" class="flex justify-center items-center h-full">
                <!-- Empty state, no text -->
              </div>
              <div v-for="(message, i) in messages" :key="i" :class="message.isBot ? 'flex' : 'flex justify-end debug-user-message'" style="margin-bottom: 8px;">
                <div
                  :class="[
                    'max-w-[65%] rounded-lg p-1.5 shadow-sm text-xs',
                    message.isBot 
                      ? 'bg-[#303131] dark:bg-[#303131] text-gray-200 dark:text-gray-100' 
                      : 'bg-white text-black'
                  ]"
                  :style="message.isBot ? 'min-width: 30px; word-break: break-word;' : 'min-width: 30px; word-break: break-word; background-color: white;'"
                >
                  {{ message.text }}
                </div>
              </div>
            </div>

            <!-- Input area -->
            <div class="border-t border-[#303131] dark:border-[#303131] p-1">
              <div class="flex items-center gap-2 pl-1">
                <input
                  v-model="inputMessage"
                  @keypress.enter.prevent="sendMessage"
                  placeholder="Type a message..."
                  class="flex-1 bg-[#303131] dark:bg-[#303131] text-gray-100 dark:text-white border-0 rounded-full px-3 py-1 text-xs focus:ring-2 focus:ring-primary"
                />
                <button 
                  @click.prevent="sendMessage"
                  class="bg-primary text-white rounded-full p-2 hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Icon name="heroicons:paper-airplane" size="18" />
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

// State
const isOpen = ref(false);
const inputMessage = ref('');
const messages = ref([
  { text: "Hi there! How can I help you with parking today?", isBot: true },
]);
const messagesContainer = ref(null);

// Functions
const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  
  const userMessage = inputMessage.value.trim();
  console.log('Sending message:', userMessage);
  console.log('Current messages before adding user message:', [...messages.value]);
  
  // Add user message directly to the array
  messages.value.push({
    text: userMessage,
    isBot: false
  });
  
  console.log('Messages after adding user message:', [...messages.value]);
  
  // Clear input field
  inputMessage.value = '';
  
  // Scroll to latest message immediately
  nextTick(() => {
    scrollToBottom();
  });
  
  // Simulate typing indicator
  setTimeout(() => {
    // Add bot response based on user message
    let botResponse = getBotResponse(userMessage);
    
    messages.value.push({
      text: botResponse,
      isBot: true
    });
    
    console.log('Messages after adding bot response:', [...messages.value]);
    
    // Scroll to bottom again for bot response
    nextTick(() => {
      scrollToBottom();
    });
  }, 1000);
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Simple chatbot responses
const getBotResponse = (message) => {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes('parking') && lowercaseMsg.includes('find')) {
    return "You can find parking locations through our parking map in the dashboard. Would you like me to navigate you there?";
  } else if (lowercaseMsg.includes('payment') || lowercaseMsg.includes('pay')) {
    return "We accept various payment methods including credit cards and mobile payments. You can manage payments through your account settings.";
  } else if (lowercaseMsg.includes('help') || lowercaseMsg.includes('support')) {
    return "I'm here to help! You can ask me about finding parking, payment options, account settings, or any other parking-related questions.";
  } else if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
    return "Hello! How can I assist you with your parking needs today?";
  } else {
    return "I'm not sure I understand. Could you please rephrase your question about parking?";
  }
};

// Watch for new messages and scroll to bottom
watch(messages, scrollToBottom, { deep: true });

// Scroll to bottom when opening chat
watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
  }
});

// Initial scroll
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
/* Optional: Add custom animations */
.messages-enter-active,
.messages-leave-active {
  transition: all 0.3s ease;
}
.messages-enter-from,
.messages-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 