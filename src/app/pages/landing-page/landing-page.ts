import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {Splitter} from 'primeng/splitter';
import { RouterLink } from '@angular/router';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Editor} from 'primeng/editor';
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";

interface Sense {
  glosses: string[];
  pos: string[];
}

interface Result {
  kanji?: { form: string }[];
  readings?: { reading: string }[];
  senses: Sense[];
}

interface Post {
  display_name: string;
  description: string;
}

interface Stat {
  icon: string;
  title: string;
  description: string;
}

interface Contact {
  name: string;
  company: string;
  email: string;
  budget: string;
  message: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, ToggleSwitchModule, AvatarModule,
    StyleClassModule, Splitter, Tab, TabList, TabPanel, TabPanels, Tabs, Editor, IconField, InputIcon, RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  features: string[] = ['Handcrafted Prompts with native speakers examples', 'Built in translator and sentence analyzer', 'Dictionary and grammar search with a click of a button', '...and much more!'];

  // Prompt Info Display
  promptDescription: string[] = [
    "The reason for studying a language is a very personal thing. For some people it may have been something they picked up to have fun. Other reasons could be wanting to connect with friends and family. What made you want to pursue learning Japanese?",
    "Anyways, write in as much detail about your journey and reason for learning Japanese. Welcome to Kakugo"
  ]
  promptQuestions: string[] = [
    "What first exposed you to Japanese? (anime, travel, music?)",
    "What made you want to pursue Japanese seriously?",
    "How do you see yourself using the language in the future?",
    "What does being fluent mean to you?"
  ]

  activeTab = signal('0');
  activeTab_grammar = signal('0');

  searchText: string = '覚悟'
  stats: Stat[] = [
    {
      icon: 'pi pi-users',
      title: '83M',
      description: 'Nostrum laborum accusamus quia iste facere possimus.'
    },
    {
      icon: 'pi pi-chart-line',
      title: '$256K',
      description: 'Nostrum laborum accusamus quia iste facere possimus.'
    },
    {
      icon: 'pi pi-globe',
      title: '1,453',
      description: 'Nostrum laborum accusamus quia iste facere possimus.'
    },
    {
      icon: 'pi pi-map',
      title: '45 km',
      description: 'Nostrum laborum accusamus quia iste facere possimus.'
    }
  ];

  posts: Post[] = [
    {
      display_name: 'KoKonuts',
      description: '私は日本の番組を見たかったから、日本語の勉強を始めました。アニメだけじゃなくて、バラエティのショーも見たかったです。そして、音楽ももっと分かるようになりたかったです。だから、今は聞くことが私の一番上手なスキルだと思います。でも、話すことと書くことはまだ少し苦手です。いい具合に、日本人の友達とよく会話とメールをします。大学のおかげで、日本人の留学生と話す機会が増えました。次の目標は自分の考えをことをもっと上手く表現できるようになることです。そのために、文法と語彙力を磨きたいと思います。これからも頑張ります!'
    },
    {
      display_name: 'A',
      description: '私が英語を学び始めた理由は、世界中のいろいろな人たちとコミュニケーションを取れるようになりたかったからです。英語は、世界で最もユニバーサルな言語だと思います。英語を使えるようになれば、英語圏以外の人たちともコミュニケーションをとることができ、自分の世界が広がると考えました。'
    }
  ];

  results: Result[] = [
    {
      kanji: [{ form: '覚悟' }],
      readings: [{ reading: 'かくご' }],
      senses: [
        { glosses: ['readiness', '(mental) preparedness'], pos: ['n', 'vs', 'vt'] },
        { glosses: ['resolution', 'determination'], pos: ['n', 'vs', 'vt'] },
        { glosses: ['resignation (to one\'s fate)'], pos: ['n', 'vs', 'vt'] },
      ]
    },
    {
      kanji: [{ form: '覚悟を決める' }],
      readings: [{ reading: 'かくごをきめる' }],
      senses: [
        { glosses: ['to resolve oneself', 'to prepare oneself (for the worst)'], pos: ['exp', 'v1'] },
      ]
    }
  ];

  timelineItems = [
    {
      id: 1,
      title: 'Choose a prompt',
      description: 'Choose from our library of over 30+ prompts.',
      image: 'https://wrwtjkxcjubxlpadntkw.supabase.co/storage/v1/object/public/website_images/Landing2.png',
      details: [
        {
          title: 'Prepare - ',
          text: 'Each prompt prepares you for a variety of situations you may encounter such as formal writing, basic conversations, and more'
        },
      ],
      imageWidth: '23rem'
    },
    {
      id: 2,
      title: 'Start Writing',
      description: 'We provide a variety of tools to assist with writing',
      image: 'https://wrwtjkxcjubxlpadntkw.supabase.co/storage/v1/object/public/website_images/Landing3.png',
      details: [
        {
          title: 'Learn by Example - ',
          text: "Read Native Speakers' and Learners responses to help shape yours."
        },
        {
          title: 'Dictionary and Translations - ',
          text: ' Forgot a word? Not a problem, look it up without switching tabs'
        }
      ],
      imageWidth: '14rem'
    },
    {
      id: 3,
      title: 'Get Feedback',
      description: 'Improve your writing over time with our automatic text analyzations',
      image: 'https://wrwtjkxcjubxlpadntkw.supabase.co/storage/v1/object/public/website_images/Landing5.png',
      details: [
        {
          title: 'Learn by mistakes - ',
          text: 'Suggestions on your writing with clear markers to show where you can improve'
        },
      ],
      imageWidth: '25rem'
    }
  ];

  scrollToSection(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
