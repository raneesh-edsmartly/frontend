import React, { useEffect } from 'react'; // Import useEffect
import {
  Brain,
  BookOpen,
  Server,
  Shield,
  Database,
  BarChart2,
  CheckCircle,
  Award,
  FileText,
  Layers,
  Network
} from 'lucide-react';
import learnMoreImage from '../../assets/learn-more.jpg'; // Import the image

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white/80 shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const TechSection = ({ icon: Icon, title, children }) => (
  <div className="bg-white/80 p-8 rounded-2xl shadow-lg">
    <div className="flex items-center gap-4 mb-6 justify-center">
      <Icon className="w-8 h-8 text-black" />
      <h3 className="text-2xl font-bold text-black text-center">{title}</h3>
    </div>
    {children}
  </div>
);

const LearnMore = () => {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-16">
          <img 
            src={learnMoreImage} 
            alt="Advanced Educational Technology" 
            className="w-full h-auto rounded-2xl shadow-lg mb-8" 
          />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight leading-tight text-center">
            Advanced Educational Technology
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-center">
            Pioneering AI-driven learning through our Socratic Learning System and 
            Intelligent MCQ Generation Platform, designed to transform educational experiences.
          </p>
        </section>

        {/* Core Products */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4 justify-center">
                <Brain className="w-12 h-12 text-blue-600" />
                <h2 className="text-3xl font-bold text-black text-center">Socratic Learning System</h2>
              </div>
              <p className="text-gray-700 text-center">
                Our Socratic Learning System leverages Retrieval Augmented Generation (RAG) technology to process educational content through multiple layers of analysis, ensuring contextually relevant responses. The system employs advanced natural language processing to understand student inquiries, retrieve relevant information, and generate responses that promote deeper understanding.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Sophisticated dialogue management system with context retention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Multi-dimensional content processing pipeline for semantic understanding, conceptual relationships, and pedagogical relevance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Adaptive learning path algorithms tailored to individual student needs</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4 justify-center">
                <FileText className="w-12 h-12 text-purple-600" />
                <h2 className="text-3xl font-bold text-black text-center">MCQ Generation System</h2>
              </div>
              <p className="text-gray-700 text-center">
                Our MCQ Generation System combines advanced AI with comprehensive educational frameworks to generate targeted, adaptive questions. The system integrates Bloom's Taxonomy and Webb's Depth of Knowledge to ensure questions align with specific learning objectives and adapt to individual student performance.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Intelligent distractor generation based on common misconceptions and learning patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Multi-layer validation system ensuring technical accuracy and pedagogical effectiveness</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Analytics capabilities for detailed performance tracking and insights</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Technical Innovation */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Technical Innovation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TechSection icon={Brain} title="RAG Architecture">
              <div className="space-y-4">
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Content Processing</h4>
                  <p className="text-gray-700 text-center">Advanced semantic analysis and conceptual mapping for accurate information retrieval</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Context Management</h4>
                  <p className="text-gray-700 text-center">Sophisticated dialogue state tracking to maintain conversation context</p>
                </div>
              </div>
            </TechSection>

            <TechSection icon={Network} title="Neural Systems">
              <div className="space-y-4">
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Learning Algorithms</h4>
                  <p className="text-gray-700 text-center">Adaptive pathways and performance optimization based on student interactions</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Pattern Recognition</h4>
                  <p className="text-gray-700 text-center">Advanced student behavior analysis to identify learning patterns and misconceptions</p>
                </div>
              </div>
            </TechSection>

            <TechSection icon={Layers} title="Assessment Engine">
              <div className="space-y-4">
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Question Generation</h4>
                  <p className="text-gray-700 text-center">Framework-aligned content creation for targeted learning objectives</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-black text-center">Validation System</h4>
                  <p className="text-gray-700 text-center">Multi-stage quality assurance to ensure question accuracy and effectiveness</p>
                </div>
              </div>
            </TechSection>
          </div>
        </section>

        {/* Educational Framework */}
        <section className="bg-white/80 rounded-2xl p-12 shadow-lg">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Educational Framework</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Pedagogical Foundations</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Learning Theories</h4>
                    <p className="text-gray-700 text-center">Implementation of modern cognitive science research to support knowledge construction and retention</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Adaptive Learning</h4>
                    <p className="text-gray-700 text-center">Personalized pathways and scaffolding techniques to support diverse learning styles</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Quality Assurance</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Validation Process</h4>
                    <p className="text-gray-700 text-center">Multi-layer review system with expert oversight to ensure educational effectiveness</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Content Standards</h4>
                    <p className="text-gray-700 text-center">Rigorous educational effectiveness criteria to maintain high standards across all content</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Implementation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">Technical Integration</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Server className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Seamless infrastructure integration with existing educational technology systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Enterprise-grade security protocols to protect sensitive data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Scalable architecture design to handle varying loads and user demands</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">Support Systems</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Comprehensive training resources for effective platform utilization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BarChart2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Performance monitoring tools to track and analyze educational outcomes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Dedicated support team for ongoing assistance and optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Research and Development */}
        <section className="bg-white/80 rounded-2xl p-12 shadow-lg">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Research and Development</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Current Initiatives</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Advanced NLP</h4>
                    <p className="text-gray-700 text-center">Research in advanced natural language processing to enhance dialogue systems</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Adaptive Learning</h4>
                    <p className="text-gray-700 text-center">Development of adaptive learning algorithms for personalized education</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Future Developments</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Expanded Subject Coverage</h4>
                    <p className="text-gray-700 text-center">Plans to expand subject coverage to include more disciplines and specialized topics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Enhanced Personalization</h4>
                    <p className="text-gray-700 text-center">Future enhancements to personalization capabilities for more tailored learning experiences</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies and Impact Analysis */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Case Studies and Impact Analysis</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">Implementation Success Stories</h3>
                <p className="text-gray-700 text-center">Detailed case studies demonstrating significant improvements in student engagement and academic performance across diverse educational environments.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">Performance Metrics</h3>
                <p className="text-gray-700 text-center">Comprehensive analysis of student interactions and assessment results showing consistent improvement in understanding and retention across multiple subject areas and student populations.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resource Center */}
        <section className="bg-white/80 rounded-2xl p-12 shadow-lg">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Resource Center</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Documentation and Guides</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Technical Specifications</h4>
                    <p className="text-gray-700 text-center">Comprehensive documentation covering all technical aspects of the platform</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Pedagogical Implementation Guides</h4>
                    <p className="text-gray-700 text-center">Detailed guides for effective deployment and utilization of our technology</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Research Publications</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">White Papers</h4>
                    <p className="text-gray-700 text-center">Access to white papers detailing the theoretical foundations of our approaches</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black text-center">Research Articles</h4>
                    <p className="text-gray-700 text-center">Empirical validation of our educational technology through research publications</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;