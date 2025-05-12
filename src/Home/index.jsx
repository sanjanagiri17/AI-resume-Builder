import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import Header from '../components/ui/custom/Header';
import { Sparkles, FileText, Brain, CheckCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-br from-white to-gray-100">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Build Your Perfect Resume with <span className="text-blue-600">AI</span>
        </motion.h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Get job-ready resumes in minutes. Powered by AI. Tailored for your dream job.
        </p>
        <Button onClick={handleStartBuilding} className="text-lg px-8 py-4">Start Building</Button>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3 px-6 max-w-6xl mx-auto">
          <FeatureCard title="AI-Powered" icon={<Brain />} text="Let AI craft your job summary based on your job title." />
          <FeatureCard title="ATS Friendly" icon={<CheckCircle />} text="Designed to pass applicant tracking systems." />
          <FeatureCard title="Easy to Use" icon={<Sparkles />} text="Simple UI. Just input details and download your resume." />
        </div>
      </section>

      {/* ATS Optimization Section */}
<section className="py-20 bg-white text-center">
  <h2 className="text-3xl font-bold mb-4">Built for the ATS Era</h2>
  <p className="text-lg max-w-2xl mx-auto mb-10">
    Our resumes are optimized to pass Applicant Tracking Systems used by top companies.
  </p>

  <div className="flex flex-wrap justify-center gap-6 px-6">
    <div className="w-72 p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
      <h3 className="font-semibold text-lg mb-2">✅ Clean Formatting</h3>
      <p>No tables or fancy layouts that confuse ATS bots.</p>
    </div>
    <div className="w-72 p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
      <h3 className="font-semibold text-lg mb-2">🔍 Keyword Optimization</h3>
      <p>AI-generated summaries include role-specific keywords.</p>
    </div>
    <div className="w-72 p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg">
      <h3 className="font-semibold text-lg mb-2">📄 Proper Structure</h3>
      <p>Standard section titles ensure ATS compatibility.</p>
    </div>
  </div>
</section>


      {/* Resume Templates Preview */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Choose Your Style</h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Pick from professional, modern, or creative templates – all optimized for recruiters and ATS.
        </p>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {["Modern", "Professional", "Creative"].map((name, i) => (
            <div
              key={i}
              className="w-72 h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 bg-white"
            >
              <img
                src={`/templates/template${i + 1}.png`}
                alt={`${name} Template`}
                className="object-cover w-full h-full"
              />

              <div className="p-2 text-center font-semibold">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Resume Demo */}
      <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Live Resume Builder Demo</h2>
          <p className="text-lg max-w-xl mx-auto mt-4">Watch as your resume is crafted in real-time.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="font-bold text-xl mb-4">User Input</h4>
            <ul className="space-y-3 text-left">
              <li><span className="font-semibold">Name:</span> Jane Doe</li>
              <li><span className="font-semibold">Title:</span> Front-End Developer</li>
              <li><span className="font-semibold">Skills:</span> React, Tailwind, JavaScript</li>
              <li><span className="font-semibold">Experience:</span> 3 Years at TechCorp</li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h4 className="text-xl font-bold text-blue-600 mb-4">Live Resume Preview</h4>
            <div className="text-left font-mono text-sm leading-6 space-y-2">
              <p className="font-bold text-xl">Jane Doe</p>
              <p>Front-End Developer</p>
              <hr />
              <p><span className="font-semibold">Skills:</span> React, Tailwind CSS, JavaScript</p>
              <p><span className="font-semibold">Experience:</span> Developed scalable UIs at TechCorp</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Resume Builder | All rights reserved
      </footer>
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ title, icon, text }) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
      <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{text}</p>

      
    

    </div>


  );
}

export default Home;
