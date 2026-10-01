<script setup lang="ts">
import { REPO_URL, STORE_URLS } from '@/lib/utils.ts';
import Separator from './ui/separator/Separator.vue';
</script>

<template>
  <footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div class="col-span-full xl:col-span-2">
          <a href="/" class="flex font-bold items-center">
            <img src="/icon.png" class="rounded-lg w-9 h-9 mr-2 border text-white" />
            <h3 class="text-2xl">Sharefi</h3>
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Desktop</h3>
          <div>
            <a :href="STORE_URLS.WINDOWS" target="_blank" class="opacity-60 hover:opacity-100">
              Windows
            </a>
          </div>

          <div>
            <a :href="STORE_URLS.MACOS" target="_blank" class="opacity-60 hover:opacity-100">
              macOS
            </a>
          </div>

          <div>
            <a :href="STORE_URLS.LINUX" target="_blank" class="opacity-60 hover:opacity-100">
              Linux
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Mobile</h3>
          <div>
            <a :href="STORE_URLS.IOS" target="_blank" class="opacity-60 hover:opacity-100">
              iOS
            </a>
          </div>

          <div>
            <a :href="STORE_URLS.ANDROID" v class="opacity-60 hover:opacity-100">
              Android
            </a>
          </div>

        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Help</h3>

          <div>
            <a href="#faq" class="opacity-60 hover:opacity-100">
              FAQ
            </a>
          </div>

          <div>
            <a :href="REPO_URL + '/tree/main/website/privacy-policy.md'" target="_blank"
              class="opacity-60 hover:opacity-100">
              Privacy policy
            </a>
          </div>

          <div>
            <a :href="REPO_URL + '/issues'" target="_blank"
              class="opacity-60 hover:opacity-100">
              Open an issue
            </a>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section>
        <h3>
          &copy; {{ new Date().getFullYear() }} Developed by
          <a target="_blank" href="https://linkedin.com/in/luca-fornerone-4830661b0"
            class="text-primary transition-all border-primary hover:border-b-2">
            Luca Fornerone
          </a>
        </h3>
      </section>
    </div>
  </footer>
</template>
