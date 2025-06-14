"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MenuIcon, XIcon, ArrowRightIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const renderAuthButton = () => {
    if (status === 'loading') {
      return null; // Don't show anything while loading
    }

    if (session) {
      return <UserNav />;
    }

    return (
      <Button        variant="default" 
        onClick={handleSignIn} 
        className="button-modern text-white ml-2 px-6 flex items-center group"
      >
        Sign In
        <LogInIcon className="h-4 w-4 ml-2" />
      </Button>
    );
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">              <Image 
                src="/images/newzy-logo.svg"
                alt="Newzy World"
                width={40}
                height={40}
                className="logo-pulse"
                priority
              />
              <div className="flex flex-col ml-2">
                <span className="text-2xl font-semibold text-gradient logo-pulse">Newzy World</span>
                <span className="text-xs text-foreground/70">Modern News Intelligence</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="nav-link text-foreground hover:text-primary transition-colors flex items-center">
              Home
              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 pointer-events-none">New</Badge>
            </Link>            <Link href="/news" className="nav-link text-foreground hover:text-primary transition-colors flex items-center">
              News
              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 pointer-events-none">Latest</Badge>
            </Link>
            <Link href="/weather" className="nav-link text-foreground hover:text-primary transition-colors flex items-center">
              Weather
              <Badge className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 pointer-events-none">Live</Badge>
            </Link>
            <Link href="/about" className="nav-link text-foreground hover:text-primary transition-colors flex items-center">
              About
              <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 pointer-events-none">Info</Badge>
            </Link>
            <Link href="/contact" className="nav-link text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
            {renderAuthButton()}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="ml-2 icon-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="nav-link flex px-3 py-2 text-foreground hover:text-primary transition-colors items-center"
            >
              Home
              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 pointer-events-none">New</Badge>
            </Link>
            <Link
              href="/news"
              className="nav-link flex px-3 py-2 text-foreground hover:text-primary transition-colors items-center"
            >
              News
              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 pointer-events-none">Latest</Badge>
            </Link>
            <Link
              href="/weather"
              className="nav-link flex px-3 py-2 text-foreground hover:text-primary transition-colors items-center"
            >
              Weather
              <Badge className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 pointer-events-none">Live</Badge>
            </Link>
            <Link
              href="/about"
              className="nav-link flex px-3 py-2 text-foreground hover:text-primary transition-colors items-center"
            >
              About
              <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 pointer-events-none">Info</Badge>
            </Link>
            <Link
              href="/contact"
              className="nav-link flex px-3 py-2 text-foreground hover:text-primary transition-colors items-center"
            >
              Contact
            </Link>
            {session ? (
              <div className="px-3 py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{session.user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center"
                >
                  Sign Out
                  <LogOutIcon className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full mt-2 bg-primary text-white hover:bg-primary/90 flex items-center justify-center group" 
                onClick={handleSignIn}
              >
                Sign In
                <LogInIcon className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}