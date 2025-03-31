"use client"

import { getUserToken } from '@/shared/StorageService';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: { isAdmin: boolean };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const router = useRouter();
  const pathName = usePathname();


  useEffect(() => {
    const checkSession = async () => {
      const userToken = getUserToken();

      if (!userToken) {
        router.push('/sign-in');
      }
    };

    checkSession();
  }, [isAdmin, pathName, router]);

  return children;
};

export default ProtectedRoute;
