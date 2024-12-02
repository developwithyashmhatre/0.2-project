import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Shield, Zap, Users, Gift, Award, ArrowRight } from 'lucide-react';

export function Landing() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-10 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <img
              src="/logo.svg"
              alt="YourTube Logo"
              className="h-16 mx-auto mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Platform for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Creative Expression
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Share your story with the world. YourTube offers a better, more creator-friendly
              platform with advanced features and fair monetization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                Explore Content
                <Play className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose YourTube?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the next generation of video sharing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Privacy Focused',
                description: 'Your data stays yours. We prioritize user privacy and security.',
              },
              {
                icon: Gift,
                title: 'Better Monetization',
                description: 'Fair revenue sharing and multiple monetization options.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized streaming and minimal buffering worldwide.',
              },
              {
                icon: Users,
                title: 'Community First',
                description: 'Built-in tools for community engagement and interaction.',
              },
              {
                icon: Award,
                title: 'Quality Content',
                description: 'Advanced algorithms promoting quality over clickbait.',
              },
              {
                icon: Play,
                title: 'Live Streaming',
                description: 'Professional live streaming tools with low latency.',
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Active Users', value: '10M+' },
              { label: 'Videos Uploaded', value: '500K+' },
              { label: 'Minutes Watched', value: '1B+' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Share Your Story?
          </h2>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-colors"
          >
            Start Creating Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800/50 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="/logo.svg"
                alt="YourTube Logo"
                className="h-8 mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">
                The next generation video sharing platform.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Support', 'FAQ'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Cookies'],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} YourTube. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}