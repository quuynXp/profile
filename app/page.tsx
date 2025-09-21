"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Server,
  Globe,
  ChevronDown,
  Calendar,
  GraduationCap,
  User,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  Building,
  ExternalLink,
  X,
  ZoomIn,
  Play,
} from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const TypewriterText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Image Modal Component with Carousel
const ImageModal = ({
  images,
  initialIndex,
  alt,
  isOpen,
  onClose,
}: {
  images: string[]
  initialIndex: number
  alt: string
  isOpen: boolean
  onClose: () => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${alt} ${currentIndex + 1}`}
              fill
              className="object-contain rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Video Modal Component
const VideoModal = ({
  src,
  isOpen,
  onClose,
}: {
  src: string
  isOpen: boolean
  onClose: () => void
}) => {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <video
          className="w-full h-full object-contain rounded-lg"
          src={src}
          controls
          autoPlay
        />
      </motion.div>
    </motion.div>
  )
}

// Personal photos for carousel
const personalPhotos = [
  {
    src: "/hoc-bong.jpg",
    alt: "Working at desk",
    caption: "Coding at my workspace",
  },
  {
    src: "/linked.png",
    alt: "Tech presentation",
    caption: "Presenting at tech meetup",
  },
  {
    src: "/github.png",
    alt: "Team collaboration",
    caption: "Team collaboration session",
  },
  {
    src: "/nttu.webp",
    alt: "Learning and studying",
    caption: "Continuous learning",
  },
]

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    skills: [
      {
        name: "Java",
        description: "Enterprise applications, Spring ecosystem",
      },
      {
        name: "C++",
        description: "System programming, algorithms",
      },
      {
        name: "JavaScript",
        description: "Full-stack development, Node.js",
      },
      {
        name: "TypeScript",
        description: "Type-safe frontend development",
      },
    ],
    color: "bg-blue-500",
  },
  {
    title: "Frameworks & Libraries",
    icon: <Server className="w-5 h-5" />,
    skills: [
      {
        name: "Spring Boot",
        description: "Microservices, REST APIs, Security",
      },
      {
        name: "ReactJS",
        description: "Modern UI development, hooks",
      },
      {
        name: "Node.js",
        description: "Backend services, Express.js",
      },
      {
        name: "ASP.NET",
        description: "Web applications, MVC architecture",
      },
    ],
    color: "bg-green-500",
  },
  {
    title: "Databases & Storage engines",
    icon: <Database className="w-5 h-5" />,
    skills: [
      {
        name: "PostgreSQL",
        description: "Advanced queries, optimization",
      },
      {
        name: "MySQL",
        description: "Database design, indexing",
      },
      {
        name: "MongoDB",
        description: "NoSQL, document databases",
      },
      {
        name: "Redis",
        description: "Caching, session management",
      },
    ],
    color: "bg-purple-500",
  },
  {
    title: "Tools & Platforms",
    icon: <Globe className="w-5 h-5" />,
    skills: [
      {
        name: "Docker",
        description: "Containerization, orchestration",
      },
      {
        name: "Git",
        description: "Version control, collaboration",
      },
      {
        name: "Kafka",
        description: "Event streaming, messaging",
      },
      {
        name: "AWS",
        description: "Cloud services, deployment",
      },
    ],
    color: "bg-orange-500",
  },
]

const projects = [
  {
    title: "LinguaMonkey - Platform learning language online",
    date: "Aug 2025",
    image: "/icon_lingua.png",
    demoImages: ["/create_room.jpg", "/Progress_learn.jpg", "/Writing_learn.jpg", "/Join_room_list.jpg", "/chat_setting.jpg"],
    demoVideo: "https://drive.google.com/file/d/13PscLVp7tP3A5auJsVk1K55XBpBBjpCH/view?usp=drive_link",
    githubUrl: "https://github.com/quuynXp/LinguaMonkey",
    description:
      "A full-stack AI-powered language learning application with real-time interaction, advanced progress tracking, and gamification features.",
    detailedDescription:
      "LinguaMonkey is a comprehensive language-learning platform combining a Spring Boot backend, React Native Expo frontend, and a Python FastAPI AI service. The system integrates speech-to-text via Whisper Transformer, AI feedback with OpenAI, and asynchronous communication using gRPC. Redis ensures high-performance caching, PostgreSQL provides structured persistence, and Cloudinary manages scalable media storage. Security is enforced with JWT authentication, role-based access control, and token-bucket rate limiting.",
    technologies: [
      "Spring Boot",
      "React Native Expo",
      "PostgreSQL",
      "Redis",
      "Docker",
      "gRPC",
      "FastAPI",
      "OpenAI API",
      "Whisper Transformer",
      "Cloudinary",
      "Firebase",
      "Zustand",
      "React query",
      "RSA"
    ],
    highlights: [
      "Designed and implemented a scalable monolithic backend with modular architecture",
      "Integrated AI-driven speech and text analysis using FastAPI + Whisper Transformer + OpenAI",
      "Built secure JWT-based authentication with access/refresh tokens, revocation, and role-permission system",
      "Implemented Redis caching layer to optimize performance and reduce database load",
      "Developed real-time WebSocket chat with reactions, message history, and group conversations",
      "Integrated Jitsi Meet for group video calls and collaborative learning sessions",
      "Implemented gamification system with badges, leaderboards, EXP, and streak tracking",
      "Deployed all services with Docker Compose for reproducible development environments"
    ],
    metrics: {
      performance: "High concurrency support with Redis caching and async gRPC communication",
      scalability: "Designed for 50+ database tables across multiple functional domains",
      engagement: "Gamification features (EXP, streaks, leaderboards) increase retention",
    }
  },
  {
    title: "Patient Management System",
    date: "May 2025",
    image: "/patient1.png",
    demoImages: ["/patient2.png", "/patient3.png", "/patient4.png", "/patient5.png"],
    demoVideo: "https://drive.google.com/file/d/13PscLVp7tP3A5auJsVk1K55XBpBBjpCH/view?usp=drive_link",
    githubUrl: "https://github.com/quuynXp/Patient-Management",
    description:
      "A sophisticated healthcare management platform built with microservices architecture, focusing on patient data security, appointment scheduling, and medical record management.",
    detailedDescription:
      "This HIPAA-compliant system showcases expertise in healthcare software development with emphasis on data security, scalability, and user experience. The platform integrates with external medical systems and provides comprehensive analytics for healthcare providers.",
    technologies: ["Spring Boot", "PostgreSQL", "Docker", "Git", "Spring Security", "JPA", "Swagger"],
    highlights: [
      "Developed secure patient management system with HIPAA compliance standards",
      "Implemented advanced appointment scheduling algorithm with conflict resolution",
      "Built comprehensive medical history tracking with audit trails",
      "Created RESTful APIs with OpenAPI documentation using Swagger",
      "Designed database schema optimization reducing query time by 40%",
      "Integrated with external medical systems using HL7 FHIR standards",
      "Implemented role-based access control for different user types",
      "Delivered functional modules with comprehensive testing achieving 95% coverage",
    ],
    metrics: {
      performance: "40% faster queries",
      coverage: "95% test coverage",
      security: "HIPAA compliant",
    },
  },
  {
    title: "Restaurant Web Application",
    date: "February 2025",
    image: "/korean.png",
    demoImages: ["/restaurant.png", "/korean1.png", "/restaurant1.png", "/restaurant2.png", "/restaurant3.png"],
    demoVideo: "https://drive.google.com/file/d/13PscLVp7tP3A5auJsVk1K55XBpBBjpCH/view?usp=drive_link",
    githubUrl: "https://github.com/quuynXp/Restaurant_Korean",
    description:
      "A comprehensive full-stack restaurant management system built with modern microservices architecture, featuring real-time order processing, inventory management, and customer engagement tools.",
    detailedDescription:
      "This enterprise-level application demonstrates advanced backend development skills with Spring Boot microservices, event-driven architecture using Apache Kafka, and containerized deployment. The system handles high-concurrency scenarios with optimized database queries and implements robust security measures including JWT authentication and role-based access control.",
    technologies: ["Spring Boot", "ReactJS", "MySQL", "Docker", "Kafka", "gRPC", "Redis", "JWT"],
    highlights: [
      "Architected and developed a scalable microservices ecosystem with 8+ independent services",
      "Implemented real-time order processing using Apache Kafka for event streaming",
      "Built RESTful APIs and gRPC services for inter-service communication",
      "Designed responsive React frontend with real-time updates using WebSocket connections",
      "Integrated Redis caching layer reducing database queries by 60%",
      "Deployed using Docker Compose with automated CI/CD pipeline",
      "Achieved 99.9% uptime with comprehensive monitoring and logging",
      "Implemented comprehensive unit and integration testing with 95% code coverage",
      "https://koreankuisine.vercel.app"
    ],
    metrics: {
      performance: "99.9% uptime",
      coverage: "95% test coverage",
      efficiency: "60% query reduction",
    },
  },
  {
    title: "Employee Management System",
    date: "Jan 2024",
    image: "/placeholder.svg",
    demoImages: [],
    demoVideo: "",
    githubUrl: "https://github.com/quuynXp/Employee-Management",
    description: "A desktop application built with Java Swing following the MVC architecture. The system supports full CRUD operations for employees, salary calculation, and data import/export from Excel files.",
    detailedDescription: "Desktop app for employee management with MVC architecture, supporting CRUD, salary calculation, and Excel integration.",
    technologies: ["Java Swing", "MVC", "JDBC", "MySQL", "Apache POI", "Maven"],
    highlights: ["Add, update, delete, search employees", "Calculate monthly salary", "Import/export from Excel", "Uses MySQL database"],
    metrics: {}
  },
  {
    title: "Spam Email Classification",
    date: "Mar 2025",
    image: "/placeholder.svg",
    demoImages: [],
    demoVideo: "",
    githubUrl: "https://github.com/quuynXp/Spam-email-classification",
    description: "A machine learning project to classify emails as spam or non-spam using text mining techniques in WEKA. Evaluates C4.5 (J48) and Naive Bayes on 5,180 emails.",
    detailedDescription: "ML-based spam classification using WEKA, with J48 and Naive Bayes algorithms on preprocessed email dataset.",
    technologies: ["WEKA", "J48", "Naive Bayes", "Text Mining"],
    highlights: ["98% accuracy with full dataset", "Evaluated with percentage splits", "Text preprocessing to ARFF", "Competitive results across algorithms"],
    metrics: {accuracy: "Up to 98%"}
  },
  {
    title: "Hako – Shop Management System",
    date: "Apr 2025",
    image: "/placeholder.svg",
    demoImages: [],
    demoVideo: "",
    githubUrl: "https://github.com/HakoTeam/hako-app",
    description: "A modern shop management platform built with Spring Boot for managing employees, customers, inventory, invoicing, analytics, and support.",
    detailedDescription: "End-to-end shop management with RBAC, multi-store support, inventory tracking, sales analytics, and REST API.",
    technologies: ["Spring Boot", "PostgreSQL", "Spring Security", "Apache POI", "Swagger"],
    highlights: ["Employee & role management", "Inventory & product management", "Analytics & reports", "Customer support chatbox"],
    metrics: {}
  },
  {
    title: "WebFashion - Fashion Web Application",
    date: "Jun 2025",
    image: "/placeholder.svg",
    demoImages: ["/web_fashion1.png", "/web_fashion2.png", "/web_fashion3.png" ],
    demoVideo: "",
    githubUrl: "https://github.com/quuynXp/Web_Fashion",
    description: "Web application for fashion stores using ASP.NET MVC with VNPay QR payment integration.",
    detailedDescription: "E-commerce site with product management, cart, orders, users, and sandbox payment.",
    technologies: ["ASP.NET MVC", "Entity Framework", "SQL Server", "VNPay", "Bootstrap"],
    highlights: ["Product management", "Shopping cart & orders", "Online payment via VNPay QR", "User management"],
    metrics: {}
  }
]

const workExperience = [
  {
    company: "CNPT Technology Company",
    position: "Back-end Developer",
    period: "Jun - Sep 2025",
    location: "Da Nang City",
    companyLogo: "/cnpt_logo.png",
    companyImages: ["/cnpt.png", "/cnpt_office1.png", "/cnpt_office2.png"],
    responsibilities: [
      "Designed and implemented core backend services: Evidence, Support, and Incident management systems using Spring Boot and PostgreSQL",
      "Built micro-service communication with Kafka (event-driven) and gRPC",
      "Used Clean Code for REST full service calls across microservices",
      "Created micro-service authentication using JWT (with RSA encryption) and APIs",
      "Collaborated in an Agile Scrum team, participating in daily standups and sprint reviews",
      "Managed version control with Git, handled API requests and resolved code conflicts",
      "Successfully completed internship with an 'Excellent' performance review",
    ],
  },
]

const PhotoCarousel = ({ photos }: { photos: typeof personalPhotos }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoSlideInterval, setAutoSlideInterval] = useState<NodeJS.Timeout | null>(null)

  const startAutoSlide = () => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 15000)
    setAutoSlideInterval(interval)
  }

  const stopAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
      setAutoSlideInterval(null)
    }
  }

  const resetAutoSlide = () => {
    stopAutoSlide()
    startAutoSlide()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    resetAutoSlide()
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    resetAutoSlide()
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [photos.length])

  return (
    <>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setModalImage({ images: photos.map(photo => photo.src), index: currentIndex, alt: photos[currentIndex].alt })}
          >
            <Image
              src={photos[currentIndex].src || "/placeholder.svg"}
              alt={photos[currentIndex].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-medium">{photos[currentIndex].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                resetAutoSlide()
              }}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalImage, setModalImage] = useState<{
    images: string[]
    index: number
    alt: string
  } | null>(null)
  const [modalVideo, setModalVideo] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "gallery", "about", "experience", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <motion.div
              className="text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              TNQ
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["hero", "gallery", "about", "experience", "skills", "projects", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${activeSection === section ? "text-purple-400" : "text-white/70 hover:text-white"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
          >
            <motion.div variants={fadeInUp} className="relative inline-block mb-8">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                    <Image
                      src="/profile-photo.jpg"
                      alt="Thai Ngoc Quyen"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold text-white mb-4">
              Thai Ngoc
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {" "}
                Quyen
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl text-purple-300 mb-8 font-light">
              Java Back-end Developer
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed text-justify"
            >
              <TypewriterText
                text="Passionate about clean architecture, scalable systems, and team collaboration. Actively looking for a full-time role to apply my skills in enterprise-grade backend systems and continue learning new technologies while contributing to impactful projects."
                delay={30}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-8 py-3 bg-transparent"
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "/ThaiNgocQuyen_CV.pdf"
                  link.download = "Thai_Ngoc_Quyen_CV.pdf"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 bg-transparent"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      <section id="gallery" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Personal <span className="text-purple-400">Gallery</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <PhotoCarousel photos={personalPhotos} />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              About <span className="text-purple-400">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <User className="w-6 h-6 text-purple-400 mr-3" />
                      <h3 className="text-2xl font-semibold text-white">Professional Summary</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-6">
                      As a dedicated Java Back-end Developer, I specialize in building robust, scalable systems using
                      modern technologies and best practices. My experience spans from microservices architecture to
                      full-stack development, with a strong focus on clean code and efficient solutions.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">1</div>
                        <div className="text-sm text-white/70">Years Experience</div>
                      </div>
                      <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">10+</div>
                        <div className="text-sm text-white/70">Projects Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-5 h-5 text-purple-400 mr-3" />
                      <h4 className="text-lg font-semibold text-white">Education</h4>
                    </div>
                    <div className="text-white/80">
                      <div className="font-medium">Bachelor of Engineering in Information Technology</div>
                      <div className="text-sm text-purple-300">Nguyen Tat Thanh University, Ho Chi Minh City</div>
                      <div className="text-sm text-white/60">Expected Graduation: Feb 2026 — GPA: 8.0/10</div>
                      <div className="text-sm text-green-400 mt-2">
                        🏆 Academic Encouragement Scholarship (2023, 2024)
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Globe className="w-5 h-5 text-purple-400 mr-3" />
                      <h4 className="text-lg font-semibold text-white">Languages</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Vietnamese</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          Native
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">English</span>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          Intermediate
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Work <span className="text-purple-400">Experience</span>
            </h2>

            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-6">
                      <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-white/10 flex items-center justify-center">
                            <Image
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={`${job.company} logo`}
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{job.position}</h3>
                            <div className="flex items-center text-purple-300 mb-1">
                              <Building className="w-4 h-4 mr-2" />
                              {job.company}
                            </div>
                            <div className="flex items-center text-white/60 text-sm">
                              <MapPin className="w-4 h-4 mr-2" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-purple-400 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          {job.period}
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        <div className="grid grid-cols-2 gap-2">
                          {job.companyImages.map((img, idx) => (
                            <div key={idx} className="w-full h-24 rounded-lg overflow-hidden group relative">
                              <Image
                                src={img || "/placeholder.svg"}
                                alt={`${job.company} image ${idx + 1}`}
                                width={200}
                                height={100}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                                onClick={() => setModalImage({ images: job.companyImages, index: idx, alt: `${job.company} office` })}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Separator className="mb-6 bg-white/10" />
                    <div className="space-y-3">
                      {job.responsibilities.map((responsibility, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p className="text-white/80 leading-relaxed">{responsibility}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Technical <span className="text-purple-400">Skills</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className={`p-2 rounded-lg ${category.color} mr-3`}>{category.icon}</div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {category.skills.map((skill, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                          >
                            <div className="flex-1">
                              <div className="text-white font-medium mb-1">{skill.name}</div>
                              <p className="text-white/60 text-xs leading-relaxed">{skill.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Featured <span className="text-purple-400">Projects</span>
            </h2>

            <div className="space-y-12">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                                {project.date}
                              </Badge>
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="w-4 h-4 text-white" />
                              </motion.a>
                            </div>
                          </div>

                          <p className="text-white/80 mb-6 leading-relaxed">{project.description}</p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Key Highlights:</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {project.highlights.slice(0, 4).map((highlight, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ x: -20, opacity: 0 }}
                                  whileInView={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                                  viewport={{ once: true }}
                                  className="flex items-start"
                                >
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <p className="text-white/70 text-sm leading-relaxed">{highlight}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-purple-400/50 text-purple-300 hover:bg-purple-400/20"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            <Button
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                              onClick={() => window.open(project.githubUrl, "_blank")}
                            >
                              <Github className="w-4 h-4 mr-2" />
                              View on GitHub
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                              onClick={() => setModalVideo(project.demoVideo)}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              View Demo
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={`${project.title} main interface`}
                              width={500}
                              height={300}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                              onClick={() => setModalImage({
                                images: [project.image, ...project.demoImages],
                                index: 0,
                                alt: `${project.title} interface`
                              })}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {project.demoImages.map((img, idx) => (
                              <div key={idx} className="w-full h-20 rounded-lg overflow-hidden group relative">
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`${project.title} demo ${idx + 1}`}
                                  width={200}
                                  height={100}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                  onClick={() => setModalImage({
                                    images: [project.image, ...project.demoImages],
                                    index: idx + 1,
                                    alt: `${project.title} interface`
                                  })}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                                  <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Get In <span className="text-purple-400">Touch</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                      <div className="space-y-4">
                        <motion.a
                          href="tel:0373730397"
                          className="flex items-center text-white/80 hover:text-purple-400 transition-colors"
                          whileHover={{ x: 10 }}
                        >
                          <Phone className="w-5 h-5 mr-3" />
                          0373730397
                        </motion.a>
                        <motion.a
                          href="mailto:quyen1024@gmail.com"
                          className="flex items-center text-white/80 hover:text-purple-400 transition-colors"
                          whileHover={{ x: 10 }}
                        >
                          <Mail className="w-5 h-5 mr-3" />
                          quyen1024@gmail.com
                        </motion.a>
                        <motion.div className="flex items-center text-white/80" whileHover={{ x: 10 }}>
                          <MapPin className="w-5 h-5 mr-3" />
                          Alley Phan Dang Luu, District 12, Ho Chi Minh City
                        </motion.div>
                      </div>

                      <Separator className="my-6 bg-white/10" />
                      <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                      <div className="flex space-x-4">
                        <motion.a
                          href="https://github.com/quuynXp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-6 h-6 text-white" />
                        </motion.a>
                        <motion.a
                          href="https://www.linkedin.com/in/ngoc-quyen-thai/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="w-6 h-6 text-white" />
                        </motion.a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Let's Work Together</h3>
                      <p className="text-white/80 mb-6 leading-relaxed">
                        I'm actively seeking opportunities to contribute to innovative projects and grow as a backend
                        developer. Whether you have a project in mind or just want to connect, I'd love to hear from
                        you!
                      </p>
                      <div className="space-y-4">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          onClick={() => window.open("mailto:quyen1024@gmail.com", "_blank")}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = "/cv-thai-ngoc-quyen.pdf"
                            link.download = "Thai_Ngoc_Quyen_CV.pdf"
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download CV
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                          onClick={() => window.open("https://github.com/quuynXp", "_blank")}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View GitHub
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white/60">
            <p>&copy; 2025 Thai Ngoc Quyen. All rights reserved.</p>
            <p className="text-sm mt-2">Built with Next.js, Tailwind CSS, and Framer Motion</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {modalImage && (
          <ImageModal
            images={modalImage.images}
            initialIndex={modalImage.index}
            alt={modalImage.alt}
            isOpen={!!modalImage}
            onClose={() => setModalImage(null)}
          />
        )}
        {modalVideo && (
          <VideoModal
            src={modalVideo}
            isOpen={!!modalVideo}
            onClose={() => setModalVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}