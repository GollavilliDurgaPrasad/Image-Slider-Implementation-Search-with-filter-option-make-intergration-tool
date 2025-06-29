import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TestimonialCard {
  id: number;
  title: string;
  description: string;
  avatars: string[];
  category: string;
}

const testimonials: TestimonialCard[] = [
  {
    id: 1,
    title: "Those worrying about low CGPA/backlogs",
    description: "Your academic performance will not hold you back.",
    avatars: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Academic Success"
  },
  {
    id: 2,
    title: "Those worrying about low CGPA/backlogs",
    description: "Your academic performance will not hold you back.",
    avatars: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Career Transition"
  },
  {
    id: 3,
    title: "IT Professionals looking for Product Development roles",
    description: "Switch from support/testing roles to high-paid developer roles.",
    avatars: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Professional Growth"
  },
  {
    id: 4,
    title: "Fresh Graduates entering Tech Industry",
    description: "Land your first tech job with confidence and skills that matter.",
    avatars: [
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Entry Level"
  },
  {
    id: 5,
    title: "Career Changers from Non-Tech Backgrounds",
    description: "Successfully transition into lucrative tech careers regardless of your background.",
    avatars: [
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Career Change"
  },
  {
    id: 6,
    title: "Mid-Level Developers seeking Senior Roles",
    description: "Advance your career with advanced skills and leadership capabilities.",
    avatars: [
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Senior Level"
  },
  {
    id: 7,
    title: "Freelancers wanting Stable Employment",
    description: "Transition from freelance work to secure, well-paying full-time positions.",
    avatars: [
      'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Employment"
  },
  {
    id: 8,
    title: "Remote Work Seekers",
    description: "Master the skills needed for high-paying remote development positions.",
    avatars: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Remote Work"
  },
  {
    id: 9,
    title: "Entrepreneurs building Tech Products",
    description: "Develop the technical skills to build and scale your own products.",
    avatars: [
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    ],
    category: "Entrepreneurship"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive settings
  const getVisibleSlides = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
  }, []);

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleSlides]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, testimonials.length - visibleSlides);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 4000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, visibleSlides]);

  // Navigation functions
  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, testimonials.length - visibleSlides);
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    const maxIndex = Math.max(0, testimonials.length - visibleSlides);
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, testimonials.length - visibleSlides);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const maxIndex = Math.max(0, testimonials.length - visibleSlides);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div 
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main carousel container */}
        <div className="overflow-hidden mb-8">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleSlides + (24 / visibleSlides))}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0"
                style={{ 
                  width: visibleSlides === 1 ? '100%' : `calc(${100 / visibleSlides}% - ${24 * (visibleSlides - 1) / visibleSlides}px)`,
                  minWidth: visibleSlides === 1 ? '320px' : 'auto'
                }}
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-3">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {testimonial.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {testimonial.avatars.map((avatar, index) => (
                          <div
                            key={index}
                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                          >
                            <img
                              src={avatar}
                              alt={`Success story ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group">
                        Success Stories
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls - positioned below carousel */}
        <div className="flex justify-center items-center space-x-6">
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-gray-800 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;