import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false); // Changed to false for Monthly as default

  // Rest of the code remains the same...
  const plans = [
    {
      name: 'Student Basic',
      description: 'Perfect for getting started with AI-powered learning',
      monthlyPrice: 9,
      yearlyPrice: 99,
      features: [
        '10 hrs/month AI Tutor Sessions',
        '100 MCQs per month',
        'Basic Progress Tracking',
        'Email Support',
        '1GB Storage',
        '2 Subject Access'
      ],
      buttonText: 'Start Basic Plan',
      highlight: false
    },
    {
      name: 'Student Premium',
      description: 'Our most popular plan for serious learners',
      monthlyPrice: 19,
      yearlyPrice: 199,
      features: [
        'Unlimited AI Tutor Sessions',
        'Unlimited MCQ Generation',
        'Advanced Analytics',
        'Priority Support',
        '5GB Storage',
        'All Subjects Access'
      ],
      buttonText: 'Start Premium Plan',
      highlight: true
    },
    {
      name: 'Family Plan',
      description: 'Best value for families learning together',
      monthlyPrice: 49,
      yearlyPrice: 499,
      features: [
        'Up to 5 User Accounts',
        'Unlimited Access for All Users',
        'Advanced Parent Dashboard',
        'Priority Support',
        '20GB Shared Storage',
        'Full Offline Access'
      ],
      buttonText: 'Start Family Plan',
      highlight: false
    }
  ];

  const testimonials = [
    {
      text: "EDSMARTLY has transformed how my children learn. The AI tutor is available whenever they need help.",
      author: "Sarah M., Parent of 2",
      rating: 5
    },
    {
      text: "The MCQ system helped me improve my test scores significantly. Worth every penny!",
      author: "James K., High School Student",
      rating: 5
    },
    {
      text: "As an educator, I'm impressed by the quality of content and the adaptive learning system.",
      author: "Dr. Patricia L., Education Director",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pricing Plans for Every Learning Journey
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose the perfect plan to unlock your educational potential
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className={`text-lg ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex items-center rounded-full w-20 h-10 bg-blue-600 transition-colors duration-200"
          >
            <div className={`absolute left-1 w-8 h-8 bg-white rounded-full transform transition-transform duration-200 ${isAnnual ? 'translate-x-10' : 'translate-x-0'}`} />
          </button>
          <span className={`text-lg ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly (Save 20%)
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-1 lg:grid-cols-3 sm:px-6 lg:px-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105 ${
                plan.highlight 
                  ? 'ring-2 ring-blue-500 bg-white -mt-4 mb-4' 
                  : 'bg-white'
              }`}
            >
              {plan.highlight && (
                <div className="bg-blue-500 text-white text-center py-2">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                  </p>
                  <p className="text-gray-500">
                    per {isAnnual ? 'year' : 'month'}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ${
                  plan.highlight 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mt-16 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="text-lg font-semibold text-gray-900 cursor-pointer">
                Can I switch plans at any time?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. The price difference will be prorated accordingly.
              </p>
            </details>
            {/* Add more FAQ items as needed */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 mt-16 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Try EDSMARTLY free for 14 days. No credit card required.
            </p>
            <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;