/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Plus, Globe, X, Layers, RotateCw, Hash, Calendar, Tag, ExternalLink, Image as ImageIcon, Sparkles, Award, Monitor, LayoutTemplate, User, Mail } from 'lucide-react';

// --- Interfaces ---

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  type: string[];
  description: string;
  linkLive?: string;
  linkBehance: string;
  img?: string;
}

// Tipo para el manejo estricto de categorías
type ProjectCategory = 'all' | 'UX/UI' | 'Graphic' | 'Dev' | 'QA';

// --- Contenido de Texto (Traducciones) ---
const content = {
  en: {
    nav: { works: "Works", about: "About Me", contact: "Contact", cv: "CV" },
    hero: {
      l1: "Crafting",
      l2: "Digital",
      l3: "Experiences",
      bio: "UX/UI Designer specialized in building visual systems and user-centered experiences.",
      location: "Based in Córdoba, Argentina, working global.",
      scroll: "Scroll"
    },
    marquee: ["User Interface", "User Experience", "Web Development", "Graphic Design", "QA Testing"],
    works: { 
      title: "Selected Works", 
      label: "Case",
      filters: { all: "All Projects", "UX/UI": "UX/UI", "Graphic": "Graphic", "Dev": "Development", "QA": "QA & Testing" },
      viewMore: "View Full Archive",
      viewMoreDesc: "Explore all projects",
      emptyTitle: "Coming Soon",
      emptyDesc: "No projects yet in this category. Stay tuned!",
      actions: { live: "View Live Site", behance: "Read Case Study" }
    },
    projects: [
      { 
        id: "01", title: "GameLens", role: "UX/UI Web Responsive", year: "2025", type: ["UX/UI", "Web", "Dev", "Data Analytics"],
        description: "GameLens is an interactive web platform for video game analysis focused on data visualization and exploration. It allows users to analyze key metrics, understand popularity evolution, and detect market trends over time through dynamic charts and a clear, well-structured user experience.",
        linkLive: "https://www.dropbox.com/scl/fi/ybrvano1vv5fomyh38dd7/2025-12-30-16-03-20.mp4?rlkey=isarzczpl5aqdptbinu12j67b&st=06rfnbrz&dl=0", 
        linkBehance: "#" 
      },
      { 
        id: "02", title: "Earthly", role: "Mobile First UX", year: "2025", type: ["UX/UI", "Dev", "Data Analytics"],
        description: "Earthly is a sustainable travel app designed to help conscious travelers discover eco-friendly destinations, experiences, and accommodations. The platform combines intuitive UX/UI with curated content and features like filters, wishlists, and sustainability indicators. One of its key differentiators is the Eco Travel Globe, an interactive visualization that transforms global environmental data into a clear and engaging tool for exploring each country's sustainability.",
        linkLive: "https://earthly-susteinable-app.vercel.app/", linkBehance: "https://www.behance.net/gallery/238545215/Earthly-Sustainable-Travel-Platform",
        img: "/Earthly.jpg"
      },
      { 
        id: "03", title: "Fast Bondi", role: "Mobile App Design", year: "2024", type: ["UX/UI", "Mobile App"],
        description: "Fast Bondi is a mobile application developed in Argentina for people with motor disabilities, aimed at promoting social inclusion in urban travel experiences. The app enables personalized trip management and features an activatable accessibility mode that highlights island stops, ramps, and adapted units, facilitating safe and accessible route planning. Additionally, it includes a news panel with updates on transport, routes, fare changes, and relevant social events. It also integrates a collaborative social network where users share real-time data on unit status and location, fostering an active and supportive community around accessible public transport.",
        linkBehance: "https://www.behance.net/gallery/210804727/Fast-Bondi-Mobile-App",
        img: "/Fast Bondi.jpg"
      },
      { 
        id: "04", title: "Lumeo", role: "Web Design & Code", year: "2025", type: ["UX/UI", "Web Responsive", "Dev"],
        description: "Lumeo is an AI-powered video analytics platform that transforms visual data into actionable insights. Designed to help companies monitor operations, optimize processes, and improve decision-making through a clear, modern, and user-centric interface. The project focuses on communicating complex technology in an accessible way, maintaining visual consistency and usability at every touchpoint.",
        linkLive: "https://lumeo-self.vercel.app/#home", linkBehance: "https://www.behance.net/gallery/234365223/Lumeo-UXUI-Design",
        img: "/Lumeo-2.jpg"
      },
      { 
        id: "05", title: "Vibrix", role: "Graphic Design", year: "2025", type: ["Graphic", "Identity"],
        description: "Vibrix is a digital design agency specializing in visual identity, brand strategy, and interface design. Its approach combines strategic thinking and creativity to transform ideas into clear, consistent, and impact-driven digital experiences. The agency works with businesses and tech projects, developing visual systems, digital products, and future-ready brand solutions.",
        linkBehance: "https://www.behance.net/gallery/239053197/VIBRIX-Digital-Agency-Identity",
        img: "/Vibrix.jpg"
      },
      { 
        id: "06", title: "Allwey Brew", role: "Identity System", year: "2025", type: ["Graphic", "Identity", "Packaging"],
        description: "ALLWEY Brew is a coffee shop inspired by the urban energy of New York, where coffee is lived as part of the city's daily rhythm. The project develops a solid and contemporary visual identity, with a flexible graphic system that is applied coherently across the space, packaging, and communication pieces. The proposal combines an industrial aesthetic with vibrant accents, seeking to convey character, closeness, and an authentic experience that connects the product with the urban environment.",
        linkBehance: "https://www.behance.net/gallery/238974921/ALLWEY-Urban-Coffee-Brand",
        img: "/Allwey.jpg"
      },
      { 
        id: "07", title: "Jornada de Color", role: "Graphic Design", year: "2025", type: ["Graphic", "Social Media"],
        description: "Jornada de Color 2026 is an annual event organized by the 'Spilimbergo' Faculty of Art and Design at the Provincial University of Córdoba. Focused on exploring color as a conceptual and expressive core, it offers an academic and creative meeting space where color is approached through experimentation, visual research, and chromatic diversity, fostering the exchange of ideas among students, educators, and professionals in design and the arts.",
        linkBehance: "https://www.behance.net/gallery/238775891/Jornada-de-Color-2026",
        img: "/Color.jpg"
      },
    ],
    about: {
      title: "About Me",
      bio1: "I'm Ornella, a multidisciplinary designer turning curiosity into robust digital systems.",
      bio2: "With 5 years of journey, I evolved from self-taught passion to rigorous academic training. My profile bridges the gap between Graphic Design aesthetics, UX strategy, and technical precision in QA & Code.",
      label: "Expertise",
      button: "Read full bio",
      overlay: {
        title: "Behind the Pixel",
        p1: "My journey began 5 years ago, driven by pure curiosity and personal projects. What started as a hobby quickly transformed into a professional pursuit. Two years ago, I decided to formalize my path, starting with specialized certifications from Google and LinkedIn.",
        p2: "I earned my Diploma in UX/UI Design from UTN BA (2024) and currently, I am pursuing a degree in Graphic Design at UPC (2nd Year), adding strong theoretical foundations to my digital practice. I believe in continuous learning as the engine of innovation.",
        p3: "In 2025, I expanded my technical horizons by certifying as a QA Tester (Manual & Automation) and Fullstack Developer. I define myself as a lifelong learner; my toolkit never stops growing to build products that are not only beautiful but technically sound.",
        edu: "Education & Certification",
        eduList: [
            { year: "2023", title: "Advanced UX/UI Certification", school: "Coderhouse" },
            { year: "2020", title: "Bachelor of Graphic Design", school: "University of Buenos Aires" }
        ],
        certs: {
          title: "Licenses & Certifications",
          list: [
            { name: "Google UX Design Professional Certificate", issuer: "Coursera", date: "2023" },
            { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", date: "2024" },
            { name: "EF SET English Certificate (C2 Proficient)", issuer: "EF Standard English Test", date: "2022" },
            { name: "Agile Project Management", issuer: "Google", date: "2023" },
            { name: "Foundations of User Experience (UX) Design", issuer: "Google", date: "2023" }
          ]
        }
      }
    },
    skills: {
      label: "Capabilities",
      change: "Change View",
      content: {
        process: {
          title: "My Process",
          desc: "A strategic approach where aesthetics meets functionality. Every pixel has a purpose.",
          items: [
            { 
              num: '01', 
              title: 'UX Research', 
              desc: 'User Interviews, Personas, Journey Maps & Usability Testing.',
              longDesc: "I dive deep into understanding user needs and behaviors. This phase is all about gathering insights that drive informed design decisions.",
              tags: ["User Interviews", "Competitive Audit", "User Personas", "Empathy Maps", "User Journey"]
            },
            { 
              num: '02', 
              title: 'UI Design', 
              desc: 'Design Systems, Visual Identity, Accessibility & Atomic Design.',
              longDesc: "Translating insights into visual languages. I focus on creating scalable design systems and accessible interfaces that are not only beautiful but functional.",
              tags: ["Design Systems", "Typography", "Color Theory", "Accessibility (a11y)", "Atomic Design"]
            },
            { 
              num: '03', 
              title: 'Prototyping', 
              desc: 'Interactive Flows, Micro-interactions (Motion) & Wireframing.',
              longDesc: "Bringing designs to life before coding. I build high-fidelity interactive prototypes to validate founders and interactions.",
              tags: ["High-Fidelity", "Micro-interactions", "User Flows", "Wireframing", "Motion Design"]
            },
            { 
              num: '04', 
              title: 'Development', 
              desc: 'HTML/CSS understanding, QA Testing & Dev Handoff.',
              longDesc: "Bridging the gap between design and code. My technical background ensures that handoffs are smooth and precise.",
              tags: ["Dev Handoff", "QA Testing", "HTML/CSS", "Component Specs", "Collaboration"]
            }
          ]
        },
        hardsoft: {
          title: "Hard & Soft",
          desc: "Balancing technical proficiency with human-centric qualities to deliver complete solutions.",
          items: [
            { 
              num: 'H1', 
              title: 'Hard Skills', 
              desc: 'Wireframing, Information Architecture, Prototyping, Visual Design, Interaction Design, User Testing.',
              longDesc: "The technical foundation of my work. Years of practice have honed these skills to ensure precision and quality in every deliverable.",
              tags: ["Wireframing", "Information Architecture", "Visual Design", "Interaction Design", "User Testing"]
            },
            { 
              num: 'S1', 
              title: 'Soft Skills', 
              desc: 'Empathy, Communication, Critical Thinking, Adaptability, Collaboration, Time Management.',
              longDesc: "The human element. I believe that great products are built by great teams, and clear communication and empathy are key to that success.",
              tags: ["Empathy", "Communication", "Critical Thinking", "Adaptability", "Teamwork"]
            },
             { 
               num: 'H2', 
               title: 'Languages', 
               desc: 'Spanish (Native), English (Advanced/C1).',
               longDesc: "Communication without borders. Fluent in both Spanish and English, enabling collaboration with global teams and understanding diverse user bases.",
               tags: ["Spanish (Native)", "English (C1/Advanced)"]
             },
             { 
               num: 'S2', 
               title: 'Management', 
               desc: 'Agile Methodologies, Scrum Basics, Remote Work Best Practices.',
               longDesc: "Keeping projects on track. Familiar with modern workflows to ensure efficiency and transparency throughout the project lifecycle.",
               tags: ["Agile", "Scrum", "Asana/Jira", "Remote Work", "Sprint Planning"]
             }
          ]
        },
        tools: {
          title: "My Toolkit",
          desc: "The software and technologies I leverage to bring ideas to reality efficiently.",
          items: [
            { 
              num: 'T1', 
              title: 'Design', 
              desc: 'Figma, Adobe XD, Sketch, Photoshop, Illustrator.',
              longDesc: "My digital canvases. Proficient in industry-standard tools for vector design, photo editing, and interface construction.",
              tags: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "InDesign"]
            },
            { 
              num: 'T2', 
              title: 'Prototipado', 
              desc: 'ProtoPie, Principle, After Effects (Lottie).',
              longDesc: "Adding the dimension of time. Tools I use to create complex interactions and animations that delight users.",
              tags: ["ProtoPie", "After Effects", "Lottie", "Principle", "Figma Smart Animate"]
            },
            { 
              num: 'T3', 
              title: 'Organization', 
              desc: 'Notion, Jira, Trello, Miro, Slack, Discord.',
              longDesc: "Keeping chaos at bay. I use these tools to document, plan, and communicate effectively with stakeholders and teammates.",
              tags: ["Notion", "Jira", "Trello", "Miro", "Slack"]
            },
            { 
              num: 'T4', 
              title: 'Code', 
              desc: 'VS Code, HTML5, CSS3/Tailwind, Basic React/Next.js.',
              longDesc: "Speaking the developer's language. I write clean code to build prototypes or personal projects, facilitating better conversations with engineering teams.",
              tags: ["VS Code", "HTML5", "CSS3", "Tailwind", "React", "Git"]
            }
          ]
        }
      }
    },
    footer: { call: "Let's Work", question: "Have an idea in mind?", rights: "All rights reserved." },
    archive: { title: "Project Archive", index: "Index 01", behance: "More on Behance", behanceDesc: "Discover more graphic explorations" }
  },
  es: {
    nav: { works: "Proyectos", about: "Sobre Mí", contact: "Contacto", cv: "CV" },
    hero: {
      l1: "Creando",
      l2: "Experiencias",
      l3: "Digitales",
      bio: "Diseñadora UX/UI especializada en construir sistemas visuales y experiencias centradas en el usuario.",
      location: "Desde Córdoba, Argentina, para el mundo.",
      scroll: "Scroll"
    },
    marquee: ["Interfaz de Usuario", "Experiencia de Usuario", "Desarrollo Web", "Diseño Gráfico", "Testing QA"],
    works: { 
      title: "Proyectos", 
      label: "Caso",
      filters: { all: "Todos", "UX/UI": "UX/UI", "Graphic": "Gráfico", "Dev": "Desarrollo", "QA": "QA & Testing" },
      viewMore: "Ver Archivo Completo",
      viewMoreDesc: "Explorar todos los proyectos",
      emptyTitle: "Próximamente",
      emptyDesc: "Aún no hay proyectos en esta categoría. ¡Pronto habrá novedades!",
      actions: { live: "Ver Sitio", behance: "Ver Case Study" }
    },
    projects: [
      { 
        id: "01", title: "GameLens", role: "UX/UI Web Responsive", year: "2025", type: ["UX/UI", "Web", "Dev", "Data Analytics"],
        description: "GameLens es una plataforma web interactiva de análisis de videojuegos enfocada en la visualización y exploración de datos. Permite analizar métricas clave, entender la evolución de la popularidad y detectar tendencias del mercado a lo largo del tiempo mediante gráficos dinámicos y una experiencia de usuario clara y bien estructurada.",
        linkLive: "https://www.dropbox.com/scl/fi/ybrvano1vv5fomyh38dd7/2025-12-30-16-03-20.mp4?rlkey=isarzczpl5aqdptbinu12j67b&st=06rfnbrz&dl=0", 
        linkBehance: "#",
      },
      { 
        id: "02", title: "Earthly", role: "UX Mobile First", year: "2025", type: ["UX/UI", "Dev", "Data Analytics"],
        description: "Earthly es una app de viajes sustentables diseñada para ayudar a viajeros conscientes a descubrir destinos, experiencias y alojamientos eco-friendly. La plataforma combina UX/UI intuitivo con contenido curado y funcionalidades como filtros, listas de deseos e indicadores de sustentabilidad. Uno de sus diferenciales clave es el Eco Travel Globe, una visualización interactiva que transforma datos ambientales globales en una herramienta clara y atractiva para explorar la sustentabilidad de cada país.",
        linkLive: "https://earthly-susteinable-app.vercel.app/", linkBehance: "https://www.behance.net/gallery/238545215/Earthly-Sustainable-Travel-Platform",
        img: "/Earthly.jpg"
      },
      { 
        id: "03", title: "Fast Bondi", role: "Diseño App Mobile", year: "2024", type: ["UX/UI", "Mobile App"],
        description: "Fast Bondi es una aplicación móvil desarrollada en Argentina para personas con discapacidad motriz, cuyo objetivo principal es promover la inclusión social en la experiencia de viaje en entornos urbanos. La app permite gestionar viajes personalizados y ofrece un modo de accesibilidad activable que destaca paradas con isla, rampas y unidades acondicionadas, facilitando la planificación de trayectos seguros y accesibles. Además, incluye un panel de noticias con información actualizada sobre transporte, recorridos, cambios tarifarios y acontecimientos sociales y políticos relevantes para el contexto de movilidad. Fast Bondi también integra una red social colaborativa, donde las personas usuarias pueden compartir datos en tiempo real sobre el estado de las unidades, horarios de paso y ubicación de los móviles, fomentando una comunidad activa y solidaria alrededor del transporte público accesible.",
        linkBehance: "https://www.behance.net/gallery/210804727/Fast-Bondi-Mobile-App",
        img: "/Fast Bondi.jpg"
      },
      { 
        id: "04", title: "Lumeo", role: "Diseño Web & Código", year: "2025", type: ["UX/UI", "Web Responsive", "Dev"],
        description: "Lumeo es una plataforma de video analytics impulsada por inteligencia artificial que transforma datos visuales en insights accionables. Está pensada para ayudar a las empresas a monitorear operaciones, optimizar procesos y mejorar la toma de decisiones a través de una interfaz clara, moderna y orientada a la experiencia del usuario. El proyecto se enfoca en comunicar tecnología compleja de forma accesible, manteniendo consistencia visual y usabilidad en cada punto de contacto.",
        linkLive: "https://lumeo-self.vercel.app/#home", linkBehance: "https://www.behance.net/gallery/234365223/Lumeo-UXUI-Design",
        img: "/Lumeo-2.jpg"
      },
      { 
        id: "05", title: "Vibrix", role: "Diseño Gráfico", year: "2025", type: ["Graphic", "Identity"],
        description: "Vibrix es una agencia de diseño digital especializada en identidad visual, estrategia de marca y diseño de interfaces. Su enfoque combina pensamiento estratégico y creatividad para transformar ideas en experiencias digitales claras, consistentes y orientadas al impacto. La agencia trabaja con empresas y proyectos tecnológicos, desarrollando sistemas visuales, productos digitales y soluciones de marca con proyección a futuro.",
        linkBehance: "https://www.behance.net/gallery/239053197/VIBRIX-Digital-Agency-Identity",
        img: "/Vibrix.jpg"
      },
      { 
        id: "06", title: "Allwey Brew", role: "Sistema de Identidad", year: "2025", type: ["Graphic", "Identity", "Packaging"],
        description: "ALLWEY Brew es una cafetería inspirada en la energía urbana de Nueva York, donde el café se vive como parte del ritmo diario de la ciudad. El proyecto desarrolla una identidad visual sólida y contemporánea, con un sistema gráfico flexible que se aplica de forma coherente en el espacio, el packaging y las piezas de comunicación. La propuesta combina una estética industrial con acentos vibrantes, buscando transmitir carácter, cercanía y una experiencia auténtica que conecta el producto con el entorno urbano.",
        linkBehance: "https://www.behance.net/gallery/238974921/ALLWEY-Urban-Coffee-Brand",
        img: "/Allwey.jpg"
      },
      { 
        id: "07", title: "Jornada de Color", role: "Diseño Gráfico", year: "2025", type: ["Graphic", "Social Media"],
        description: "La Jornada de Color 2026 es un evento anual organizado por la Facultad de Arte y Diseño “Spilimbergo”, perteneciente a la Universidad Provincial de Córdoba. Está centrado en la exploración del color como eje conceptual y expresivo, y propone un espacio de encuentro académico y creativo donde el color se aborda desde la experimentación, la investigación visual y la diversidad cromática, promoviendo el intercambio de ideas entre estudiantes, docentes y profesionales del diseño y las artes.",
        linkBehance: "https://www.behance.net/gallery/238775891/Jornada-de-Color-2026",
        img: "/Color.jpg"
      },
    ],
    about: {
      title: "Sobre Mí",
      bio1: "Soy Ornella, una diseñadora multidisciplinaria que transforma curiosidad en sistemas digitales robustos.",
      bio2: "Con 5 years de trayectoria, evolucioné de la pasión autodidacta a la formación académica rigurosa. Mi perfil une la estética del Diseño Gráfico, la estrategia UX y la precisión técnica del QA y el código.",
      label: "Habilidades",
      button: "Leer bio completa",
      overlay: {
        title: "Detrás del Pixel",
        p1: "Mi viaje comenzó en la escuela de diseño gráfico, donde me enamoré de las retículas y la tipografía. Pero pronto me di cuenta de que los diseños estáticos no eran suficientes; quería construir sistemas con los que la gente pudiera interactuar.",
        p2: "En los últimos años, he transicionado al espacio de productos digitales, trabajando con startups y empresas establecidas para refinar su presencia digital. Creo que la mejor experiencia de usuario es aquella que se siente invisible: donde el usuario logra su objetivo sin siquiera pensar en la interfaz.",
        p3: "Cuando no estoy diseñando, puedes encontrarme explorando arquitectura brutalista, bebiendo demasiado café o intentando mantener vivas mis plantas.",
        edu: "Educación y Certificaciones",
        eduList: [
            { year: "2023", title: "Certificación Avanzada UX/UI", school: "Coderhouse" },
            { year: "2020", title: "Licenciatura en Diseño Gráfico", school: "Universidad de Buenos Aires" }
        ],
        certs: {
          title: "Certificaciones y Licencias",
          list: [
            { name: "Google UX Design Professional Certificate", issuer: "Coursera", date: "2023" },
            { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", date: "2024" },
            { name: "EF SET English Certificate (C2 Proficient)", issuer: "EF Standard English Test", date: "2022" },
            { name: "Agile Project Management", issuer: "Google", date: "2023" },
            { name: "Foundations of User Experience (UX) Design", issuer: "Google", date: "2023" }
          ]
        }
      }
    },
    skills: {
      label: "Capacidades",
      change: "Cambiar Vista",
      content: {
        process: {
          title: "Mi Proceso",
          desc: "Un enfoque estratégico donde la estética se encuentra con la funcionalidad. Cada píxel tiene un propósito.",
          items: [
            { 
              num: '01', 
              title: 'UX Research', 
              desc: 'Investigación, Entrevistas, Personas y Pruebas de Usabilidad.',
              longDesc: "Profundizo en la comprensión de las necesidades and comportamientos de los usuarios. Esta fase se trata de reunir insights para decisiones de diseño informadas.",
              tags: ["Investigación", "Entrevistas", "Encuestas", "Problem Statement", "Hipótesis", "Auditorías Competitivas", "User Personas", "Mapas de Empatía"]
            },
            { 
              num: '02', 
              title: 'Diseño UI', 
              desc: 'Sistemas de Diseño, Identidad Visual, Accesibilidad y Diseño Atómico.',
              longDesc: "Traduciendo insights en lenguajes visuales. Me enfoco en crear sistemas de diseño escalables e interfaces accesibles que no solo sean bellas, sino funcionales.",
              tags: ["Arquitectura", "Flowcharts", "Sistemas de Diseño", "Tipografía", "Teoría del Color", "Accesibilidad (a11y)", "Diseño Atómico"]
            },
            { 
              num: '03', 
              title: 'Prototipado', 
              desc: 'Flujos Interactivos, Micro-interacciones (Motion) y Wireframing.',
              longDesc: "Dando vida a los diseños antes del código. Construyo prototipos interactivos de alta fidelidad para validar flujos e interacciones.",
              tags: ["Wireframing", "Baja Fidelidad", "Media Fidelidad", "Alta Fidelidad", "Micro-interacciones", "Flujos de Usuario", "Motion Design"]
            },
            { 
              num: '04', 
              title: 'Desarrollo', 
              desc: 'Puente entre diseño y código con precisión técnica y aseguramiento de calidad.',
              longDesc: "Uniendo la brecha entre diseño y código. Mi formación técnica asegura que las entregas sean fluidas y precisas.",
              tags: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind", "TypeScript", "Dev Handoff", "Component Specs", "Collaboration", "QA Testing"]
            }
          ]
        },
        hardsoft: {
          title: "Hard & Soft",
          desc: "Equilibrando la competencia técnica con cualidades humanas para soluciones completas.",
          items: [
            { 
              num: 'H1', 
              title: 'Hard Skills', 
              desc: 'Wireframing, Arquitectura de Info, Prototipado, Diseño Visual, Diseño de Interacción.',
              longDesc: "La base técnica de mi trabajo. Años de práctica han perfeccionado estas habilidades para asegurar precisión y calidad.",
              tags: ["Wireframing", "Arquitectura de Información", "Diseño Visual", "Diseño de Interacción", "User Testing"]
            },
            { 
              num: 'S1', 
              title: 'Soft Skills', 
              desc: 'Empatía, Comunicación, Pensamiento Crítico, Adaptabilidad, Gestión del Tiempo.',
              longDesc: "El elemento humano. Creo que los grandes productos son construidos por grandes equipos, impulsados por la comunicación clara y la empatía.",
              tags: ["Empatía", "Comunicación", "Pensamiento Crítico", "Adaptabilidad", "Trabajo en Equipo"]
            },
             { 
               num: 'H2', 
               title: 'Idiomas', 
               desc: 'Español (Nativo), Inglés (Intermedio/B1).',
               longDesc: "Capacidades de comunicación. Hablante nativa de español con nivel intermedio de inglés, permitiendo la comprensión técnica y colaboración.",
               tags: ["Español (Nativo)", "Inglés (B1/Intermedio)"]
             },
             { 
               num: 'S2', 
               title: 'Gestión', 
               desc: 'Metodologías Ágiles, Nociones de Scrum, Trabajo Remoto.',
               longDesc: "Manteniendo los proyectos en marcha. Familiarizada con flujos de trabajo modernos para asegurar eficiencia y transparencia.",
               tags: ["Agile", "Scrum", "Asana/Jira", "Trabajo Remoto", "Sprint Planning"]
             }
          ]
        },
        tools: {
          title: "Herramientas",
          desc: "El software y las tecnologías que aprovecho para hacer realidad las ideas eficientemente.",
          items: [
            { 
              num: 'T1', 
              title: 'Diseño', 
              desc: 'Figma, Framer, Photoshop, Illustrator, Premiere, InDesign.',
              longDesc: "Mis lienzos digitales. Competente en herramientas estándar para diseño UI, ilustración vectorial, edición de fotos y maquetación.",
              tags: ["Figma", "Framer", "Photoshop", "Illustrator", "Premiere", "InDesign"]
            },
            { 
              num: 'T2', 
              title: 'Prototipado', 
              desc: 'Figma, Framer, Lottie.',
              longDesc: "Añadiendo la dimensión del tiempo. Herramientas que uso para crear interacciones complejas y animaciones.",
              tags: ["Figma", "Framer", "Lottie"]
            },
            { 
              num: 'T3', 
              title: 'Organización', 
              desc: 'Notion, Jira, Trello, ClickUp, Miro, Slack.',
              longDesc: "Manteniendo el caos a raya. Uso estas herramientas para documentar, planificar y comunicar eficazmente.",
              tags: ["Notion", "Jira", "ClickUp", "Trello", "Miro", "Slack"]
            },
            { 
              num: 'T4', 
              title: 'Code', 
              desc: 'VS Code, HTML5, CSS3, React, Next.js, GitHub, Cypress.',
              longDesc: "Hablando el idioma del desarrollador. Escribo código limpio y realizo pruebas para asegurar calidad y escalabilidad.",
              tags: ["VS Code", "HTML5", "CSS3", "React", "GitHub", "Cypress"]
            }
          ]
        }
      }
    },
    footer: { call: "Hablemos", question: "¿Tienes una idea en mente?", rights: "Todos los derechos reservados." },
    archive: { title: "Archivo de Proyectos", index: "Índice 01", behance: "Más en Behance", behanceDesc: "Descubre más exploraciones gráficas" }
  }
};

// --- Componentes Helper ---

const Marquee: React.FC<{ items: string[]; direction?: 'left' | 'right' }> = ({ items, direction = 'left' }) => {
  return (
    <div className="relative flex overflow-hidden py-4 md:py-6 border-y border-white/10 bg-black">
      <div className={`animate-marquee whitespace-nowrap flex gap-8 md:gap-12 ${direction === 'right' ? 'flex-row-reverse' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <span key={index} className="text-2xl md:text-6xl font-light uppercase tracking-tight text-neutral-500 hover:text-white transition-colors duration-700 cursor-default md:cursor-none font-serif italic">
                {item} <span className="mx-2 md:mx-4 not-italic font-sans text-xs align-middle opacity-50">✦</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- App Principal ---

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = content[lang];
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("View");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<'process' | 'hardsoft' | 'tools'>('process');
  
  // Tipado explícito para resolver errores de TS
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [overlayFilter, setOverlayFilter] = useState<ProjectCategory>('all'); 
   
  // ESTADO: Proyecto seleccionado para el detalle
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null); 

  // --- Efecto de Favicon y Título Dinámico ---
  useEffect(() => {
    document.title = "Portfolio de Ornella";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="black"/>
        <path d="M50 20 Q55 45 80 50 Q55 55 50 80 Q45 55 20 50 Q45 45 50 20 Z" fill="white"/>
      </svg>
    `;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = url;
    return () => URL.revokeObjectURL(url);
  }, []);

  // --- Lógica del Cursor Optimizada ---
  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (isAboutOpen || isProjectsOpen || selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isAboutOpen, isProjectsOpen, selectedProject]);

  const projects = t.projects as Project[];

  const filterProjects = (pList: Project[], currentFilter: ProjectCategory) => {
    if (currentFilter === 'all') return pList;
    return pList.filter(p => p.type.some(tag => tag.includes(currentFilter as string)));
  };

  const displayedProjects = filter === 'all' 
    ? projects.slice(0, 4) 
    : filterProjects(projects, filter);

  const overlayProjects = filterProjects(projects, overlayFilter);

  const cycleTabs = () => {
    const tabs = ['process', 'hardsoft', 'tools'] as const;
    const currentIndex = tabs.indexOf(activeSkillTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveSkillTab(tabs[nextIndex]);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white font-sans selection:bg-white/20 selection:text-white md:cursor-none overflow-x-hidden"
      ref={containerRef}
    >
      {/* Cursor Personalizado */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] will-change-transform hidden md:block"
        style={{ 
          transform: 'translate3d(0,0,0)', 
          marginTop: '-12px', 
          marginLeft: '-12px' 
        }}
      >
        <div 
          className={`
            w-6 h-6 bg-white rounded-full mix-blend-difference flex items-center justify-center 
            transition-transform duration-300 ease-out 
            ${isHovering ? 'scale-[3]' : 'scale-100'}
          `}
        >
          {isHovering && (
            <span className="text-[3px] text-black font-bold uppercase tracking-widest animate-fade-in whitespace-nowrap leading-none">
              {hoverText}
            </span>
          )}
        </div>
      </div>

      {/* --- OVERLAY DE DETALLE DE PROYECTO --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[80] bg-black text-white overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-20">
           <button 
             onClick={() => setSelectedProject(null)}
             className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 border border-white/20 rounded-full bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-colors md:cursor-none"
             onMouseEnter={() => { setIsHovering(true); setHoverText("Close"); }}
             onMouseLeave={() => setIsHovering(false)}
           >
             <X className="w-6 h-6" />
           </button>

           <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
             <div className="mb-10 md:mb-16">
               <div className="flex items-baseline gap-4 mb-4">
                 <span className="font-mono text-sm text-neutral-500">0{selectedProject.id}</span>
                 <span className="font-mono text-sm text-neutral-500">— {selectedProject.year}</span>
               </div>
               <h2 className="text-4xl md:text-8xl font-serif italic mb-6 leading-tight">
                 {selectedProject.title}
               </h2>
               <div className="flex flex-col md:flex-row md:items-center gap-4">
                 <span className="text-base md:text-lg font-light text-neutral-300 border-l border-white/30 pl-4">{selectedProject.role}</span>
                 <div className="flex flex-wrap gap-2">
                    {selectedProject.type.map(tag => (
                      <span key={tag} className="text-[10px] border border-white/10 rounded-full px-3 py-1 text-neutral-500 uppercase tracking-wide bg-neutral-900/50">
                        {tag}
                      </span>
                    ))}
                 </div>
               </div>
             </div>

             <div className="w-full aspect-video bg-neutral-900 border border-white/10 mb-10 md:mb-16 flex items-center justify-center relative overflow-hidden group">
                {selectedProject.img ? (
                  <img 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-16 h-16 text-neutral-700 opacity-50" />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-4 py-2 text-xs font-mono text-neutral-400">
                        {selectedProject.title} — Main Preview
                    </div>
                  </>
                )}
             </div>

             <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <div className="md:col-span-7">
                  <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">About the project</h3>
                  <p className="text-base md:text-lg font-light leading-relaxed text-neutral-300">
                    {selectedProject.description}
                  </p>
                </div>
                <div className="md:col-span-5 flex flex-col gap-6">
                   <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Actions</h3>
                   
                   {selectedProject.linkLive && (
                     <a 
                        href={selectedProject.linkLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full border border-white/20 p-4 md:p-6 flex justify-between items-center hover:bg-white hover:text-black transition-all duration-300 md:cursor-none"
                        onMouseEnter={() => { setIsHovering(true); setHoverText("Visit"); }}
                        onMouseLeave={() => setIsHovering(false)}
                     >
                       <span className="font-mono uppercase tracking-widest text-xs md:text-sm flex items-center gap-3">
                         <Monitor className="w-4 h-4" /> {t.works.actions.live}
                       </span>
                       <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                     </a>
                   )}

                   <a 
                     href={selectedProject.linkBehance}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group w-full border border-white/20 p-4 md:p-6 flex justify-between items-center hover:bg-[#1769ff] hover:border-[#1769ff] hover:text-white transition-all duration-300 md:cursor-none"
                     onMouseEnter={() => { setIsHovering(true); setHoverText("Read"); }}
                     onMouseLeave={() => setIsHovering(false)}
                   >
                     <span className="font-mono uppercase tracking-widest text-xs md:text-sm flex items-center gap-3">
                       <LayoutTemplate className="w-4 h-4" /> {t.works.actions.behance}
                     </span>
                     <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                   </a>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* About Overlay */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[60] bg-black text-white overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-20">
           <button 
             onClick={() => setIsAboutOpen(false)}
             className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 border border-white/20 rounded-full bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-colors md:cursor-none"
             onMouseEnter={() => { setIsHovering(true); setHoverText("Close"); }}
             onMouseLeave={() => setIsHovering(false)}
           >
             <X className="w-6 h-6" />
           </button>

           <div className="max-w-4xl mx-auto px-4 md:px-6 py-32 md:py-40">
             <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block">
                {t.nav.about}
             </span>
             <h2 className="text-5xl md:text-8xl font-serif italic mb-10 md:mb-16 leading-tight">
               {t.about.overlay.title}
             </h2>

             <div className="grid md:grid-cols-12 gap-12">
               <div className="md:col-span-8 space-y-8 font-light text-lg md:text-xl leading-relaxed text-neutral-300">
                  <p>{t.about.overlay.p1}</p>
                  <p>{t.about.overlay.p2}</p>
                  <p>{t.about.overlay.p3}</p>
               </div>
               
               <div className="md:col-span-4 border-t border-white/10 pt-8 md:border-t-0 md:pt-0">
                  <h3 className="font-mono text-xs uppercase tracking-widest mb-8 text-white">{t.about.overlay.edu}</h3>
                  <div className="space-y-8">
                    {t.about.overlay.eduList.map((edu, idx) => (
                      <div key={idx} className="group border-l-2 border-white/10 pl-6 py-1 hover:border-white transition-colors duration-300">
                        <span className="text-xs font-mono text-neutral-500 block mb-2 group-hover:text-white transition-colors">{edu.year}</span>
                        <p className="font-medium text-white mb-1 text-lg">{edu.title}</p>
                        <p className="text-sm text-neutral-400 italic font-serif group-hover:text-neutral-300 transition-colors">{edu.school}</p>
                      </div>
                    ))}
                  </div>
               </div>
             </div>

             <div className="mt-24 border-t border-white/10 pt-16">
                <h3 className="font-mono text-xs uppercase tracking-widest mb-12 text-white flex items-center gap-2">
                  <Award className="w-4 h-4" /> {t.about.overlay.certs.title}
                </h3>
                
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                  {Array.from({ length: 21 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="min-w-[250px] md:min-w-[300px] h-[180px] md:h-[200px] bg-neutral-900/50 border border-white/10 p-2 flex items-center justify-center hover:border-white hover:bg-neutral-900 transition-all duration-300 snap-center md:cursor-none group relative overflow-hidden"
                      onMouseEnter={() => { setIsHovering(true); setHoverText("Zoom"); }}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <img 
                        src={`/${idx + 1}.jpg`} 
                        alt={`Certificate ${idx + 1}`} 
                        className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                             (e.target as HTMLImageElement).parentElement!.innerText = "IMG";
                        }}
                      />
                    </div>
                  ))}
                </div>
             </div>
           </div>
        </div>
      )}

      {/* Projects Archive Overlay */}
      {isProjectsOpen && (
        <div className="fixed inset-0 z-[60] bg-black text-white overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-20">
           <button 
             onClick={() => setIsProjectsOpen(false)}
             className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 border border-white/20 rounded-full bg-black/50 backdrop-blur-md hover:bg-white hover:text-black transition-colors md:cursor-none"
             onMouseEnter={() => { setIsHovering(true); setHoverText("Close"); }}
             onMouseLeave={() => setIsHovering(false)}
           >
             <X className="w-6 h-6" />
           </button>

           <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
             <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white mb-12 pb-12">
               <div>
                 <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4 block flex items-center gap-2">
                   <Layers className="w-4 h-4" /> {t.archive.index}
                 </span>
                 <h2 className="text-5xl md:text-8xl font-serif italic mb-8">
                   {t.archive.title}
                 </h2>
                 {/* Overlay Filters */}
                 <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
                    {(['all', 'UX/UI', 'Graphic', 'Dev', 'QA'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setOverlayFilter(f)}
                        className={`px-3 py-1.5 rounded-full border transition-all duration-300 md:cursor-none ${
                          overlayFilter === f 
                            ? 'bg-white text-black border-white' 
                            : 'text-neutral-500 border-white/10 hover:border-white/40 hover:text-white bg-transparent'
                        }`}
                        onMouseEnter={() => { setIsHovering(true); setHoverText("Filter"); }}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {f === 'all' ? (
                          <>
                            <span className="md:hidden">{lang === 'en' ? 'All' : 'Todos'}</span>
                            <span className="hidden md:inline">{t.works.filters.all}</span>
                          </>
                        ) : (
                          t.works.filters[f as keyof typeof t.works.filters] || f
                        )}
                      </button>
                    ))}
                 </div>
               </div>
               <div className="hidden md:block text-right mt-8 md:mt-0">
                 <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Total Projects</p>
                 <p className="text-4xl font-light">{projects.length.toString().padStart(2, '0')}</p>
               </div>
             </div>

             <div className="hidden md:grid grid-cols-12 gap-6 border-b border-white/10 pb-4 mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
               <div className="col-span-1 flex items-center gap-2"><Hash className="w-3 h-3" /> No.</div>
               <div className="col-span-2">Cover</div>
               <div className="col-span-4">Project Name</div>
               <div className="col-span-2">Role</div>
               <div className="col-span-2 flex items-center gap-2"><Tag className="w-3 h-3" /> Type</div>
               <div className="col-span-1 text-right flex items-center justify-end gap-2"><Calendar className="w-3 h-3" /> Year</div>
             </div>

             <div className="space-y-0">
               {overlayProjects.map((project) => (
                 <div 
                   key={project.id}
                   onClick={() => setSelectedProject(project)}
                   className="group relative border-b border-white/10 py-6 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-start md:items-center hover:bg-white/5 transition-all duration-300 md:cursor-none"
                   onMouseEnter={() => { setIsHovering(true); setHoverText("View Case"); }}
                   onMouseLeave={() => setIsHovering(false)}
                 >
                   <div className="md:col-span-1 font-mono text-sm text-neutral-600 group-hover:text-white transition-colors flex justify-between w-full md:w-auto">
                     <span className="md:hidden text-xs uppercase tracking-widest">No. {project.id}</span>
                     <span className="hidden md:inline">{project.id}</span>
                     <span className="md:hidden text-xs text-neutral-500">{project.year}</span>
                   </div>

                   <div className="hidden md:flex col-span-2 h-20 w-full bg-neutral-800/50 rounded-sm overflow-hidden items-center justify-center relative">
                      {project.img ? (
                          <img src={project.img} alt={project.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-neutral-800 animate-pulse opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <ImageIcon className="w-6 h-6 text-neutral-600 opacity-50" />
                        </>
                      )}
                   </div>

                   <div className="w-full md:col-span-4">
                     <h3 className="text-2xl md:text-3xl font-light text-neutral-200 group-hover:text-white transition-colors tracking-tight">
                       {project.title}
                     </h3>
                     <div className="md:hidden flex flex-wrap gap-1 mt-2">
                       {project.type.map(tag => (
                         <span key={tag} className="text-[10px] text-neutral-500 border border-neutral-800 px-1 rounded">{tag}</span>
                       ))}
                     </div>
                   </div>

                   <div className="w-full md:col-span-2 text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-200 transition-colors">
                     {project.role}
                   </div>
                   
                   <div className="hidden md:flex col-span-2 flex-wrap gap-1">
                      {project.type.map(tag => (
                        <span key={tag} className="text-[10px] border border-white/10 rounded-full px-2 py-1 text-neutral-500 uppercase tracking-wide group-hover:border-white/40 group-hover:text-white transition-colors bg-neutral-900/50">
                          {tag}
                        </span>
                      ))}
                   </div>
                   
                   <div className="hidden md:block col-span-1 text-right font-mono text-sm text-neutral-500 group-hover:text-white group-hover:opacity-0 transition-all">
                     {project.year}
                   </div>
                   
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4 hidden md:block">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                   </div>
                 </div>
               ))}

               {overlayProjects.length === 0 && (
                 <div className="py-20 text-center border-b border-white/10">
                    <Sparkles className="w-8 h-8 text-neutral-600 mx-auto mb-4" />
                    <p className="font-serif italic text-2xl text-neutral-500 mb-2">{t.works.emptyTitle}</p>
                    <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest">{t.works.emptyDesc}</p>
                 </div>
               )}

               <a 
                 href="https://www.behance.net/gallery/223073901/Visual-UX-Design-Portfolio" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group relative border-b border-white/10 py-12 flex items-center justify-center hover:bg-[#1769ff]/10 transition-all duration-300 md:cursor-none"
                 onMouseEnter={() => { setIsHovering(true); setHoverText("Behance"); }}
                 onMouseLeave={() => { setIsHovering(false); }}
               >
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xl font-serif italic text-white group-hover:text-[#1769ff] transition-colors">{t.archive.behance}</span>
                    <span className="text-xs font-mono uppercase text-neutral-500 group-hover:text-[#1769ff]/70 transition-colors">{t.archive.behanceDesc}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-[#1769ff] mt-2 transition-colors" />
                 </div>
               </a>
             </div>
           </div>
        </div>
      )}

      {/* Navbar Desktop */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-12 py-6 md:py-8 flex justify-between items-center bg-black backdrop-blur-md border-b border-white/10 md:mix-blend-difference">
        <a href="#" className="group flex flex-col overflow-hidden h-6 z-50 min-w-[120px]">
          <span className="text-sm font-medium tracking-widest uppercase transform group-hover:-translate-y-full transition-transform duration-500 ease-in-out text-white md:text-inherit">
            Portfolio 2026
          </span>
          <span className="text-sm font-serif italic tracking-wider transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-500 ease-in-out text-white md:text-inherit">
            Ornella Lezcano
          </span>
        </a>

        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          <a href="#work" className="text-xs font-mono uppercase tracking-widest hover:text-neutral-400 transition-colors cursor-none" onMouseEnter={() => { setIsHovering(true); setHoverText("Go"); }} onMouseLeave={() => setIsHovering(false)}>
            {t.nav.works}
          </a>
          <a href="#about" className="text-xs font-mono uppercase tracking-widest hover:text-neutral-400 transition-colors cursor-none" onMouseEnter={() => { setIsHovering(true); setHoverText("Go"); }} onMouseLeave={() => setIsHovering(false)}>
            {t.nav.about}
          </a>
          <a href="#contact" className="text-xs font-mono uppercase tracking-widest hover:text-neutral-400 transition-colors cursor-none" onMouseEnter={() => { setIsHovering(true); setHoverText("Go"); }} onMouseLeave={() => setIsHovering(false)}>
            {t.nav.contact}
          </a>
          <a href="#" className="text-xs font-mono uppercase tracking-widest hover:text-neutral-400 transition-colors cursor-none" onMouseEnter={() => { setIsHovering(true); setHoverText("Download"); }} onMouseLeave={() => setIsHovering(false)}>
            {t.nav.cv}
          </a>
        </div>

        <div className="flex items-center gap-6 z-50">
          <div className="hidden md:flex flex-col items-end gap-1 text-[10px] font-mono uppercase tracking-widest opacity-60">
            <span>Ux / Ui Designer</span>
            <span>Available for work</span>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 border border-white/20 rounded-full px-3 py-1 hover:bg-white hover:text-black transition-all duration-300 md:cursor-none bg-black md:bg-transparent"
            onMouseEnter={() => { setIsHovering(true); setHoverText("Switch"); }}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Globe className="w-3 h-3 text-white md:text-inherit" />
            <span className="text-[10px] font-mono font-bold text-white md:text-inherit">{lang === 'en' ? 'ES' : 'EN'}</span>
          </button>
        </div>
      </nav>

      {/* --- Navegación Inferior Móvil --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex justify-between items-center safe-area-bottom">
         <a href="#work" className="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors">
            <Layers className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest">{t.nav.works}</span>
         </a>
         <a href="#about" className="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest">{t.nav.about}</span>
         </a>
         <a href="#contact" className="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-widest">{t.nav.contact}</span>
         </a>
      </div>

      <main className="pt-32 md:pt-40 pb-20 md:pb-0">
        
        {/* 1. HERO */}
        <section className="px-4 md:px-12 mb-20 md:mb-32 relative">
          <div className="max-w-full md:max-w-[90vw]">
            <h1 className="flex flex-col text-[13vw] md:text-[11vw] leading-[0.9] md:leading-[0.85] tracking-tighter mix-blend-difference relative z-10"
                onMouseEnter={() => { setIsHovering(true); setHoverText("Hello"); }}
                onMouseLeave={() => setIsHovering(false)}>
              
              <span className="font-light text-neutral-300 hover:text-white transition-colors duration-700">
                {t.hero.l1}
              </span>
              
              <div className="flex items-center gap-2 md:gap-12 ml-[2vw] md:ml-[10vw]">
                <span className="font-serif italic font-light text-neutral-500 hover:text-white transition-colors duration-700 transform hover:skew-x-6 inline-block">
                  {t.hero.l2}
                </span>
                <div className="h-[1px] flex-grow bg-white/20 mt-2 md:mt-4"></div>
              </div>

              <span className="text-right font-normal hover:text-neutral-400 transition-colors duration-700">
                {t.hero.l3}
              </span>
            </h1>
          </div>

          <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-8">
            <div className="max-w-md space-y-4">
              <p className="font-light text-lg leading-relaxed text-neutral-300">
                {t.hero.bio}
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {t.hero.location}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 self-end md:self-auto">
               <span className="text-[10px] font-mono uppercase opacity-50">{t.hero.scroll}</span>
               <ArrowDown className="animate-bounce w-5 h-5 text-neutral-600 font-thin" />
            </div>
          </div>
        </section>

        {/* 2. MARQUEE */}
        <div className="py-12 md:py-20 opacity-80">
          <Marquee items={t.marquee} />
        </div>

        {/* 3. TRABAJOS */}
        <section id="work" className="px-4 md:px-12 py-16 md:py-20 scroll-mt-24">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 md:mb-20 border-b border-white/10 pb-4 gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <h2 className="font-serif italic text-2xl text-neutral-400">{t.works.title}</h2>
              <span className="font-mono text-xs text-neutral-600">({displayedProjects.length.toString().padStart(2, '0')})</span>
            </div>
            
            <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest justify-start xl:justify-end">
              {(['all', 'UX/UI', 'Graphic', 'Dev', 'QA'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full border transition-all duration-300 md:cursor-none ${
                    filter === f
                      ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                      : 'text-neutral-500 border-white/10 hover:border-white/40 hover:text-white bg-transparent'
                  }`}
                  onMouseEnter={() => { setIsHovering(true); setHoverText("Filter"); }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {f === 'all' ? (
                    <>
                      <span className="md:hidden">{lang === 'en' ? 'All' : 'Todos'}</span>
                      <span className="hidden md:inline">{t.works.filters.all}</span>
                    </>
                  ) : (
                    t.works.filters[f as keyof typeof t.works.filters] || f
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-0">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group relative border-b border-white/10 py-8 md:py-12 transition-all duration-500 md:cursor-none hover:pl-4"
                  onMouseEnter={() => { setIsHovering(true); setHoverText(t.works.label); }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between relative z-10 px-2 transition-transform duration-500">
                    <div className="flex flex-col">
                       <span className="text-xs font-mono text-neutral-600 mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-wide">
                         {project.type.join(" • ")}
                       </span>
                       <h3 className="text-4xl md:text-7xl font-light tracking-tight text-neutral-300 group-hover:text-white transition-colors duration-300">
                         {project.title}
                       </h3>
                    </div>
                    
                    <div className="flex items-end justify-between md:justify-start gap-12 mt-4 md:mt-0">
                      <div className="flex flex-col md:text-right opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                        <span className="text-sm font-medium text-white">{project.role}</span>
                        <span className="text-xs font-mono text-neutral-500">{project.year}</span>
                      </div>
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-neutral-600 group-hover:text-white transition-all duration-500 group-hover:rotate-45" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-b border-white/10">
                  <Sparkles className="w-8 h-8 text-neutral-600 mx-auto mb-4" />
                  <p className="font-serif italic text-2xl text-neutral-500 mb-2">{t.works.emptyTitle}</p>
                  <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest">{t.works.emptyDesc}</p>
              </div>
            )}
            
            {filter === 'all' && displayedProjects.length > 0 && (
              <div 
                className="group relative border-b border-white/10 py-12 transition-all duration-500 md:cursor-none hover:bg-white/5 flex items-center justify-center"
                onMouseEnter={() => { setIsHovering(true); setHoverText("All"); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <button 
                  onClick={() => setIsProjectsOpen(true)}
                  className="flex flex-col items-center gap-4 md:cursor-none w-full"
                >
                   <span className="text-3xl md:text-5xl font-serif italic text-neutral-400 group-hover:text-white transition-colors duration-300">
                     {t.works.viewMore}
                   </span>
                   <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                     {t.works.viewMoreDesc}
                   </span>
                   <Plus className="w-6 h-6 text-neutral-600 group-hover:text-white transition-all duration-500 group-hover:rotate-90 mt-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. SOBRE MÍ + HABILIDADES */}
        <section id="about" className="py-20 md:py-32 px-4 md:px-12 bg-black scroll-mt-24">
          <div className="grid md:grid-cols-12 gap-12 mb-20 md:mb-32">
             <div className="md:col-span-4">
               <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4 block">
                 {t.nav.about}
               </span>
               <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-8">
                 {t.about.title}
               </h2>
             </div>
             <div className="md:col-span-8 space-y-6">
                <p className="text-xl md:text-3xl font-light leading-relaxed text-neutral-200">
                  {t.about.bio1}
                </p>
                <p className="text-neutral-400 font-light leading-relaxed max-w-2xl text-base md:text-lg">
                  {t.about.bio2}
                </p>
                <button 
                  onClick={() => setIsAboutOpen(true)}
                  className="mt-8 group flex items-center gap-2 text-white border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-colors md:cursor-none"
                  onMouseEnter={() => { setIsHovering(true); setHoverText("Click"); }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="text-sm uppercase tracking-widest">{t.about.button}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
             </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 md:sticky md:top-32 h-fit">
              <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4 block">{t.skills.label}</span>
              
              <button
                onClick={cycleTabs}
                className="mb-8 group flex items-center gap-2 text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 md:cursor-none w-fit"
                onMouseEnter={() => { setIsHovering(true); setHoverText("Click"); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xs font-mono uppercase tracking-widest">{t.skills.change}</span>
              </button>

              <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-4 animate-fade-in key-title">
                {t.skills.content[activeSkillTab].title}
              </h2>
              <p className="font-light text-neutral-400 text-sm leading-loose max-w-xs animate-fade-in key-desc">
                {t.skills.content[activeSkillTab].desc}
              </p>
            </div>
            
            <div className="md:col-span-8 grid md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
              {t.skills.content[activeSkillTab].items.map((step, i) => (
                <div 
                  key={`${activeSkillTab}-${i}`} 
                  className="group flex flex-col gap-6 border-t border-white/10 pt-8 hover:border-white/40 transition-colors duration-500 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" 
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-xs text-neutral-600">({step.num})</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light mb-2 text-white">{step.title}</h3>
                    <p className="text-neutral-400 font-serif italic mb-4 text-sm md:text-base">{step.desc}</p>
                    <p className="text-neutral-500 font-light text-sm leading-relaxed mb-6">
                        {step.longDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => (
                            <span key={tag} className="text-[10px] border border-white/10 rounded-full px-2 py-1 text-neutral-500 uppercase tracking-wide group-hover:border-white/30 group-hover:text-neutral-400 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer id="contact" className="px-4 md:px-12 pt-10 md:pt-32 pb-20 md:pb-12 mt-10 md:mt-20 scroll-mt-24 border-t border-white/5">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-serif italic text-neutral-500 mb-8 text-lg md:text-xl">{t.footer.question}</p>
            <a 
              href="mailto:ornellalezcano1100@gmail.com" 
              className="group md:cursor-none relative z-20 inline-block"
              onMouseEnter={() => { setIsHovering(true); setHoverText("Mail"); }}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="text-[12vw] md:text-[10vw] font-light uppercase tracking-tighter text-white/90 group-hover:text-white transition-colors duration-300 break-all md:break-normal">
                {t.footer.call}
              </span>
              <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-700 ease-in-out"></div>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-40 text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-mono gap-8 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
              <a href="https://www.linkedin.com/in/ornellalezcano/" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.behance.net/ornellalezcano" target="_blank" className="hover:text-white transition-colors">Behance</a>
              <a href="https://dribbble.com/OrneLezcano" target="_blank" className="hover:text-white transition-colors">Dribbble</a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
               <a href="mailto:ornellalezcano1100@gmail.com" className="hover:text-white transition-colors lowercase border-b border-white/30 hover:border-white pb-0.5">ornellalezcano1100@gmail.com</a>
               <p className="opacity-50 hidden md:block">© 2026 Portfolio. {t.footer.rights}</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}