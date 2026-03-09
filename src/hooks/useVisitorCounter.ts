import { useState, useEffect } from 'react';

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Get current count from localStorage
    const storedCount = localStorage.getItem('belleville_visitor_count');
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Check if this is a new session
    const sessionVisited = sessionStorage.getItem('belleville_session_visited');
    
    if (!sessionVisited) {
      // New session - increment counter
      const newCount = currentCount + 1;
      localStorage.setItem('belleville_visitor_count', newCount.toString());
      sessionStorage.setItem('belleville_session_visited', 'true');
      setVisitorCount(newCount);
    } else {
      // Same session - show current count without incrementing
      setVisitorCount(currentCount);
    }
  }, []);

  return visitorCount;
}
