import React from 'react';
import { Button } from '../button';
import { Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <img src='/logo.svg' width={100} height={100} />

      <div className='flex gap-2 items-center'>
        {/* Home button (only show if not already on home page) */}
        {!isHomePage && (
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
        )}

        {/* Templates Button */}
        <Link to="/templates">
          <Button variant={location.pathname === '/templates' ? 'default' : 'outline'}>
            Templates
          </Button>
        </Link>

        {/* Authenticated user options */}
        {isSignedIn ? (
          <>
            <Link to="/dashboard">
              <Button variant={location.pathname === '/dashboard' ? 'default' : 'outline'}>
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Link to="/auth/sign-in">
            <Button variant="default">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
