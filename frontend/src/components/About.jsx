import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-white text-2xl font-bold">I</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About IMS</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Incident Management System - A comprehensive platform for monitoring, managing, and resolving system incidents
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                The Incident Management System (IMS) is a powerful, real-time platform designed to help organizations 
                effectively monitor, track, and resolve incidents across their infrastructure. Built with modern technologies 
                and best practices, IMS provides a comprehensive solution for incident response and management.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Real-time Signal Ingestion</h3>
                  <p className="text-gray-600 text-sm">Process and analyze signals from multiple sources in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Incident Tracking</h3>
                  <p className="text-gray-600 text-sm">Comprehensive tracking of incidents from creation to resolution</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Status Management</h3>
                  <p className="text-gray-600 text-sm">Track incident status through Open, In Progress, Resolved, and Closed stages</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dashboard Analytics</h3>
                  <p className="text-gray-600 text-sm">Visual dashboard with incident statistics and metrics</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Multi-source Support</h3>
                  <p className="text-gray-600 text-sm">Handle signals from Database, API, and Cache sources</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Priority Classification</h3>
                  <p className="text-gray-600 text-sm">Classify incidents by priority levels for effective triage</p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">⚛️</span>
                    <span className="text-gray-600">React 18</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">🎨</span>
                    <span className="text-gray-600">Tailwind CSS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">🔄</span>
                    <span className="text-gray-600">React Router</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600">📦</span>
                    <span className="text-gray-600">Vite</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600">🐍</span>
                    <span className="text-gray-600">FastAPI</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600">🗄️</span>
                    <span className="text-gray-600">PostgreSQL</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600">📊</span>
                    <span className="text-gray-600">Prometheus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600">🐳</span>
                    <span className="text-gray-600">Docker</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Architecture</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                IMS follows a modern microservices architecture with clear separation of concerns:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Signal Processing:</strong> Ingest and process signals from various sources</li>
                  <li>• <strong>Incident Management:</strong> Create, track, and manage incidents</li>
                  <li>• <strong>Authentication:</strong> Secure user authentication and authorization</li>
                  <li>• <strong>Monitoring:</strong> Real-time metrics and health monitoring</li>
                  <li>• <strong>API Gateway:</strong> Centralized API management and routing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-6">
              Ready to explore the IMS platform? Start with the dashboard to see real-time incident statistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                📊 View Dashboard
              </Link>
              <Link
                to="/incidents"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition-colors"
              >
                🚨 Browse Incidents
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
