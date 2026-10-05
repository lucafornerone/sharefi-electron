<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
}

const HowItWorksList: HowItWorksProps[] = [
  {
    badgeTitle: 'Launch',
    title: 'Just Open and Go',
    description:
      'Launch Sharefi on your devices. No configuration or pairing needed, the app instantly scans your local network and displays everyone online.',
  },
  {
    badgeTitle: 'Connect',
    title: 'Pick a Network Device',
    description:
      'Head to the Local Network section and select the connected device you want to download files or folders from.',
  },
  {
    badgeTitle: 'Ready',
    title: 'Download & Save',
    description:
      'Browse the specific files or folders shared by the target device. You will only ever see the exact assets they chose to expose. Once ready, hit download and save them to your PC.',
  },
];

const mode = useColorMode();
const stepImage = (index: number) => {
  return `hiw-step${index + 1}-${mode.value}.png`;
};
</script>

<template>
  <section id="how-it-works" class="container py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        How It Works
      </h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        How the Magic Happens
      </h2>
    </div>

    <div class="lg:w-[80%] mx-auto relative">
      <div v-for="(
{ badgeTitle, title, description }, index
        ) in HowItWorksList" :key="title" :class="[
          'flex flex-col mb-8 items-center gap-8',
          index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
        ]">
        <Card class="h-full bg-transparent border-0 shadow-none">
          <CardHeader>
            <div class="pb-4">
              <Badge>{{ badgeTitle }}</Badge>
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground w-[80%]">
            {{ description }}
          </CardContent>
        </Card>

        <img :src="stepImage(index)" :alt="`Image describing ${title}`"
          class="w-[85%] max-w-[400px] w-full max-w-[320px] sm:max-w-[380px] md:max-w-[350px] lg:max-w-[400px] mx-auto object-contain" />
        <div :class="[
          '-z-10 absolute right-0 w-44 h-72  lg:w-64 lg:h-80 rounded-full bg-primary/15 dark:bg-primary/10 blur-3xl',
          {
            'left-0': index % 2 !== 0,
          },
        ]"></div>
      </div>
    </div>
  </section>
</template>
