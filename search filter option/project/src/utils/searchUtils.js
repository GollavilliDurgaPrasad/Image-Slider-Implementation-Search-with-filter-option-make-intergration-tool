// Utility functions for search functionality
export const highlightText = (text, searchTerm) => {
  if (!searchTerm.trim()) return [{ text, highlight: false }];
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => ({
    text: part,
    highlight: regex.test(part)
  }));
};

export const searchTestimonials = (testimonials, searchTerm) => {
  if (!searchTerm.trim()) {
    return testimonials.map(testimonial => ({ ...testimonial, matches: false }));
  }
  
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  return testimonials.map(testimonial => {
    const normalizedContent = testimonial.content.toLowerCase();
    const normalizedAuthor = testimonial.author.toLowerCase();
    const normalizedRole = testimonial.role.toLowerCase();
    
    // Check for partial matches in content, author, or role
    const contentMatch = normalizedContent.includes(normalizedSearchTerm);
    const authorMatch = normalizedAuthor.includes(normalizedSearchTerm);
    const roleMatch = normalizedRole.includes(normalizedSearchTerm);
    
    return {
      ...testimonial,
      matches: contentMatch || authorMatch || roleMatch
    };
  });
};

export const sortTestimonials = (testimonials) => {
  return [...testimonials].sort((a, b) => {
    // Matching testimonials come first
    if (a.matches && !b.matches) return -1;
    if (!a.matches && b.matches) return 1;
    return 0;
  });
};