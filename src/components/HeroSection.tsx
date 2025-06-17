
import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Calendar, Users, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Discover the Evolution of Computing",
      subtitle: "Journey through 50+ years of technological innovation",
      description: "From mainframes to modern computers, explore the fascinating history of information technology through interactive exhibits and rare collections.",
      cta: "Start Virtual Tour",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&q=80",
      video: true
    },
    {
      title: "Interactive Learning Experience", 
      subtitle: "Hands-on workshops and educational programs",
      description: "Engage with technology through guided tours, workshops, and special events designed for all ages and skill levels.",
      cta: "Book Your Visit",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80",
      video: false
    },
    {
      title: "Preserve Digital Heritage",
      subtitle: "Supporting the future of technology education",
      description: "Help us maintain and expand our collection through adoption programs, donations, and community partnerships.",
      cta: "Get Involved",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=800&fit=crop&q=80",
      video: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{ backgroundImage: `url(${currentSlideData.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-museum-blue rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Now Open</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
              {currentSlideData.title}
            </h1>
            
            <p className="text-xl lg:text-2xl font-medium text-blue-100 mb-4">
              {currentSlideData.subtitle}
            </p>
            
            <p className="text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed">
              {currentSlideData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-museum-blue hover:bg-museum-blue-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-museum group"
              >
                {currentSlideData.video && <Play className="w-5 h-5 mr-2" />}
                {currentSlideData.cta}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Plan Your Visit
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">2000+</div>
                <div className="text-sm text-gray-300">Artifacts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-300">Years Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100k+</div>
                <div className="text-sm text-gray-300">Annual Visitors</div>
              </div>
            </div>
          </div>

          {/* Video/Interactive Element */}
          <div className="hidden lg:block animate-slide-in-right">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&q=80)' }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <Button 
                  size="lg"
                  className="relative z-10 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-20 h-20"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Take a Virtual Tour</h3>
              <p className="text-gray-200 text-sm mb-4">
                Explore our museum from anywhere in the world with our immersive 3D virtual tour.
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Camera className="w-4 h-4" />
                  <span>360° View</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Interactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-museum-blue/20 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-purple-500/10 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;
