"use client";

import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("#home");

  const navLinks = [
    { name: "Home", id: "#home" },
    { name: "About", id: "#about" },
    { name: "Skills", id: "#skills" },
    { name: "Learning", id: "#learning" },
    { name: "Side Quests", id: "#side-quests" },
    { name: "Links", id: "#links" },
  ];

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-100 text-gray-900 font-sans flex flex-col selection:bg-blue-200 relative text-xl">
      
      {/* Overall Background Image with Alpha 0.6 and Blur */}
      <div 
        className="absolute inset-0 bg-[url('/bg_notes.jpg')] bg-cover bg-center bg-fixed pointer-events-none z-0 blur-[2px]" 
        style={{ opacity: 0.6 }}
      ></div>

      {/* Navigation */}
      <nav className="w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm relative">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-gray-800">Soroush Baghernezhad</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-500">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => setActiveSection(link.id)} 
                className={`transition-colors duration-300 hover:text-blue-600 ${
                  activeSection === link.id ? 'text-blue-700 font-bold border-b-2 border-blue-600 pb-1' : 'pb-1 border-b-2 border-transparent'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Nav Dropdown/Select */}
          <div className="md:hidden">
            <select 
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            >
              {navLinks.map(link => (
                <option key={link.id} value={link.id}>{link.name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Acts as a slider/tab container */}
      <div className="flex-1 relative overflow-hidden z-10">
        
        {/* Home Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#home' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <div className="min-h-full py-20 px-6 flex flex-col items-center">
            
            <section className="text-center mb-20 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                  Hi, I'm Soroush.
                </h1>
              </div>
              <h2 className="text-xl md:text-2xl text-blue-800 font-bold bg-white/70 px-6 py-3 rounded-xl inline-block backdrop-blur-sm shadow-sm">
                ML Researcher @ UCML Lab | Software Engineer | Mobile Developer
              </h2>
            </section>

            <section className="w-full max-w-5xl mb-20">

              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Research Focus</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-10 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100/80 rounded-lg flex items-center justify-center mb-6 text-blue-700 border border-blue-200 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Synthetic Bio-Signal Generation</h3>
                  <p className="text-gray-900 leading-relaxed font-medium">
                    My current research focuses on generating highly accurate synthetic data for EMG and IMU signals. 
                    By leveraging state-of-the-art architectures like VQ-VAEs and decoder-only transformers, 
                    this work aims to significantly improve the training and responsiveness of prosthetic control systems.
                  </p>
                </div>
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-10 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100/80 rounded-lg flex items-center justify-center mb-6 text-blue-700 border border-blue-200 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">EMG and IMU Gesture Recognition</h3>
                  <p className="text-gray-900 leading-relaxed mb-8 font-medium">
                    A comparative study evaluating the performance of electromyography (EMG) and inertial measurement unit (IMU) sensors for hand gesture recognition.
                  </p>
                  <a href="https://arxiv.org/abs/2512.07997" target="_blank" className="inline-flex items-center gap-2 text-blue-800 font-bold hover:text-blue-900 transition-colors bg-white/60 px-4 py-2 rounded-lg border border-gray-300 shadow-sm">
                      Read on arXiv 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                  </a>
                </div>
              </div>
            
            </section>

            <section className="w-full max-w-6xl">

              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Selected Projects</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Space Invaders on STM32",
                    desc: "Implemented Space Invaders on an STM32 microcontroller using FreeRTOS.",
                    img: "/space_invaders_on_stm32.jpg",
                    link: "https://github.com/soroush-bn/space-invaders-freeRTOS-STM32"
                  },
                  {
                    title: "Just Climb!",
                    desc: "A platform for climbers built with React, Next.js, and FastAPI. Focused on MVVM and microservices architecture.",
                    img: "/just_climb.jpg",
                    link: "https://github.com/soroush-bn/just-climb"
                  },
                  {
                    title: "Tennis-ball Collector",
                    desc: "Hackathon-winning robot that uses computer vision to find and collect tennis balls.",
                    img: "/tennis_ball_collector.jpg",
                    link: null
                  },
                  {
                    title: "Lumon Simulator",
                    desc: "A C++ text-based game inspired by Severance where players find and 'tame' abnormal numbers, built to practice OOP and SDL3.",
                    img: "/sdl3.gif",
                    link: "https://github.com/soroush-bn/lumon-simulator"
                  },
                  {
                    title: "Gemini Job Agent",
                    desc: "An automated pipeline that searches for jobs and researches companies using Google Gemini AI, generating tailored CVs and cover letters.",
                    img: "https://placehold.co/400x300/e2e8f0/475569?text=Gemini+Job",
                    link: "https://github.com/soroush-bn/gemini-job"
                  },
                  {
                    title: "Coin Ranking",
                    desc: "A cryptocurrency Android application developed in Kotlin using the Coinranking API. Built during my internship at Part Software.",
                    img: "/coinranking_bg.png",
                    link: "https://github.com/soroush-bn/coinranking"
                  },
                  {
                    title: "Cloud Monolith to Microservice",
                    desc: "A blog application demonstrating the transition from a monolithic architecture to a microservices-based system using Kotlin and Spring Boot.",
                    img: "/cloud_bg.jpg",
                    link: "https://github.com/soroush-bn/cloud-monolith-to-microservice"
                  }
                ].map((p, i) => (
                  <div key={i} className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                    <div className="relative overflow-hidden h-48 bg-gray-200 border-b border-gray-300">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{p.title}</h3>
                      <p className="text-gray-900 text-sm leading-relaxed mb-6 flex-grow font-medium">{p.desc}</p>
                      {p.link && (
                        <a href={p.link} target="_blank" className="inline-flex items-center gap-2 text-blue-800 font-bold text-sm hover:text-blue-900 transition-colors bg-white/60 px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-fit">
                          View on GitHub
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            
            </section>

          </div>
        </div>

        {/* About Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#about' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">About Me</h2>
              <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl text-left">

                <p className="text-lg text-gray-900 leading-relaxed mb-6 font-medium">
                  It was 2016, I got accepted in the second round of the ICPC programming constest in Tehran. This experience led me to choose computer engineering for my bachelor's degree. In the first years of my undergrad, I got interested in Java and how beautiful OOP is. Then I had an internship at biggest Software company in eastern Iran, Where I got into working with kotlin which is an upgraded version of Java in my opinion. I got hired at Part Software group and worked with a great talents there as a mobile developer.  
                   </p>
                <p className="text-lg text-gray-900 leading-relaxed mb-6 font-medium">
                 My last years of undergrad were more focused on machine learning and AI in general. I had the chance of getting an honor project working with model based reinforcement learning. After that I joined Done Company (former Huma) as a Datascientist. This was at the same time as LLMs showing up and we were trying to make the first Persian voice assistant for smart tvs, and we succeeded. It was a challenging and new experience but I learned a lot about MLops and machine learning at scale, we had to make sure our models could serve +60,000 users. 
                                 </p>
                <p className="text-lg text-gray-900 leading-relaxed font-medium">
                 In 2024, I moved to Canada to pursue my master's degree at Memorial University, where I am currently a research assistant at the UCML Lab. My research focuses on synthetic data generation for bio-signals using 
                 discrete representation and conditioned sequence modeling. I'm eager to apply my research skills and engineering mindset to some real world problems in the industry. If you feel like my experience can help you, or your projects, please don't hesitate to reach out!
                                 </p>

                                 <p>

                                  p.s. About the background image, these are my notes from courses I took online due to covid lockdowns, I had some fundamental courses like Computer Architecture, Linear Algebra, and Differential Equations. No generative AI... just pure chaos and scrap papers and so much free time trying to solve diffrential equations and caluculating eigen values! 
                                 </p>
              
              </div>
            </div>
          </section>
        </div>

        

        

        {/* Skills Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#skills' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Technical Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { category: "Software Development", skills: ["React", "React Native", "Next.js", "Fast API", "Android", "MVVM", "SOLID", "CI/CD"] },
                  { category: "Machine Learning", skills: ["PyTorch", "TensorFlow", "Keras", "NumPy", "Pandas", "Matplotlib"] },
                  { category: "Programming Languages", skills: ["Java", "Python", "C", "C++", "Kotlin", "SQL", "Bash"] },
                  { category: "Architectures & Models", skills: ["Transformers", "LLMs", "Time Series", "LSTM", "VAE", "GAN", "CNN", "RL"] },
                  { category: "Infrastructure & Tools", skills: ["Docker", "Kubernetes", "AWS", "Firebase", "Git", "Jenkins"] },
                  { category: "Hardware Development", skills: ["Zephyr", "RTOS", "STM32", "Arduino", "Raspberry Pi", "FPGA"] }
                ].map((group) => (
                  <div key={group.category} className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-6 rounded-2xl hover:shadow-lg transition-shadow">
                    <h3 className="text-blue-900 font-bold mb-4 tracking-wide border-b border-gray-300 pb-2">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/60 text-gray-900 rounded-md text-sm border border-gray-300 font-bold shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Learning Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#learning' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Continuous Learning</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl flex flex-col h-full hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Deep Learning: CS 182</h3>
                  <p className="text-gray-900 text-sm mb-6 flex-grow font-medium">Spring 2021 by Sergey Levine</p>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-900 mb-2 font-bold">
                      <span>Progress</span>
                      <span>27 / 66 videos</span>
                    </div>
                    <div className="w-full bg-gray-300/50 rounded-full h-2 border border-gray-300">
                      <div className="bg-blue-600 h-1.5 rounded-full mt-[1px] ml-[1px]" style={{ width: `calc(${(27/66)*100}% - 2px)` }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl flex flex-col h-full hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Deep Learning Book</h3>
                  <a href="https://www.deeplearningbook.org/" target="_blank" className="text-blue-800 font-bold hover:text-blue-900 text-sm mb-6 flex-grow flex items-center gap-1 w-fit bg-white/60 px-3 py-1.5 rounded-lg border border-gray-300 shadow-sm">
                    deeplearningbook.org
                  </a>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-900 mb-2 font-bold">
                      <span>Progress</span>
                      <span>Chapter 1 / 20</span>
                    </div>
                    <div className="w-full bg-gray-300/50 rounded-full h-2 border border-gray-300">
                      <div className="bg-blue-600 h-1.5 rounded-full mt-[1px] ml-[1px]" style={{ width: `calc(${(1/20)*100}% - 2px)` }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl flex flex-col h-full hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Amazon Cloud Practitioner</h3>
                  <p className="text-gray-900 text-sm mb-6 flex-grow font-medium">Certification Prep</p>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-900 mb-2 font-bold">
                      <span>Progress</span>
                      <span>6.1 / 14.0 hrs</span>
                    </div>
                    <div className="w-full bg-gray-300/50 rounded-full h-2 border border-gray-300">
                      <div className="bg-blue-600 h-1.5 rounded-full mt-[1px] ml-[1px]" style={{ width: `calc(${(6.1/14)*100}% - 2px)` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Side Quests Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#side-quests' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-xl shadow-sm inline-block mx-auto flex justify-center w-fit border border-gray-200">Side Quests</h2>
              <p className="text-gray-900 font-bold text-center mb-12 max-w-2xl mx-auto bg-white/70 px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm border border-gray-200">When I step away from the keyboard, I'm usually exploring and looking for new experiences to recharge.</p>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Hiking the East Coast</h3>
                  <p className="text-gray-900 mb-6 font-medium">Cobblers Path. Hiking this scenic trail for hours in a misty, chilly, and sunny morning!</p>
                  <div className="overflow-hidden rounded-xl border border-gray-300 bg-gray-200">
                      <img src="https://i.postimg.cc/bJQVmSHM/photo-2026-02-25-09-51-57.jpg" alt="Hiking" className="w-full h-64 object-cover mix-blend-multiply opacity-90" />
                  </div>
                </div>
                <div className="bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Baking</h3>
                  <p className="text-gray-900 mb-6 font-medium">Nothing like baking a Barbari (Iranian Traditional Bread) without a recipe! Very rewarding.</p>
                  <div className="overflow-hidden rounded-xl border border-gray-300 bg-gray-200">
                      <img src="https://i.postimg.cc/nrdPbbjx/photo-2026-02-25-09-53-24.jpg" alt="Baking" className="w-full h-64 object-cover mix-blend-multiply opacity-90" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Links Section */}
        <div className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-in-out ${activeSection === '#links' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-8 pointer-events-none'}`}>
          <section className="min-h-full flex flex-col items-center justify-center py-20 px-6">
            <div className="max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 bg-white/70 px-8 py-3 rounded-xl backdrop-blur-sm inline-block shadow-sm border border-gray-200">Get in Touch</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { name: "GitHub", href: "https://github.com/soroush-bn" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/soroushbaghernezhad/" },
                  { name: "Email", href: "mailto:sbaghernezha@mun.ca" }
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" className="px-8 py-3 bg-[url('/paper_bg.jpg')] bg-cover bg-center border border-gray-300 shadow-md rounded-xl font-bold text-gray-900 hover:shadow-lg hover:text-blue-800 hover:border-blue-300 transition-all block">
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <footer className="mt-auto py-8 text-center text-gray-800 font-bold text-sm bg-white/70 px-8 py-3 rounded-xl backdrop-blur-sm shadow-sm border border-gray-200">
              <p>&copy; 2026 Soroush Baghernezhad. All rights reserved.</p>
            </footer>
          </section>
        </div>

      </div>
    </main>
  );
}
