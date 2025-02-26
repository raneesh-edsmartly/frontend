import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoonVideo from '../../assets/moon.mp4';
import MissionImage from '../../assets/mission.jpg';
import BloomImage from '../../assets/bloom.jpg';
import WebbImage from '../../assets/webb.jpg';
import InteractiveButton from '../../components/InteractiveButton';

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const quote = document.querySelector('.hero-quote');
    if (quote) {
      quote.style.opacity = '1';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A1929] to-black">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            src={MoonVideo}
            className="w-full h-full object-cover opacity-60"
            autoPlay
            loop
            muted
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            disablePictureInPicture
            disableRemotePlayback
          />
          {/* Darker Gradient Overlay for Video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/10 to-black/70"></div>
        </div>

        {/* Quote Container with Updated Colors */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="hero-quote opacity-0 transition-opacity duration-1000 max-w-6xl mx-auto space-y-20">
            <div className="space-y-6">
              <p className="text-3xl md:text-3xl lg:text-3xl font-['Work_Sans'] text-gray-300 leading-tight">
                "Critical thinking is like exploring the stars, each question illuminates
              </p>
              <p className="text-3xl md:text-3xl lg:text-3xl font-['Work_Sans'] text-gray-300 leading-tight">
                new constellations of knowledge"
              </p>
            </div>
            <p className="text-base md:text-lg uppercase text-gray-300 font-light tracking-[.4em] pt-12">EDSMARTLY</p>
          </div>
        </div>
      </div>

      {/* Main Content with Dark Theme */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Title Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent pb-2">
            Advanced AI for Education
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            At EDSMARTLY, we harness the power of advanced artificial intelligence to revolutionize educational experiences. Our innovative platforms combine intelligent dialogue systems with sophisticated assessment tools, creating a comprehensive learning environment that adapts to each student's unique journey.
          </p>
        </section>

        {/* About EdSmartly Section */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            About EdSmartly
          </h2>
          <p className="text-gray-200 leading-relaxed">
            EdSmartly is an innovative AI company registered in England, specializing in revolutionizing student learning through customized Retrieval-Augmented Generation (RAG) AI solutions. Our mission is to empower students by creating advanced educational tools that enhance comprehension, engagement, and critical thinking. We are committed to transforming education through cutting-edge technology and personalized learning experiences.
          </p>
        </section>

        {/* Our Foundation */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Our Foundation
          </h2>
          <p className="text-gray-200 leading-relaxed">
            EDSMARTLY emerged from a powerful vision: creating educational technology that truly understands and adapts to each student's learning journey. Founded by a distinguished team of educators, technologists, and learning scientists, we recognized that education's future lies in the seamless integration of intelligent dialogue and assessment systems. Our foundation rests on the belief that technology should not merely automate education but transform it into a more engaging, effective, and personalized experience.
          </p>
        </section>

        {/* Mission Image */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <div className="flex justify-center">
            <img
              src={MissionImage}
              alt="Our Mission"
              style={{ width: '80%' }}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-gray-200 leading-relaxed">
              EDSMARTLY is dedicated to developing educational technology that enhances both teaching and learning. We go beyond simple automation, creating tools that foster deeper understanding, critical thinking, and genuine engagement with academic content. Through the fusion of advanced artificial intelligence and proven pedagogical methods, we're making high-quality, personalized education accessible to all.
            </p>
          </div>
          <div className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-4 text-center">
              Our Vision
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We envision a future where every student has access to personalized learning experiences that adapt to their needs, every teacher is empowered with intelligent tools that enhance their effectiveness, and every educational institution can make data-driven decisions that improve outcomes.
            </p>
          </div>
        </section>

        {/* Educational Philosophy */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Educational Philosophy
          </h2>
          <div className="space-y-6">
            <p className="text-gray-200 leading-relaxed">
              Our approach to educational technology is firmly grounded in research-backed pedagogical principles. We believe effective learning occurs at the intersection of meaningful dialogue, targeted assessment, and personalized feedback. This philosophy drives the development of our two core products.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#4F46E5] mb-3 text-center">
                  Socratic Learning System
                </h3>
                <p className="text-gray-200">
                  Facilitates dynamic, AI-driven dialogues that challenge students to think critically and develop deeper understanding.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0EA5E9] mb-3 text-center">
                  Intelligent MCQ Generation
                </h3>
                <p className="text-gray-200">
                  Creates sophisticated assessments that accurately measure comprehension while providing valuable insights for educators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloom's Taxonomy Image */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={BloomImage}
              alt="Bloom's Taxonomy"
              style={{ width: '80%' }}
              className="rounded-lg shadow-lg object-cover"
            />
            <p className="text-xl text-gray-200 font-medium">Levels of Intellect</p>
          </div>
        </section>

        {/* Technology Innovation */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Technology Innovation
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            EDSMARTLY's technological foundation combines cutting-edge artificial intelligence with sophisticated educational frameworks. Our implementation of Retrieval Augmented Generation (RAG) ensures accurate, contextually relevant responses while maintaining educational rigor.
          </p>
          <p className="text-gray-200 leading-relaxed">
            We've developed proprietary algorithms that integrate multiple educational frameworks, including Bloom's Taxonomy and Webb's Depth of Knowledge, ensuring that our technology serves genuine pedagogical purposes.
          </p>
        </section>

        {/* Leadership and Expertise */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Leadership and Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#4F46E5] text-center">
                Educational Leadership
              </h3>
              <p className="text-gray-200">
                Our curriculum specialists and pedagogical researchers ensure that every aspect of our platform aligns with proven educational principles.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0EA5E9] text-center">
                Technical Innovation
              </h3>
              <p className="text-gray-200">
                Our AI and machine learning experts continuously advance our technological capabilities, creating more sophisticated and effective learning tools.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#4F46E5] text-center">
                Implementation Excellence
              </h3>
              <p className="text-gray-200">
                Our dedicated professionals ensure smooth integration of our platforms into existing educational environments.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0EA5E9] text-center">
                Quality Assurance
              </h3>
              <p className="text-gray-200">
                Our specialists maintain rigorous standards for educational effectiveness and content accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Measurable Impact */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Measurable Impact
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            EDSMARTLY's implementation across diverse educational environments has demonstrated significant improvements in learning outcomes. Student engagement with complex academic content has increased by substantial margins through our interactive dialogue system.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Assessment outcomes show marked improvement through our targeted practice and feedback mechanisms. Teachers report enhanced ability to track and support student progress through our detailed learning analytics.
          </p>
        </section>

        {/* Webb's Depth of Knowledge Image */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={WebbImage}
              alt="Webb's Depth of Knowledge"
              style={{ width: '80%' }}
              className="rounded-lg shadow-lg object-cover"
            />
            <p className="text-xl text-gray-200 font-medium">Depth of Knowledge</p>
          </div>
        </section>

        {/* Research and Development */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Research and Development
          </h2>
          <p className="text-gray-200 leading-relaxed">
            We maintain active research partnerships with leading educational institutions to ensure our technology remains at the forefront of educational advancement. Our research initiatives focus on advancing natural language processing for educational applications, developing sophisticated assessment algorithms, integrating emerging pedagogical frameworks, and enhancing personalization capabilities.
          </p>
        </section>

        {/* Implementation and Support */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] bg-clip-text text-transparent mb-6 text-center">
            Implementation and Support
          </h2>
          <p className="text-gray-200 leading-relaxed">
            EDSMARTLY provides comprehensive support throughout the implementation process. Our dedicated educational support team works closely with institutions from initial integration through ongoing optimization, ensuring maximum benefit from our technology. We understand that successful implementation requires both technical excellence and educational expertise, and our support framework delivers both.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-[#1A1F2C]/95 rounded-2xl p-8 shadow-lg text-center backdrop-blur-sm border border-gray-800">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Join Us in Shaping the Future of Education
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
            Whether you're an educational institution looking to enhance learning outcomes, a potential partner interested in advancing educational technology, or an educator seeking innovative tools, EDSMARTLY is ready to support your journey toward educational excellence.
          </p>
          <div className="flex flex-col items-center gap-4">
            <InteractiveButton
              text="Learn more"
              onClick={() => navigate('/learn-more')}
              className="bg-[#2563EB] hover:bg-[#3B82F6] text-white transition-colors duration-300"
            />
            <button className="bg-[#272727] text-white px-8 py-3 rounded-lg font-semibold border border-[#3B82F6] hover:bg-[#1A1F2C] transition-colors duration-300">
              Partner With Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;