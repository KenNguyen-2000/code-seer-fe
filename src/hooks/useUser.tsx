'use client';

import React from 'react';
import jwtDecode from 'jwt-decode';

const useUser = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering, return false
    return null;
  }
  const token = localStorage.getItem('token');

  return token ? jwtDecode(token) : null;
};

export default useUser;
