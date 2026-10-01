<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { appVersion, REPO_URL } from '@/lib/utils';

const mode = useColorMode();
function getStarted() {
  location.href = '#benefits';
}
const newVersion = computed(() => {
  return appVersion().split('.').slice(0, 2).join('.');
});
</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <div class="text-center space-y-8">
        <Badge variant="outline" class="text-sm py-2">
          <span class="mr-2 text-primary">
            <Badge>New</Badge>
          </span>
          <span> Introducing Sharefi v{{ newVersion }}! </span>
        </Badge>

        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            Share files
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">at the speed
            </span>
            of your local network
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Effortlessly share files and folders across your local network. Enjoy a fast, secure, open-source, and
          cross-platform app built for everyday use.
        </p>

        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <Button class="w-5/6 md:w-1/4 font-bold group/arrow" @click="getStarted()">
            Get Started
            <ArrowRight class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
          </Button>

          <Button as-child variant="secondary" class="w-5/6 md:w-1/4 font-bold">
            <a :href="REPO_URL" target="_blank">Github respository</a>
          </Button>
        </div>
      </div>

      <div class="relative group mt-14">
        <!-- gradient shadow -->
        <div
          class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation">
        </div>

        <img
          class="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-t-primary/30 img-border-animation"
          :src="mode == 'light' ? 'hero-image-light.png' : 'hero-image-dark.png'
            " alt="dashboard using shadcn-vue" />

        <!-- gradient effect img -->
        <div
          class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
          :class="mode == 'dark' ? 'h-20 md:h-28' : ''">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes img-border-animation {
  from {
    border-top-color: hsl(var(--primary) / 0.1);
  }

  to {
    border-top-color: hsl(var(--primary) / 0.6);
  }
}
</style>
