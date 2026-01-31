import React, { useEffect, useState } from 'react';
import {
  Leaf,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Shield,
  Globe,
  Smartphone,
  Star,
  MessageSquare,
  Utensils,
  ShoppingCart,
  Wallet,
  AlertCircle,
  Flame,
  Clock,
} from 'lucide-react';

interface LandingPageProps {
  onGetStartedClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStartedClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Intelligent Analytics',
      description: 'Track food waste and demand patterns with comprehensive real-time analytics and insights.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'AI Predictions',
      description: 'Leverage machine learning to forecast demand and reduce waste by up to 40%.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Smart Recommendations',
      description: 'Get AI-powered suggestions to optimize inventory and maximize profitability.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Multi-Location Support',
      description: 'Manage multiple restaurants or food outlets from a single unified dashboard.',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Friendly',
      description: 'Access your data on the go with our responsive mobile-optimized platform.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with end-to-end encryption for your data.',
    },
  ];

  const useCases = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Fine Dining',
      description: 'Optimize premium ingredient usage and reduce luxury food waste.',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Fast Casual',
      description: 'Speed up operations while maintaining quality and reducing inventory costs.',
      color: 'from-orange-400 to-orange-600',
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'Food Trucks',
      description: 'Manage limited inventory efficiently with predictive daily demand.',
      color: 'from-red-400 to-red-600',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Catering',
      description: 'Forecast event-based demand and plan perfect portions every time.',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Meal Prep Services',
      description: 'Batch preparation planning with AI-powered quantity predictions.',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: 'Budget Kitchens',
      description: 'Maximize value while maintaining quality for price-conscious customers.',
      color: 'from-green-400 to-green-600',
    },
  ];

  const benefits = [
    {
      metric: '40%',
      label: 'Waste Reduction',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      metric: '35%',
      label: 'Cost Savings',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      metric: '25%',
      label: 'Revenue Increase',
      icon: <Target className="w-6 h-6" />,
    },
    {
      metric: '90%',
      label: 'Accuracy Rate',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for single location restaurants',
      features: ['Up to 50 menu items', 'Basic analytics', 'Mobile app access', 'Email support'],
      cta: 'Start Free Trial',
      featured: false,
    },
    {
      name: 'Professional',
      price: '$249',
      period: '/month',
      description: 'Ideal for growing restaurants',
      features: ['Unlimited menu items', 'Advanced AI predictions', 'Multi-location support', 'Priority support', 'Custom reports'],
      cta: 'Start Free Trial',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large restaurant groups',
      features: ['Unlimited everything', 'Dedicated account manager', 'API access', '24/7 phone support', 'Custom integrations'],
      cta: 'Schedule Demo',
      featured: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Manager, Urban Bistro',
      avatar: '👩‍💼',
      text: 'EcoFeast helped us reduce waste by 45% in just 3 months. The AI insights are incredibly accurate and actionable.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Food Service Director, Green Café',
      avatar: '👨‍💼',
      text: 'The platform is intuitive and the support team is fantastic. We saved thousands in the first month.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Owner, Sustainable Kitchen',
      avatar: '👩‍🍳',
      text: 'Finally, a tool that helps us be both profitable and eco-friendly. Highly recommended!',
      rating: 5,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your account and set up your restaurant profile in minutes.',
    },
    {
      number: '02',
      title: 'Input Data',
      description: 'Start logging daily food preparation and sales data.',
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive AI-powered predictions and actionable recommendations.',
    },
    {
      number: '04',
      title: 'Optimize',
      description: 'Implement recommendations and watch your waste and costs decrease.',
    },
  ];

  return (
    <div className="bg-dark-primary text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent-teal/10 rounded-full mix-blend-screen filter blur-3xl animate-float"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-dark-secondary rounded-full border border-border-muted hover:border-accent-teal/50 transition-smooth">
              <Leaf className="w-4 h-4 text-accent-teal" />
              <span className="text-sm font-semibold text-text-muted">Smart Food Demand Prediction</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Reduce Waste, <br className="hidden sm:block" />
              <span className="gradient-text-dark">Maximize Profit</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered food demand prediction for restaurants. Forecast demand accurately, minimize waste, and increase revenue with intelligent insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onGetStartedClick}
                className="px-8 py-4 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-bold rounded-xl hover-lift shadow-xl shadow-accent-teal/20 inline-flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </button>
              <button className="px-8 py-4 border-2 border-border-muted text-white font-bold rounded-xl hover:border-accent-teal hover:text-accent-teal transition-smooth hover:bg-dark-secondary">
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-teal flex-shrink-0" />
                <span>Free for 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-teal flex-shrink-0" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-teal flex-shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Everything you need to optimize your food business and reduce waste
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-dark-secondary rounded-2xl border border-border-muted hover:border-accent-teal/50 hover-lift shadow-lg transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent-teal to-accent-teal-hover rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Perfect for Any Restaurant Type
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              From food trucks to fine dining, EcoFeast adapts to your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="group p-8 bg-dark-secondary rounded-2xl border border-border-muted hover:border-accent-teal/50 hover-lift shadow-lg transition-smooth animate-fade-in-up overflow-hidden relative"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${useCase.color} opacity-5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-smooth`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-smooth relative z-10`}>
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                  {useCase.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm md:text-base relative z-10">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-teal via-accent-teal-hover to-teal-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 text-white animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our clients see real results in weeks, not months
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center text-white border border-white/20 hover:bg-white/20 transition-smooth animate-fade-in-up hover-lift"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {benefit.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{benefit.metric}</div>
                <div className="text-white/80 font-semibold">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-full h-1 bg-gradient-to-r from-accent-teal/50 to-transparent" />
                )}

                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-teal to-accent-teal-hover rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto hover-lift shadow-lg shadow-accent-teal/20">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-center text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Choose the plan that fits your restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden animate-fade-in-up transition-smooth ${plan.featured
                    ? 'ring-2 ring-accent-teal shadow-2xl shadow-accent-teal/20 md:scale-105 bg-dark-secondary'
                    : 'border border-border-muted bg-dark-secondary shadow-lg hover-lift'
                  }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {plan.featured && (
                  <div className="bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white py-2 px-4 text-center font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-text-muted text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-text-muted ml-2">{plan.period}</span>
                  </div>
                  <button
                    onClick={onGetStartedClick}
                    className={`w-full py-3 px-4 rounded-xl font-bold mb-8 transition-smooth ${plan.featured
                        ? 'bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white hover:shadow-lg shadow-accent-teal/20'
                        : 'border-2 border-accent-teal text-accent-teal hover:bg-accent-teal/10'
                      }`}
                  >
                    {plan.cta}
                  </button>
                  <div className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-teal flex-shrink-0" />
                        <span className="text-text-muted text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 text-white animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by Professionals
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-dark-secondary rounded-2xl p-8 border border-border-muted hover:border-accent-teal/50 transition-smooth animate-fade-in-up hover-lift"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed italic text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-border-muted">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="bg-dark-secondary rounded-3xl p-12 border border-border-muted shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Join hundreds of restaurants already reducing waste and increasing profits with EcoFeast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStartedClick}
                className="px-8 py-4 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-bold rounded-xl hover-lift shadow-xl shadow-accent-teal/20 inline-flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </button>
              <button className="px-8 py-4 border-2 border-border-muted text-white font-bold rounded-xl hover:border-accent-teal hover:text-accent-teal transition-smooth hover:bg-dark-secondary">
                Contact Sales
              </button>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              ✓ Free for 30 days • ✓ No credit card required • ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-primary text-text-muted py-12 px-4 sm:px-6 lg:px-8 border-t border-border-muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-accent-teal" />
                <span className="font-bold text-white">EcoFeast</span>
              </div>
              <p className="text-sm">Smart food demand prediction for sustainable restaurants.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-accent-teal transition-smooth">Features</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent-teal transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Blog</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Privacy</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Terms</a></li>
                <li><a href="#" className="hover:text-accent-teal transition-smooth">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border-muted pt-8 text-center text-sm">
            <p>&copy; 2026 EcoFeast. All rights reserved. Made with 🌱 for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
