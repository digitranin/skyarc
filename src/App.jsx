import React, { useState, useEffect } from 'react';
import { 
  Home, Building, DollarSign, BarChart, MessageSquare, 
  FileText, Send, MessageCircle, TrendingUp, PieChart, Calendar,
  Table, Shield, Star, MapPin, Eye, X, CheckCircle, Clock, AlertCircle,
  Search, Filter, Download, Edit, Trash2, User, Phone, Mail, ArrowRight, 
  ChevronDown, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data
const projectsData = [
  {
    id: 1,
    name: "Skyline Towers",
    description: "Luxury residential complex with panoramic city views and modern amenities",
    status: "In Progress",
    roi: 12.5,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    location: "Rome, Italy",
    completion: 75,
    investment: "$2.5M",
    totalUnits: 120,
    soldUnits: 89,
    startDate: "2023-01-15",
    expectedCompletion: "2025-12-30",
    projectManager: "Rajesh Kumar",
    architect: "Smith & Associates"
  },
  {
    id: 2,
    name: "Green Valley Resort",
    description: "Eco-friendly resort with sustainable architecture and luxury facilities",
    status: "Completed",
    roi: 15.2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    location: "Florence, Italy",
    completion: 100,
    investment: "$4.2M",
    totalUnits: 85,
    soldUnits: 85,
    startDate: "2022-03-10",
    expectedCompletion: "2024-08-15",
    projectManager: "Priya Sharma",
    architect: "Green Design Studios"
  },
  {
    id: 3,
    name: "Metro Business Hub",
    description: "Modern office complex in prime business district with smart building features",
    status: "Planning",
    roi: 18.7,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    location: "Milan, Italy",
    completion: 25,
    investment: "$6.8M",
    totalUnits: 200,
    soldUnits: 45,
    startDate: "2024-06-01",
    expectedCompletion: "2026-12-31",
    projectManager: "Amit Patel",
    architect: "Modern Spaces Inc"
  },
  {
    id: 4,
    name: "Oceanview Apartments",
    description: "Premium beachfront apartments with world-class amenities",
    status: "In Progress",
    roi: 14.8,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    location: "Venice, Italy",
    completion: 60,
    investment: "$3.8M",
    totalUnits: 96,
    soldUnits: 72,
    startDate: "2023-09-20",
    expectedCompletion: "2025-06-30",
    projectManager: "Lakshmi Nair",
    architect: "Coastal Designs"
  },
  {
    id: 5,
    name: "Tech Park Plaza",
    description: "State-of-the-art IT park with modern office spaces and facilities",
    status: "Completed",
    roi: 16.3,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    location: "Naples, Italy",
    completion: 100,
    investment: "$5.5M",
    totalUnits: 150,
    soldUnits: 150,
    startDate: "2021-11-01",
    expectedCompletion: "2024-03-15",
    projectManager: "Suresh Reddy",
    architect: "Tech Architecture Group"
  },
  {
    id: 6,
    name: "Heritage Homes",
    description: "Traditional architecture with modern conveniences in heritage district",
    status: "Planning",
    roi: 13.2,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    location: "Turin, Italy",
    completion: 15,
    investment: "$2.9M",
    totalUnits: 75,
    soldUnits: 28,
    startDate: "2024-08-01",
    expectedCompletion: "2026-08-31",
    projectManager: "Kavita Singh",
    architect: "Heritage Builders"
  }
];

const forecastData = {
  base: [8, 10, 12, 14, 16],
  best: [12, 16, 20, 24, 28],
  worst: [4, 5, 6, 7, 8]
};

// Futuristic SVG Icons Components
const FuturisticBuildingIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glow)">
      <rect x="20" y="30" width="15" height="50" fill="url(#buildingGrad)" rx="2"/>
      <rect x="40" y="20" width="20" height="60" fill="url(#buildingGrad)" rx="2"/>
      <rect x="65" y="35" width="15" height="45" fill="url(#buildingGrad)" rx="2"/>
      <circle cx="27" cy="45" r="2" fill="#60A5FA" opacity="0.8"/>
      <circle cx="32" cy="55" r="2" fill="#60A5FA" opacity="0.8"/>
      <circle cx="47" cy="35" r="2" fill="#60A5FA" opacity="0.8"/>
      <circle cx="53" cy="45" r="2" fill="#60A5FA" opacity="0.8"/>
      <circle cx="72" cy="50" r="2" fill="#60A5FA" opacity="0.8"/>
      <rect x="15" y="75" width="70" height="5" fill="url(#buildingGrad)" opacity="0.6" rx="2"/>
    </g>
  </svg>
);

const FuturisticUserIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <filter id="userGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#userGlow)">
      <circle cx="50" cy="35" r="15" fill="url(#userGrad)"/>
      <path d="M25 75 Q25 55 50 55 Q75 55 75 75 L25 75" fill="url(#userGrad)"/>
      <circle cx="42" cy="32" r="2" fill="#67E8F9" opacity="0.8"/>
      <circle cx="58" cy="32" r="2" fill="#67E8F9" opacity="0.8"/>
      <rect x="20" y="70" width="60" height="3" fill="url(#userGrad)" opacity="0.6" rx="1"/>
    </g>
  </svg>
);

const FuturisticStarIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#starGlow)">
      <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="url(#starGrad)"/>
      <circle cx="50" cy="40" r="3" fill="#93C5FD" opacity="0.8"/>
      <path d="M45 50 L55 50 L52 58 L48 58 Z" fill="#93C5FD" opacity="0.6"/>
    </g>
  </svg>
);

const FuturisticHomeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <path d="M50 20 L20 45 L25 45 L25 75 L75 75 L75 45 L80 45 Z" fill="url(#homeGrad)"/>
    <rect x="35" y="55" width="10" height="20" fill="#60A5FA" opacity="0.8"/>
    <rect x="55" y="50" width="8" height="8" fill="#60A5FA" opacity="0.8"/>
    <rect x="42" y="35" width="16" height="2" fill="#DBEAFE" opacity="0.9"/>
  </svg>
);

const FuturisticDollarIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="dollarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <filter id="dollarGlow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#dollarGlow)">
      <circle cx="50" cy="50" r="30" fill="url(#dollarGrad)" opacity="0.8"/>
      <path d="M45 25 L45 75 M55 25 L55 75" stroke="#A5F3FC" strokeWidth="3" fill="none"/>
      <path d="M35 35 Q50 30 65 35 Q50 40 35 45 Q50 50 65 55 Q50 60 35 65" stroke="#A5F3FC" strokeWidth="3" fill="none"/>
    </g>
  </svg>
);

const FuturisticChartIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    <rect x="20" y="60" width="8" height="20" fill="url(#chartGrad)"/>
    <rect x="35" y="45" width="8" height="35" fill="url(#chartGrad)"/>
    <rect x="50" y="30" width="8" height="50" fill="url(#chartGrad)"/>
    <rect x="65" y="35" width="8" height="45" fill="url(#chartGrad)"/>
    <path d="M25 55 L40 40 L55 25 L70 30" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.8"/>
    <circle cx="25" cy="55" r="2" fill="#60A5FA"/>
    <circle cx="40" cy="40" r="2" fill="#60A5FA"/>
    <circle cx="55" cy="25" r="2" fill="#60A5FA"/>
    <circle cx="70" cy="30" r="2" fill="#60A5FA"/>
  </svg>
);

// Enhanced Light Theme Components
const LandingPage = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Building className="h-8 w-8 text-[#1E3A8A]" />,
      title: "Project Management",
      description: "AI-powered analytics and real-time project tracking with predictive insights.",
      page: "projects"
    },
    {
      icon: <User className="h-8 w-8 text-[#1E3A8A]" />,
      title: "Investor Dashboard",
      description: "Secure portal with advanced portfolio analytics and forecasting tools.",
      page: "investor"
    },
    {
      icon: <Star className="h-8 w-8 text-[#1E3A8A]" />,
      title: "Our Achievements",
      description: "Award-winning projects with industry-leading recognition.",
      page: "highlights"
    }
  ];

  const stats = [
    { number: "$2.5B+", label: "Assets Under Management", icon: DollarSign },
    { number: "1,200+", label: "Happy Investors", icon: User },
    { number: "15.2%", label: "Average Annual Return", icon: BarChart },
    { number: "25+", label: "Active Projects", icon: Building }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Investor",
      content: "SkyArc’s platform made investing seamless. The analytics are top-notch!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Property Developer",
      content: "Their AI tools provide insights I’ve never seen before. Highly recommend.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Investor",
      content: "The dashboard is user-friendly and helped me make informed decisions.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-gray-100 text-[#1E3A8A] px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>AI-Powered Investment Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A8A] leading-tight">
                Invest in
                <span className="block text-[#1E40AF]">Real Estate</span>
                with SkyArc
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Experience the future of real estate investment with our AI-powered platform, offering unparalleled insights and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('projects')}
                  className="group bg-[#1E3A8A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-[#1E40AF] hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCurrentPage('highlights')}
                  className="border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
                >
                  Our Achievements
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Real-time analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Trusted by thousands</span>
                </div>
              </div>
            </div>
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-4">Discover Investment Opportunities</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore our portfolio of high-return real estate projects, powered by advanced AI analytics.
                </p>
                <button
                  onClick={() => setCurrentPage('projects')}
                  className="mt-6 inline-flex items-center space-x-2 bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-[#1E40AF]"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">Why Choose SkyArc?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets strategic investment. Discover the future of real estate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onClick={() => setCurrentPage(feature.page)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-[#F9FAFB] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-6 bg-[#F9FAFB] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <div className="text-3xl font-bold text-[#1E3A8A] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">What Our Investors Say</h2>
            <p className="text-xl text-gray-600">Real stories from real investors</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#F9FAFB] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-[#1E3A8A]">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      CTA Section
      <section className="py-20 bg-[#1E3A8A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Invest?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust SkyArc with their real estate portfolios. Get started today.
          </p>
          <button
            onClick={() => setCurrentPage('projects')}
            className="group bg-white text-[#1E3A8A] px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Get Started Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

const Header = ({ currentPage, setCurrentPage, isAuthenticated, setIsAuthenticated }) => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className="bg-[#FFFFFF] text-[#1E3A8A] shadow-lg sticky top-0 z-50 border-b border-gray-200"
  >
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Building className="w-8 h-8 text-[#1E3A8A]" />
        <h1 className="text-2xl font-bold text-[#1E3A8A]">SkyArc</h1>
      </div>

      {/* Navigation & Auth */}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-2">
          {[
            { name: 'home', label: 'Home', Icon: Home },
            { name: 'projects', label: 'Projects', Icon: Building },
            { name: 'highlights', label: 'Highlights', Icon: Star },
            ...(isAuthenticated ? [
              { name: 'investor', label: 'Dashboard', Icon: User },
              { name: 'erp', label: 'ERP System', Icon: DollarSign },
              { name: 'forecast', label: 'Forecast', Icon: BarChart }
            ] : [])
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === item.name
                  ? 'bg-gray-100 text-[#1E3A8A] font-semibold'
                  : 'text-[#1E3A8A] hover:bg-gray-50'
              }`}
            >
              <item.Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Auth Button */}
        <button
          onClick={() => {
            if (isAuthenticated) {
              setIsAuthenticated(false);
              setCurrentPage('home');
            } else {
              setCurrentPage('investor');
            }
          }}
          className="px-6 py-2 bg-[#1E3A8A] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-[#1E40AF] hover:shadow-lg"
        >
          {isAuthenticated ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </div>
  </motion.header>
);


const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="bg-[#E0F2FE] text-[#1E3A8A] py-12 border-t border-[#BFDBFE]"
  >
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Building className="w-8 h-8 text-[#1E3A8A]" />
            <h3 className="text-xl font-bold text-[#1E3A8A]">SkyArc</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Pioneering real estate investment with cutting-edge AI technology.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#1E3A8A]">AI Services</h4>
          <ul className="space-y-2">
            {['Smart Investment Analytics', 'Predictive Market Modeling', 'Automated Portfolio Optimization', 'Quantum Risk Assessment'].map((service, i) => (
              <li key={i} className="text-gray-600 hover:text-[#1E40AF] transition-colors duration-300 cursor-pointer flex items-center">
                <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-2"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#1E3A8A]">Company</h4>
          <ul className="space-y-2">
            {['About SkyArc', 'Innovation Team', 'Careers', 'Contact'].map((item, i) => (
              <li key={i} className="text-gray-600 hover:text-[#1E40AF] transition-colors duration-300 cursor-pointer flex items-center">
                <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#1E3A8A]">Legal</h4>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'AI Ethics'].map((legal, i) => (
              <li key={i} className="text-gray-600 hover:text-[#1E40AF] transition-colors duration-300 cursor-pointer flex items-center">
                <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mr-2"></div>
                {legal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#BFDBFE] mt-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-center md:text-left">
            © 2025 SkyArc. All rights reserved. Powered by Advanced AI Technology.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI Systems Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#1E3A8A] rounded-full animate-pulse"></div>
              <span>Quantum Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);


const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex"
  >
    <div className="w-1/3">
      <img 
        src={project.image} 
        alt={project.name} 
        className="w-full h-full object-cover rounded-l-lg" 
      />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          project.status === 'Completed' ? 'bg-green-500 text-white' :
          project.status === 'In Progress' ? 'bg-blue-500 text-white' :
          'bg-yellow-500 text-white'
        }`}>
          {project.status}
        </span>
      </div>
    </div>
    <div className="w-2/3 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-600">ROI</div>
            <div className="text-lg font-bold text-blue-600">{project.roi}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Investment</div>
            <div className="text-lg font-bold text-blue-600">{project.investment}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Units</div>
            <div className="text-lg font-bold text-gray-900">{project.totalUnits}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Sold</div>
            <div className="text-lg font-bold text-green-600">{project.soldUnits}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Completion</span>
            <span className="text-gray-900">{project.completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${project.completion}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {project.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Project Manager:</span>
            <span className="font-medium text-gray-900">{project.projectManager}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Completion:</span>
            <span className="font-medium text-gray-900">{project.expectedCompletion}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
          <Eye size={16} className="mr-2" />
          Details
        </button>
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
          <MessageSquare size={16} className="mr-2" />
          Contact
        </button>
      </div>
    </div>
  </motion.div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto relative"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Our Investment Team</h2>
      <p className="text-gray-600 mb-6 text-center">Reach out to discuss investment opportunities or get personalized advice.</p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="+39 123 456 7890"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Your message or inquiry"
            rows={1}
            required
          ></textarea>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ForecastChart = () => {
  const [scenario, setScenario] = useState('base');
  const data = forecastData[scenario];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">ROI Forecast Analysis</h3>
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { key: 'base', label: 'Base Case', color: 'blue' },
          { key: 'best', label: 'Best Case', color: 'green' },
          { key: 'worst', label: 'Worst Case', color: 'red' }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setScenario(item.key)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              scenario === item.key
                ? `bg-${item.color}-500 text-white shadow-md`
                : `bg-${item.color}-100 text-${item.color}-800 hover:bg-${item.color}-200`
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative h-64 bg-gray-50 rounded-lg p-6">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <polyline
            fill="none"
            stroke={scenario === 'base' ? '#3B82F6' : scenario === 'best' ? '#10B981' : '#EF4444'}
            strokeWidth="3"
            points={data.map((value, index) => `${index * 80 + 40},${180 - (value * 4)}`).join(' ')}
          />
          <polygon
            fill={scenario === 'base' ? '#3B82F6' : scenario === 'best' ? '#10B981' : '#EF4444'}
            fillOpacity="0.1"
            points={`40,180 ${data.map((value, index) => `${index * 80 + 40},${180 - (value * 4)}`).join(' ')} 360,180`}
          />
          {data.map((value, index) => (
            <g key={index}>
              <circle
                cx={index * 80 + 40}
                cy={180 - (value * 4)}
                r="4"
                fill={scenario === 'base' ? '#3B82F6' : scenario === 'best' ? '#10B981' : '#EF4444'}
              />
              <text
                x={index * 80 + 40}
                y={200}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                Year {index + 1}
              </text>
              <text
                x={index * 80 + 40}
                y={180 - (value * 4) - 10}
                textAnchor="middle"
                className="text-xs font-semibold"
                fill={scenario === 'base' ? '#3B82F6' : scenario === 'best' ? '#10B981' : '#EF4444'}
              >
                {value}%
              </text>
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with your investments today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thank you for your message! Our investment team will get back to you shortly.", 
          sender: 'bot' 
        }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-96 h-96 flex flex-col border border-gray-200">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Investment Assistant</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ask about investments..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </motion.div>
  );
};

const DashboardCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-${color}-200`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-${color}-600 rounded-lg flex items-center justify-center`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp size={16} className="mr-1" />
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
  </motion.div>
);

const PortfolioChart = () => {
  const data = {
    labels: ['Residential', 'Commercial', 'Mixed Use'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6'],
      hoverOffset: 20
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Allocation</h3>
      <div className="relative h-64">
        <Doughnut data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </motion.div>
  );
};

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New project update for Skyline Towers', date: '2025-07-24', read: false },
    { id: 2, message: 'Dividend payment processed for Green Valley Resort', date: '2025-07-20', read: true }
  ]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-40 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
          >
            <p className="text-sm text-gray-900">{notification.message}</p>
            <p className="text-xs text-gray-600">{notification.date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Pages


const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredProjects = projectsData
    .filter(project => {
      const matchesFilter = filter === 'all' || project.status.toLowerCase().replace(' ', '') === filter;
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'roi') return b.roi - a.roi;
      if (sortBy === 'completion') return b.completion - a.completion;
      return 0;
    });

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated portfolio of investment opportunities in Italy
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="name">Sort by Name</option>
                <option value="roi">Sort by ROI</option>
                <option value="completion">Sort by Completion</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'inprogress', label: 'In Progress' },
              { key: 'completed', label: 'Completed' },
              { key: 'planning', label: 'Planning' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === item.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Projects" 
            value={projectsData.length.toString()} 
            icon={Building} 
            color="blue"
          />
          <DashboardCard 
            title="Active Projects" 
            value={projectsData.filter(p => p.status === 'In Progress').length.toString()} 
            icon={Clock} 
            color="yellow"
          />
          <DashboardCard 
            title="Completed Projects" 
            value={projectsData.filter(p => p.status === 'Completed').length.toString()} 
            icon={CheckCircle} 
            color="green"
          />
          <DashboardCard 
            title="Total Investment" 
            value="$25.7M" 
            icon={DollarSign} 
            color="blue"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Building size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HighlightsPage = () => {
  const achievements = [
    {
      title: "Best Real Estate Developer 2024",
      description: "Awarded by the European Property Awards for excellence in sustainable development.",
      year: "2024",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
       },
    {
      title: "Top Investment Firm",
      description: "Recognized by Global Finance Magazine for outstanding ROI performance.",
      year: "2023",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=400&h=300&fit=crop"
    },
    {
      title: "Sustainable Design Award",
      description: "Honored for eco-friendly practices in Green Valley Resort project.",
      year: "2022",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
    },
    {
      title: "Industry Leader Recognition",
      description: "Named among top 10 real estate firms by Real Estate Business Review.",
      year: "2021",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our milestones and industry recognition in real estate investment
          </p>
        </motion.div>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Success</h2>
          <p className="text-gray-600 leading-relaxed">
            RealEstate Invest Pro has been at the forefront of the real estate industry since 2015, delivering exceptional value to investors through innovative projects and sustainable practices. Our commitment to excellence has earned us numerous accolades, reflecting our dedication to quality, transparency, and investor satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={achievement.image} alt={achievement.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <p className="text-sm text-gray-500">Year: {achievement.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InvestorPortal = ({ isAuthenticated, setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center py-12"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Investor Portal</h1>
            <p className="text-gray-600 mt-2">Secure access to your investment dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Sign In to Portal
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Investment Dashboard</h1>
          <p className="text-xl text-gray-600">Welcome back! Here's your portfolio overview.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard 
            title="Total Investment" 
            value="$1,250,000" 
            icon={DollarSign} 
            trend={12.5}
            color="blue"
          />
          <DashboardCard 
            title="Portfolio Value" 
            value="$1,875,000" 
            icon={PieChart} 
            trend={8.3}
            color="green"
          />
          <DashboardCard 
            title="Annual ROI" 
            value="15.2%" 
            icon={TrendingUp} 
            trend={2.1}
            color="blue"
          />
          <DashboardCard 
            title="Active Projects" 
            value="8" 
            icon={Building} 
            color="yellow"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {[
                { project: "Skyline Towers", amount: "$250,000", date: "2025-07-20", type: "Investment" },
                { project: "Green Valley Resort", amount: "$38,000", date: "2025-07-15", type: "Dividend" },
                { project: "Metro Business Hub", amount: "$180,000", date: "2025-07-10", type: "Investment" }
              ].map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{transaction.project}</div>
                    <div className="text-sm text-gray-600">{transaction.date} • {transaction.type}</div>
                  </div>
                  <div className={`font-bold ${transaction.type === 'Dividend' ? 'text-green-600' : 'text-blue-600'}`}>
                    {transaction.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <PortfolioChart />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.slice(0, 2).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img src={project.image} alt={project.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-semibold text-green-600">ROI: {project.roi}%</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ERPSystem = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const transactions = [
    { id: 1, project: 'Skyline Towers', amount: '$500,000', date: '2025-07-20', status: 'Completed', type: 'Investment' },
    { id: 2, project: 'Green Valley Resort', amount: '$750,000', date: '2025-07-15', status: 'Completed', type: 'Investment' },
    { id: 3, project: 'Metro Business Hub', amount: '$32,500', date: '2025-07-10', status: 'Pending', type: 'Dividend' },
    { id: 4, project: 'Skyline Towers', amount: '$28,750', date: '2025-07-05', status: 'Completed', type: 'Dividend' }
  ];
  const reports = [
    { name: 'Q2 2025 Performance Report', date: '2025-07-01', size: '2.4 MB', type: 'PDF' },
    { name: 'Portfolio Analysis June', date: '2025-06-30', size: '1.8 MB', type: 'Excel' },
    { name: 'Tax Documentation 2025', date: '2025-06-15', size: '945 KB', type: 'PDF' }
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ERP System</h1>
          <p className="text-xl text-gray-600">Comprehensive financial management and reporting</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'transactions', label: 'Transactions', icon: DollarSign },
                { key: 'reports', label: 'Reports', icon: FileText },
                { key: 'analytics', label: 'Analytics', icon: BarChart },
                { key: 'timeline', label: 'Project Timeline', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'transactions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Transaction History</h3>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Export Data
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Project</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{transaction.project}</td>
                          <td className="px-6 py-4 text-gray-900 font-semibold">{transaction.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              transaction.type === 'Investment' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center space-x-1 ${
                              transaction.status === 'Completed' ? 'text-green-600' : 
                              transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {transaction.status === 'Completed' ? <CheckCircle size={16} /> :
                               transaction.status === 'Pending' ? <Clock size={16} /> : <AlertCircle size={16} />}
                              <span className="text-sm font-medium">{transaction.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'reports' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Financial Reports</h3>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Generate Report
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reports.map((report, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <FileText size={24} className="text-blue-600" />
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{report.type}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{report.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.date} • {report.size}</p>
                      <button className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                        <Download size={16} className="mr-2" />
                        Download
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Monthly Performance</h4>
                    <div className="space-y-4">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                        const performance = [12, 15, 8, 18, 22, 16][index];
                        return (
                          <div key={month} className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">{month} 2025</span>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${(performance / 25) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-12">{performance}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <PortfolioChart />
                </div>
              </div>
            )}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h3>
                <div className="space-y-6">
                  {projectsData.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`w-3 h-3 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.startDate} - {project.expectedCompletion}</p>
                      </div>
                      <div className="text-sm text-gray-600">{project.completion}% Complete</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FinancialForecast = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('5-year');
  const [selectedMetric, setSelectedMetric] = useState('roi');

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Forecasting</h1>
          <p className="text-xl text-gray-600">Advanced predictive modeling for strategic investment decisions</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Investment Projections</h3>
                <div className="flex space-x-2">
                  {['1-year', '3-year', '5-year', '10-year'].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedTimeframe === timeframe
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              <ForecastChart />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h4>
              <div className="space-y-4">
                {[
                  { label: 'Expected ROI', value: '15.2%', change: '+2.1%' },
                  { label: 'Risk Score', value: 'Low', change: 'Stable' },
                  { label: 'Market Confidence', value: '87%', change: '+5%' },
                  { label: 'Liquidity Index', value: 'High', change: '+12%' }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700 font-medium">{metric.label}</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{metric.value}</div>
                      <div className="text-sm text-green-600">{metric.change}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Market Indicators</h4>
              <div className="space-y-3">
                {[
                  { name: 'Real Estate Index', value: 1847, change: 2.3 },
                  { name: 'Interest Rates', value: 6.75, change: -0.25 },
                  { name: 'Construction Costs', value: 287, change: 1.8 },
                  { name: 'Demand Index', value: 94, change: 5.2 }
                ].map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{indicator.name}</span>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{indicator.value}</div>
                      <div className={`text-sm ${indicator.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {indicator.change > 0 ? '+' : ''}{indicator.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Scenario Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Conservative', 
                description: 'Low risk, steady returns',
                roi: '8-12%',
                risk: 'Low',
                color: 'green'
              },
              { 
                title: 'Balanced', 
                description: 'Moderate risk, balanced growth',
                roi: '12-18%',
                risk: 'Medium',
                color: 'blue'
              },
              { 
                title: 'Aggressive', 
                description: 'High risk, maximum returns',
                roi: '18-25%',
                risk: 'High',
                color: 'yellow'
              }
            ].map((scenario, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-lg p-6 border border-${scenario.color}-200 hover:shadow-lg transition-shadow duration-300`}
              >
                <h4 className={`text-xl font-bold text-${scenario.color}-600 mb-3`}>{scenario.title}</h4>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Expected ROI:</span>
                    <span className={`font-bold text-${scenario.color}-600`}>{scenario.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Risk Level:</span>
                    <span className={`font-bold text-${scenario.color}-600`}>{scenario.risk}</span>
                  </div>
                </div>
                <button className={`w-full mt-4 bg-${scenario.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${scenario.color}-700 transition-colors font-medium`}>
                  Select Strategy
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <LandingPage setCurrentPage={setCurrentPage} />}
            {currentPage === 'projects' && <ProjectsPage />}
            {currentPage === 'highlights' && <HighlightsPage />}
            {currentPage === 'investor' && <InvestorPortal isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            {currentPage === 'erp' && isAuthenticated && <ERPSystem />}
            {currentPage === 'forecast' && isAuthenticated && <FinancialForecast />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
      {isAuthenticated && <NotificationPanel />}
    </div>
  );
};

export default App;