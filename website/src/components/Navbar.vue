<script lang="ts" setup>
import { Menu } from '@lucide/vue';
import { useColorMode } from '@vueuse/core';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import GithubIcon from '@/icons/GithubIcon.vue';
import { appVersion, REPO_URL, STORE_URLS } from '@/lib/utils.ts';
import ToggleTheme from './ToggleTheme.vue';

interface RouteProps {
  href: string;
  label: string;
}

interface PlatformProps {
  title: string;
  description: string;
  url: string;
}

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'Features',
  },
  {
    href: '#stack',
    label: 'Stack',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
];

const storeList: PlatformProps[] = [
  {
    title: 'Google Play',
    description: 'Android 7.0 or newer',
    url: STORE_URLS.ANDROID,
  },
  {
    title: 'App Store',
    description: 'iOS 16.0 or newer / iPadOS',
    url: STORE_URLS.IOS,
  },
  {
    title: 'Microsoft Store',
    description: 'Windows 10 / 11',
    url: STORE_URLS.WINDOWS,
  },
  {
    title: 'Mac App Store',
    description: 'M1 Apple Silicon or newer',
    url: STORE_URLS.MACOS,
  },
  {
    title: 'Snap Store',
    description: 'Every Linux distro',
    url: STORE_URLS.LINUX,
  },
];

const binaryList: PlatformProps[] = [
  {
    title: 'Windows Portable',
    description: 'x64 Windows 10 / 11',
    url: `${REPO_URL}/releases/download/${appVersion()}/Sharefi.${appVersion()}.exe`,
  },
  {
    title: 'Windows Installer',
    description: 'x64 Windows 10 / 11',
    url: `${REPO_URL}/releases/download/${appVersion()}/Sharefi.Setup.${appVersion()}.exe`,
  },
  {
    title: 'macOS Portable',
    description: 'M1 Apple Silicon or newer',
    url: `${REPO_URL}/releases/download/${appVersion()}/Sharefi-${appVersion()}-arm64-mac.zip`,
  },
  {
    title: 'macOS Installer',
    description: 'M1 Apple Silicon or newer',
    url: `${REPO_URL}/releases/download/${appVersion()}/Sharefi-${appVersion()}-arm64.dmg`,
  },
  {
    title: 'Linux .deb',
    description: 'Ubuntu, Debian, Linux Mint, Pop!_OS, Kali Linux, Elementary OS',
    url: `${REPO_URL}/releases/download/${appVersion()}/sharefi_${appVersion()}_amd64.deb`,
  },
  {
    title: 'Linux .rpm',
    description: 'Fedora, RHEL, CentOS, openSUSE, AlmaLinux',
    url: `${REPO_URL}/releases/download/${appVersion()}/sharefi-${appVersion()}.x86_64.rpm`,
  },
];

const isOpen = ref<boolean>(false);
const mode = useColorMode();
mode.value = 'dark';
</script>

<template>
  <header :class="{
    'shadow-light': mode === 'light',
    'shadow-dark': mode === 'dark',
    'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true,
  }">
    <a href="/" class="font-bold text-lg flex items-center">
      <img src="/icon.png" class="rounded-lg w-9 h-9 mr-2 border text-white" />
      Sharefi
    </a>
    <!-- Mobile -->
    <div class="flex items-center lg:hidden">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">
                <a href="/" class="flex items-center">
                  <img src="/icon.png"
                    class="from-primary/70 via-primary to-primary/70 rounded-lg size-9 mr-2 border text-white" />
                  Sharefi
                </a>
              </SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost"
                class="justify-start text-base">
                <a @click="isOpen = false" :href="href">
                  {{ label }}
                </a>
              </Button>
            </div>
          </div>

          <SheetFooter class="flex-col sm:flex-col justify-start items-start">
            <Separator class="mb-2" />

            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop -->
    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger class="bg-card text-base">
            Download
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div class="grid w-[600px] p-4">
              <ul class="grid grid-cols-2 gap-x-5 gap-y-2">
                <a v-for="{ title, description, url } in storeList" :key="title" :href="url" target="_blank"
                  class="rounded-md p-3 text-sm hover:bg-muted">
                  <p class="mb-1 font-semibold leading-none text-foreground">
                    {{ title }}
                  </p>
                  <p class="line-clamp-2 text-muted-foreground">
                    {{ description }}
                  </p>
                </a>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger class="bg-card text-base">
            Binaries
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div class="grid w-[600px] p-4">
              <ul class="grid grid-cols-2 gap-x-5 gap-y-2">
                <a v-for="{ title, description, url } in binaryList" :key="title" :href="url" target="_blank"
                  class="rounded-md p-3 text-sm hover:bg-muted">
                  <p class="mb-1 font-semibold leading-none text-foreground">
                    {{ title }}
                  </p>
                  <p class="line-clamp-2 text-muted-foreground">
                    {{ description }}
                  </p>
                </a>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost"
              class="justify-start text-base">
              <a :href="href">
                {{ label }}
              </a>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="hidden lg:flex">
      <ToggleTheme />

      <Button as-child size="sm" variant="ghost" aria-label="View on GitHub">
        <a aria-label="View on GitHub" :href="REPO_URL" target="_blank">
          <GithubIcon class="size-5" />
        </a>
      </Button>
    </div>
  </header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
