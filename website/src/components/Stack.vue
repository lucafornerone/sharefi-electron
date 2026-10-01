<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { electronMajorVersion } from '@/lib/utils';

interface ServiceProps {
  title: string;
  badge?: string;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: 'Shadcn/Vue',
    description:
      'Powers a beautiful, clean, and fully accessible user interface designed for a modern user experience.',
  },
  {
    title: 'TypeScript & ESM',
    description:
      'Written completely in TypeScript. Utilizes asynchronous tasks that handle data processing without ever freezing the main application thread.',
  },
  {
    title: 'Hono Web Server',
    description:
      'Runs a lightweight backend instance, allowing heavy folders and files to stream between devices at maximum local speeds.',
  },
  {
    title: 'Electron',
    description:
      'Powers a stable cross-platform desktop wrapper, allowing the app to run natively with full access to local network hardware.',
    badge: `v${electronMajorVersion()}`,
  },
];
</script>

<template>
  <section id="stack" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Tech Stack
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      Under the Hood of Sharefi
    </h2>
    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Engineered using next-generation web technologies to power a robust, offline-first desktop experience.
    </h3>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
      <div v-for="{ title, description, badge } in serviceList" :key="title">
        <Card class="bg-muted/60 dark:bg-card h-full relative">
          <CardHeader>
            <CardTitle>{{ title }}</CardTitle>
            <CardDescription>{{ description }}</CardDescription>
          </CardHeader>
          <Badge v-if="badge" variant="secondary" class="absolute -top-2 -right-3">{{ badge }}</Badge>
        </Card>
      </div>
    </div>
  </section>
</template>
