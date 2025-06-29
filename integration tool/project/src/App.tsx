import React, { useState } from 'react';
import { Mail, User, Send, CheckCircle, Shield, AlertCircle } from 'lucide-react';

interface LoginData {
  username: string;
  email: string;
}

interface LoginSubmission {
  id: string;
  username: string;
  email: string;
  timestamp: string;
  status: 'success' | 'pending';
}

function App() {
  const [loginData, setLoginData] = useState<LoginData>({ username: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>('');
  const [recentLogins, setRecentLogins] = useState<LoginSubmission[]>([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      username: 'sarah_smith',
      email: 'sarah@example.com',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      username: 'mike_wilson',
      email: 'mike@example.com',
      timestamp: '8 minutes ago',
      status: 'success'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate sending data (you'll need to replace this with your actual webhook URL)
      const webhookData = {
        username: loginData.username,
        userEmail: loginData.email,
        timestamp: new Date().toISOString(),
        targetEmail: 'prasadgollavilli8365@gmail.com',
        message: `New user registration: ${loginData.username} (${loginData.email})`
      };

      console.log('Registration data:', webhookData);

      // Add to recent logins
      const newLogin: LoginSubmission = {
        id: Date.now().toString(),
        username: loginData.username,
        email: loginData.email,
        timestamp: 'Just now',
        status: 'success'
      };

      setRecentLogins(prev => [newLogin, ...prev]);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setLoginData({ username: '', email: '' });
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      setIsSubmitting(false);
      setError(error instanceof Error ? error.message : 'Failed to send data');
      console.error('Registration failed:', error);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = loginData.username.trim().length >= 3 && isValidEmail(loginData.email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            User Registration
            <span className="text-indigo-600"> Portal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enter your username and email to register. Your details will be sent to prasadgollavilli8365@gmail.com.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 backdrop-blur-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">User Registration</h2>
                <p className="text-gray-600">Please enter your details to register</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your username"
                      minLength={3}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 3 characters required</p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-red-800 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    isSubmitted 
                      ? 'bg-green-500 scale-105' 
                      : isFormValid && !isSubmitting
                      ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Registering...
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Registration Successful!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Register Now
                    </div>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 text-sm font-medium mb-2">
                    ✅ Registration completed successfully!
                  </p>
                  <p className="text-green-700 text-sm">
                    Your username and email have been recorded and will be sent to <strong>prasadgollavilli8365@gmail.com</strong>.
                  </p>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> This is a demo form. To receive actual emails, you need to set up Make.com automation.
                </p>
              </div>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Make.com Setup Steps */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Make.com Setup Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Add Webhook Trigger</p>
                    <p className="text-sm text-gray-600">In Make.com, add "Webhooks" → "Custom webhook"</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-purple-50 rounded-xl">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Add Gmail Module</p>
                    <p className="text-sm text-gray-600">Connect Gmail to send emails</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-cyan-50 rounded-xl">
                  <div className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Configure Email</p>
                    <p className="text-sm text-gray-600">Set recipient: prasadgollavilli8365@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-orange-50 rounded-xl">
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Test & Activate</p>
                    <p className="text-sm text-gray-600">Turn on your scenario and test it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Template */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Email Template for Make.com</h3>
              <div className="bg-gray-50 p-4 rounded-xl text-sm">
                <p className="font-semibold mb-2">Subject: New User Registration</p>
                <div className="space-y-1 text-gray-700">
                  <p><strong>Username:</strong> {`{{username}}`}</p>
                  <p><strong>Email:</strong> {`{{userEmail}}`}</p>
                  <p><strong>Registration Time:</strong> {`{{timestamp}}`}</p>
                  <p><strong>Target Email:</strong> {`{{targetEmail}}`}</p>
                </div>
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Registrations</h3>
              <div className="space-y-3">
                {recentLogins.slice(0, 4).map((login) => (
                  <div key={login.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{login.username}</p>
                      <p className="text-xs text-gray-600">{login.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-xs text-green-600 font-medium">Registered</span>
                      </div>
                      <p className="text-xs text-gray-500">{login.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;