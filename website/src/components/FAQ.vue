<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'Is Sharefi free to use?',
    answer:
      'Yes, completely. Sharefi is 100% free and open source. There are no hidden subscription fees, data caps, or locked premium features.',
    value: 'item-1',
  },
  {
    question: 'How do I choose which files to share with others?',
    answer:
      'You can easily manage this through the My shares section in the app. It allows you to pick the exact files or folders you want to make visible to other devices on your local network.',
    value: 'item-2',
  },
  {
    question: 'Do I need an active internet connection to use Sharefi?',
    answer:
      'No, not at all. Sharefi operates 100% offline. It routes all data directly through your local Wi-Fi or Ethernet network using high-speed peer-to-peer technology, meaning your transfers work perfectly even if the internet goes completely down.',
    value: 'item-3',
  },
  {
    question: 'Are my files shared with anyone outside my local network?',
    answer:
      'Absolutely not. Sharefi functions entirely offline and establishes direct peer-to-peer connections between your devices. Your data never touches the cloud, external tracking scripts, or third-party servers. It strictly stays within your private local network.',
    value: 'item-4',
  },
  {
    question: 'Is it safe to use Sharefi on a public or shared Wi-Fi network?',
    answer:
      'Yes. The local backend server runs entirely on HTTPS, ensuring that all communication and data streams between devices are fully encrypted.',
    value: 'item-5',
  },
];
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        Common Questions
      </h2>
    </div>

    <Accordion type="single" collapsible class="AccordionRoot">
      <AccordionItem v-for="{ question, answer, value } in FAQList" :key="value" :value="value">
        <AccordionTrigger class="text-left"> {{ question }} </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
