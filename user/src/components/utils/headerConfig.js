export const headerConfig = () => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
  
      if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
      } else {
        return {};
      }
    }
  };