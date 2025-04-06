<template>
  <section class="relative pt-16 md:pt-24 pb-16 overflow-hidden bg-black flex items-center justify-center min-h-[80vh]">
    <!-- Background animation elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="animate-pulse-slow absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary-600/20 to-accent/10 blur-3xl"></div>
      <div class="animate-float absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/20 to-primary-400/10 blur-3xl"></div>
    </div>
    
    <div class="container mx-auto px-6 text-center flex flex-col justify-center h-full mt-10 relative z-10">
      <div class="flex flex-col items-center justify-center gap-8">
        
        <div class="w-full text-center">
          <!-- Modified video mask container with additional iOS compatibility -->
          <div class="video-mask-container relative">
            <!-- Standard SVG mask approach -->
            <svg class="text-mask-svg" width="100%" height="100%" overflow="visible">
              <!-- Define the mask using the text -->
              <defs>
                <mask id="text-mask">
                  <rect width="100%" height="100%" fill="black" />
                  <text 
                    x="50%" 
                    y="50%" 
                    dominant-baseline="middle" 
                    text-anchor="middle"
                    fill="white" 
                    class="responsive-text"
                    font-weight="bold" 
                    font-family="'Gugi', sans-serif"
                    style="paint-order: stroke; stroke: white; stroke-width: 2px; fill: white;"
                  >
                    Parkalot
                  </text>
                </mask>
              </defs>
              
              <!-- Apply the mask to a rectangle that contains the video, not directly to the video -->
              <foreignObject width="100%" height="100%" mask="url(#text-mask)" style="overflow: hidden;">
                <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full">
                  <video 
                    ref="videoElement"
                    class="w-full h-full object-cover"
                    autoplay
                    muted
                    loop
                    playsinline
                    style="pointer-events: none;"
                  >
                    <source src="/video-background.mp4" type="video/mp4" />
                  </video>
                </div>
              </foreignObject>
              
              <!-- Add a thin outline around the text for better visibility -->
              <text 
                x="50%" 
                y="50%" 
                dominant-baseline="middle" 
                text-anchor="middle"
                fill="transparent" 
                stroke="rgba(255,255,255,0.3)"
                stroke-width="2"
                class="responsive-text text-outline"
                font-weight="bold"
                font-family="'Gugi', sans-serif"
              >
                Parkalot
              </text>
            </svg>
            
            <!-- iOS Fallback: Hidden on non-iOS devices, visible only on iOS -->
            <div class="ios-fallback">
              <!-- Primary approach: Use CSS mask directly on the container -->
              <div class="ios-mask-container">
                <!-- Video background -->
                <video 
                  ref="iosVideoElement"
                  class="ios-video"
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source src="/video-background.mp4" type="video/mp4" />
                </video>
                
                <!-- Text outline helps show the boundaries of the text shape -->
                <div class="ios-text-outline">Parkalot</div>
              </div>
              
              <!-- Backup approach: simple text overlay if masking fails -->
              <div class="ios-text-backup">Parkalot</div>
            </div>
          </div>
          
          <client-only>
            <div 
              v-motion 
              :initial="{ opacity: 0, y: 30 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
              class="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div class="relative inline-block">
                <NuxtLink to="/park" class="no-underline">
                  <UButton 
                    size="sm" 
                    class="text-xs font-medium bg-white !text-black rounded-full w-full sm:w-auto px-6 py-2"
                    style="background-color: #FFFFFF !important; color: #000000 !important; border: none !important;"
                  >
                    Get Started
                  </UButton>
                </NuxtLink>
              </div>
              
              <div class="relative group inline-block">
                <NuxtLink to="/about" class="no-underline">
                  <button class="custom-button explore-btn relative overflow-hidden">
                    <span class="relative z-10">Explore Features →</span>
                    <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] bg-white rounded-full transition-all duration-300 w-0 group-hover:w-4/5"></span>
                  </button>
                </NuxtLink>
              </div>
            </div>
          </client-only>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, onBeforeMount } from 'vue';

// Reference to the video element
const videoElement = ref<HTMLVideoElement | null>(null);
const iosVideoElement = ref<HTMLVideoElement | null>(null);
const isIOS = ref(false);

// Check if device is iOS
onBeforeMount(() => {
  // Detect iOS devices
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
});

// Function to play the video
const playVideo = () => {
  if (videoElement.value) {
    videoElement.value.play().catch(error => {
      console.warn('Could not play video:', error);
    });
  }
  
  if (isIOS.value && iosVideoElement.value) {
    iosVideoElement.value.play().catch(error => {
      console.warn('Could not play iOS video:', error);
    });
  }
};

// Play video when component is mounted
onMounted(() => {
  playVideo();
});

// Play video when returning to this component with keep-alive
onActivated(() => {
  playVideo();
});
</script>

<style scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Video mask effect styles */
.video-mask-container {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 200px;
  max-height: 550px;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0; /* Remove bottom margin */
  overflow: hidden; /* Ensure nothing spills outside */
}

.text-mask-svg {
  max-width: 100%;
  overflow: visible;
  display: block; /* Prevent extra space below the SVG */
  height: 100%;
  z-index: 1;
}

.text-outline {
  pointer-events: none;
}

.responsive-text {
  font-size: clamp(100px, 20vw, 400px);
  stroke-width: clamp(1px, 0.25vw, 3px);
}

/* iOS Fallback Styles */
.ios-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none; /* Hidden by default */
  overflow: hidden;
}

.ios-mask-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Apply mask to the container so it affects the video inside */
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 200"><text text-anchor="middle" x="250" y="120" font-size="120" font-family="Arial, sans-serif" font-weight="bold">Parkalot</text></svg>');
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 200"><text text-anchor="middle" x="250" y="120" font-size="120" font-family="Arial, sans-serif" font-weight="bold">Parkalot</text></svg>');
  -webkit-mask-size: 90% auto;
  mask-size: 90% auto;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.ios-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.ios-text-outline {
  position: absolute;
  z-index: 3;
  font-family: 'Gugi', sans-serif;
  font-weight: 900;
  font-size: clamp(80px, 15vw, 300px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.3);
  text-align: center;
  pointer-events: none;
  opacity: 0.7;
}

.ios-text-backup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none; /* Hidden by default, shown only if needed */
  align-items: center;
  justify-content: center;
  font-family: 'Gugi', sans-serif;
  font-weight: 900;
  font-size: clamp(80px, 15vw, 300px);
  color: white;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  background: rgba(0,0,0,0.5);
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .responsive-text {
    font-size: clamp(30px, 10vw, 150px);
    stroke-width: 0.8px;
  }
  
  .video-mask-container {
    min-height: 120px;
    height: 25vh;
  }
  
  .ios-text-outline,
  .ios-text-backup {
    font-size: clamp(30px, 10vw, 120px);
  }
}

/* iOS-specific adjustments - Apply the iOS fallback solution only on iOS devices */
@supports (-webkit-touch-callout: none) {
  .text-mask-svg {
    display: none; /* Hide the standard SVG on iOS */
  }
  
  .ios-fallback {
    display: block; /* Show the iOS fallback on iOS */
  }
  
  /* Fallback for older iOS versions that might not support mask-image well */
  @supports not (mask-image: url('')) {
    .ios-mask-container {
      -webkit-mask-image: none;
      mask-image: none;
    }
    
    .ios-text-outline {
      display: none;
    }
    
    .ios-text-backup {
      display: flex;
    }
  }
  
  .responsive-text {
    font-size: clamp(20px, 8vw, 120px);
    stroke-width: 0.5px;
  }
  
  .video-mask-container {
    min-height: 100px;
    height: 20vh;
  }
}

/* Remove old styles that are no longer needed */
/* .video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-mask {
  position: relative;
  mix-blend-mode: source-over;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.3);
  background: transparent;
  -webkit-mask-image: linear-gradient(#000, #000);
  -webkit-mask-clip: text;
  mask-image: linear-gradient(#000, #000);
  mask-clip: text;
}

.text-mask::before {
  content: none;
} */

.get-started-btn {
  background-color: #FFFFFF !important;
  color: #000000 !important;
  box-shadow: none;
  border: none !important;
}

.get-started-btn:hover {
  background-color: #F3F4F6 !important;
}

.explore-btn {
  background-color: transparent !important;
  color: #FFFFFF !important;
  padding: 0.25rem 0.75rem;
}

.explore-btn:hover {
  color: #D1D5DB !important;
}

/* Animation keyframes */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-slow {
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 0.5; transform: scale(1); }
}

@keyframes text-glow {
  0% { text-shadow: 0 0 5px rgba(255,255,255,0.1); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(59,130,246,0.2); }
  100% { text-shadow: 0 0 5px rgba(255,255,255,0.1); }
}

/* Animation classes */
.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
}
</style> 