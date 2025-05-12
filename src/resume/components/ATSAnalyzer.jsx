// src/resume/components/ATSAnalyzer.jsx
import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { calculateATSScore } from './../../../service/ATSUtils';

function ATSAnalyzer() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    const fullText = `${resumeInfo.summery} ${resumeInfo.skills?.join(' ')} ${resumeInfo.experience?.map(e => e.title + ' ' + e.description).join(' ')}`;
    const analysis = calculateATSScore(fullText, jobDesc);
    setResult(analysis);
  };

  console.log("Resume:", resumeInfo?.summery);
console.log("Job Desc:", jobDesc);
console.log("Analysis Result:", result);

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="font-bold mb-2">ATS Analyzer</h2>
      <textarea
        className="w-full p-2 border mb-2"
        placeholder="Paste Job Description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAnalyze}>
        Analyze
      </button>
      {result && (
        <div className="mt-4">
          <p><strong>ATS Score:</strong> {result.score}%</p>
          <p><strong>Matched Keywords:</strong> {result.matchedWords.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default ATSAnalyzer;
