<script setup lang="ts">
import { FingerprintPattern, Layers, Leaf, Zap } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'zap',
    title: 'Save Your Time',
    description:
      'Stop uploading to the internet just to download on the screen next to you. Share heavy data in seconds, not minutes.',
  },
  {
    icon: 'fingerprintPattern',
    title: 'Local & Secure',
    description:
      'Your files never touch the cloud or external servers. Everything stays strictly inside your own local network, safe from prying eyes.',
  },
  {
    icon: 'layers',
    title: 'Pure Simplicity',
    description:
      'Ditch the USB drives and stop emailing files to yourself. Share anything instantly without messing with configurations or hardware.',
  },
  {
    icon: 'leaf',
    title: 'Green & Efficient',
    description:
      'Save internet bandwidth and reduce power usage. Keep your data local for a smarter, eco-friendly way to share.',
  },
];

const iconMap: Record<
  string,
  typeof Leaf | typeof Layers | typeof Zap | typeof FingerprintPattern
> = {
  leaf: Leaf,
  layers: Layers,
  zap: Zap,
  fingerprintPattern: FingerprintPattern,
};
</script>

<template>
  <section id="benefits" class="container py-24 sm:py-32">
    <div class="grid lg:grid-cols-2 place-items-center lg:gap-24">
      <div>
        <h2 class="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Take Control of Your Data
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          No cloud delays, no subscription fees, and no internet dependencies. Just a smarter way to share files across
          your devices.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <Card v-for="({ icon, title, description }, index) in benefitList" :key="title"
          class="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number">
          <CardHeader>
            <div class="flex justify-between">
              <component class="size-8 mb-6 text-primary" :is="iconMap[icon]" />

              <span
                class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">0{{
                  index + 1 }}</span>
            </div>

            <CardTitle>{{ title }}</CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
