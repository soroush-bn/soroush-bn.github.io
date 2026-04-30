"use client";

import { MatrixRain } from "../components/MatrixRain";
import { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";

export default function Home() {
  const [fallingLink, setFallingLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          if (activeSection !== id && !fallingLink) {
            setActiveSection(id);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [activeSection, fallingLink]);

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only handle internal links
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const text = e.currentTarget.textContent || "";
      
      const targetSection = document.querySelector(targetId);
      const targetTitle = targetSection?.querySelector('h1, h2');
      
      if (targetSection && targetTitle) {
        setFallingLink(targetId);

        // Trigger pause and word-falling effect
        window.dispatchEvent(new CustomEvent('matrix:pause'));
        
        window.dispatchEvent(new CustomEvent('matrix:spawn-trail', { 
          detail: { 
            x: rect.left, 
            y: rect.top,
            targetX: (window.innerWidth / 2) - ((text.length * 9) / 2),
            targetY: window.innerHeight / 2,
            text: text 
          } 
        }));

        // Smooth scroll to the target title center
        targetTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset link visibility and resume rain after a delay
        setTimeout(() => {
          setFallingLink(null);
          setActiveSection(targetId);
          window.dispatchEvent(new CustomEvent('matrix:resume'));
          
          // Second scroll: move title to the top after 0.5s so user sees the hand-off
          setTimeout(() => {
            targetTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500);
        }, 2500);
      }
    }
  };

  const navLinks = [
    { name: "Home", id: "#home" },
    { name: "Research", id: "#research" },
    { name: "Projects", id: "#projects" },
    { name: "Skills", id: "#skills" },
    // { name: "Blogs", id: "#blogs" },
    { name: "Side Quests", id: "#side-quests" },
    { name: "Links", id: "#links" },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      {/* Matrix Background Effect */}
      <MatrixRain />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-white">Soroush Baghernezhad</div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-400">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={link.id} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className={`hover:text-cyan-400 transition-all duration-300 ${fallingLink === link.id ? 'opacity-0 translate-y-4' : 'opacity-100'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className={`relative z-10 pt-20 transition-all duration-700 ${fallingLink ? 'blur-md opacity-30 scale-[0.98]' : 'blur-0 opacity-100 scale-100'}`}>
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <div className={`flex flex-col md:flex-row items-center justify-center gap-8 mb-6 transition-opacity duration-300 ${fallingLink === '#home' ? 'opacity-0' : 'opacity-100'}`}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src="/me.jpg" 
                  alt="Soroush Baghernezhad" 
                  className="relative w-48 md:w-64 h-auto rounded-2xl border-2 border-gray-800"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                Hi, I'm Soroush /soʊˈruːʃ/.
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl text-cyan-400 font-mono mb-10 tracking-tight">
              Computer Science Master | Machine Learning Engineer | Software Developer
            </h2>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl text-left">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Since 2016 that I went to the programming competition for the first time, until today which is 10 years later, I have been always passionate about learning about computer science world and it was never enough. 
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                What I love about this field is that you see a problem first and you think its impossible to solve it, but then you divide it into small pieces and you solve each piece like a puzzle and after many hours of work, debugging and sometimes frustration, you finally 
                solve the problem and this is so rewarding for me.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I had this motive back of my mind when I was doing my bachelors and when I was working in industry and that was the reason I persued my masters in computer science. 
                Now that I'm graduating, I am sure that I can use my engineering skills to solve real world problems in different domains.
              </p>
            </div>
            
            <div className="mt-12 animate-bounce opacity-50">
                <a href="#research" className="text-gray-500 hover:text-white transition-colors">
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
             <h2 className={`text-3xl font-bold mb-16 text-center text-white flex items-center justify-center gap-4 transition-opacity duration-300 ${fallingLink === '#research' ? 'opacity-0' : 'opacity-100'}`}>
                <span className="h-px w-12 bg-gray-800"></span>
                Research
                <span className="h-px w-12 bg-gray-800"></span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-10 rounded-2xl hover:bg-gray-900/60 transition-colors group">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Synthetic Bio-Signal Generation for Prosthetic Control</h3>
                <p className="text-gray-400 leading-relaxed">
                  My current research focuses on generating highly accurate synthetic data for EMG and IMU signals. 
                  By leveraging state-of-the-art architectures like VQ-VAEs and decoder-only transformers, 
                  this work aims to significantly improve the training and responsiveness of prosthetic control systems.
                </p>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-10 rounded-2xl hover:bg-gray-900/60 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">A Comparative Study of EMG- and IMU-based Gesture Recognition</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  A recent preprint evaluating and comparing the performance of electromyography (EMG) and inertial measurement unit (IMU) sensors for hand gesture recognition.
                </p>
                <a href="https://arxiv.org/abs/2512.07997" target="_blank" className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                    Read on arXiv 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
             <h2 className={`text-3xl font-bold mb-16 text-center text-white flex items-center justify-center gap-4 transition-opacity duration-300 ${fallingLink === '#projects' ? 'opacity-0' : 'opacity-100'}`}>
                <span className="h-px w-12 bg-gray-800"></span>
                Projects
                <span className="h-px w-12 bg-gray-800"></span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Space Invaders on STM32",
                  desc: "We implemented Space Invaders on an STM32 microcontroller using FreeRTOS. It was super challenging and fun!",
                  img: "https://i.postimg.cc/ZRDJHgbh/photo-2026-02-25-10-58-24.jpg",
                  link: "https://github.com/soroush-bn/space-invaders-freeRTOS-STM32"
                },
                {
                  title: "Just Climb!",
                  desc: "A platform for climbers, gym owners, and enthusiasts. Built with React, Next.js, and FastAPI. Focused on MVVM and microservices architecture.",
                  img: "https://placehold.co/150x150/1e293b/94a3b8?text=Coming+Soon",
                  link: "https://github.com/soroush-bn/just-climb"
                },
                {
                  title: "Tennis-ball collector robot",
                  desc: "Hackathon-winning robot that finds and collects tennis balls. Used Raspberry Pi, computer vision, 3D printing and 'creative' engineering.",
                  img: "https://i.postimg.cc/d1SJ6XsQ/photo-2026-02-25-10-58-19.jpg",
                  link: null
                }
              ].map((p, i) => (
                <div key={i} className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 group flex flex-col h-full">
                  <div className="relative overflow-hidden h-52">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-white">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
                    {p.link && (
                      <a href={p.link} target="_blank" className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors">
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
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-3xl font-bold mb-16 text-center text-white flex items-center justify-center gap-4 transition-opacity duration-300 ${fallingLink === '#skills' ? 'opacity-0' : 'opacity-100'}`}>
                <span className="h-px w-12 bg-gray-800"></span>
                Skills
                <span className="h-px w-12 bg-gray-800"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { 
                  category: "Software Development", 
                  skills: ["React", "React Native", "Next.js", "Fast API", "Hilt", "Room", "Coroutines", "Flow", "Worker", "Service", "Gradle", "Compose", "Navigation", "Paging", "Firebase", "Widgets", "SOLID Principles", "Design Patterns", "MVVM", "Dependency Injection", "Generics"] 
                },
                { 
                  category: "Machine Learning", 
                  skills: ["PyTorch", "TensorFlow", "Tf-lite", "Keras", "NumPy", "Pandas", "Matplotlib"] 
                },
                { 
                  category: "Programming Language", 
                  skills: ["Java", "Python", "C", "C++", "Kotlin", "SQL", "UNIX Shell Scripting"] 
                },
                { 
                  category: "Deployment", 
                  skills: ["Docker", "Kubernetes", "AWS (EC2, S3, IAM, VPC)", "Jenkins (CI/CD)", "Git"] 
                },
                { 
                  category: "Architectures", 
                  skills: ["Generative Models", "LLMs", "Transformers", "Time Series", "LSTM", "VAE", "GAN", "CNN", "RNN", "VQ-VAE", "ViT", "Diffusion models", "DQN", "PPO", "LangChain"] 
                },
                { 
                  category: "Hardware Development", 
                  skills: ["Zephyr", "West", "FPGA", "RTOS", "STM32", "Arduino", "Raspberry Pi", "Jetson Nano", "esp32", "nRF series"] 
                },
                { 
                  category: "Testing", 
                  skills: ["TDD", "Unit test", "Integration test", "End-to-end tests"] 
                },
                { 
                  category: "Interpersonal", 
                  skills: ["Agile Development", "Problem Solving", "Team Collaboration", "Rapid Learning"] 
                }
              ].map((group) => (
                <div key={group.category} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors">
                  <h3 className="text-cyan-400 font-mono mb-6 uppercase tracking-wider text-sm">{group.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs font-mono border border-gray-700/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        {/* <section id="blogs" className="py-32 px-6 bg-black/40">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-3xl font-bold mb-16 text-center text-white flex items-center justify-center gap-4 transition-opacity duration-300 ${fallingLink === '#blogs' ? 'opacity-0' : 'opacity-100'}`}>
                <span className="h-px w-12 bg-gray-800"></span>
                Blogs
                <span className="h-px w-12 bg-gray-800"></span>
            </h2>
            <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <a href="blog/agentic-ai.html" className="flex-none w-[350px] group">
                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden group-hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <img src="https://placehold.co/600x400/0891b2/ffffff?text=Agentic+AI" alt="Agentic AI" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="p-8">
                    <span className="text-xs text-cyan-500 font-mono uppercase tracking-widest">April 18, 2026</span>
                    <h3 className="text-xl font-bold mt-3 mb-4 group-hover:text-cyan-400 transition-colors leading-tight">Agentic AI: The Future of Autonomous Systems</h3>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">Exploring the shift from traditional AI models to goal-oriented, autonomous agents that can act and reason.</p>
                    <span className="inline-block mt-6 text-cyan-400 font-bold text-sm group-hover:translate-x-1 transition-transform">Read More →</span>
                  </div>
                </div>
              </a>
              <div className="flex-none w-[350px] border border-dashed border-gray-800 rounded-2xl flex items-center justify-center text-gray-600 font-mono">
                More posts coming soon...
              </div>
            </div>
          </div>
        </section> */}

        {/* Side Quests Section */}
        <section id="side-quests" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
             <h2 className={`text-3xl font-bold mb-4 text-center text-white flex items-center justify-center gap-4 transition-opacity duration-300 ${fallingLink === '#side-quests' ? 'opacity-0' : 'opacity-100'}`}>
                <span className="h-px w-12 bg-gray-800"></span>
                Side Quests
                <span className="h-px w-12 bg-gray-800"></span>
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto leading-relaxed">When I step away from the keyboard, I'm usually outside exploring and looking for new experiences to level up my character.</p>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-8 rounded-3xl group">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Hiking the East Coast</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">Here is my favorite trail of all time, Cobblers Path. We hiked this scenic trail for hours in a misty, chilly and at the same time sunny morning!</p>
                <div className="overflow-hidden rounded-2xl border border-gray-800">
                    <img src="https://i.postimg.cc/bJQVmSHM/photo-2026-02-25-09-51-57.jpg" alt="Hiking" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-8 rounded-3xl group">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Baking good stuff</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">Nothing like baking a Barbari (Iranian Traditional Bread) without a recipe! One of the most rewarding side quests.</p>
                <div className="overflow-hidden rounded-2xl border border-gray-800">
                    <img src="https://i.postimg.cc/nrdPbbjx/photo-2026-02-25-09-53-24.jpg" alt="Baking" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section id="links" className="py-40 px-6 bg-black/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-16 text-white transition-opacity duration-300 ${fallingLink === '#links' ? 'opacity-0' : 'opacity-100'}`}>Links</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: "GitHub", href: "https://github.com/soroush-bn", color: "hover:border-white hover:text-white" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/soroushbaghernezhad/", color: "hover:border-blue-400 hover:text-blue-400" },
                { name: "Email", href: "mailto:sbaghernezha@mun.ca", color: "hover:border-cyan-400 hover:text-cyan-400" }
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" className={`px-10 py-4 bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl font-bold transition-all duration-300 text-gray-300 ${link.color} hover:-translate-y-1`}>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-16 border-t border-gray-900 text-center text-gray-600 text-sm font-mono">
          <p>&copy; 2026 Soroush Baghernezhad. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
