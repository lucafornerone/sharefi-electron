<script setup lang="ts">
import {
  ArrowRightLeft,
  Code,
  HardDrive,
  MousePointerClick,
  Network,
  TabletSmartphone,
} from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: 'tabletSmartphone',
    title: 'Any Device',
    description: 'Works seamlessly across Windows, macOS, Linux, Android, iOS, and iPadOS devices.',
  },
  {
    icon: 'hardDrive',
    title: 'No Size Limits',
    description:
      'Send massive 4K videos, large folders, or archive backups without compressed quality or caps.',
  },
  {
    icon: 'arrowRightLeft',
    title: 'Device-to-Device',
    description:
      'Cut out the middleman. Your files take the shortest path possible, moving straight to the destination.',
  },
  {
    icon: 'mousePointerClick',
    title: 'No Sign-Ups',
    description:
      'Zero setup. No accounts or login screens. Just launch the app and send your files instantly.',
  },
  {
    icon: 'network',
    title: 'Instant Detection',
    description:
      'Skip complex pairing steps. Enjoy a smart network scanner that finds your PCs and phones instantly.',
  },
  {
    icon: 'code',
    title: 'Trustworthy Code',
    description:
      'No hidden trackers or backdoors. Anyone can inspect how your data is handled for absolute transparency.',
  },
];

const iconMap: Record<
  string,
  | typeof TabletSmartphone
  | typeof HardDrive
  | typeof ArrowRightLeft
  | typeof MousePointerClick
  | typeof Network
  | typeof Code
> = {
  tabletSmartphone: TabletSmartphone,
  hardDrive: HardDrive,
  arrowRightLeft: ArrowRightLeft,
  mousePointerClick: MousePointerClick,
  network: Network,
  code: Code,
};
</script>

<template>
  <section id="features" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Features
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      The Right Way to Share Locally
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Built on open-source reliability, designed to give you absolute control over how you move your data.
    </h3>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="{ icon, title, description } in featureList" :key="title">
        <Card class="h-full bg-background border-0 shadow-none">
          <CardHeader class="flex justify-center items-center">
            <div class="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
              <component :is="iconMap[icon]" class="size-6 text-primary" />
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-center">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
