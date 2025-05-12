// src/service/ATSUtils.js
export const calculateATSScore = (resumeText, jobDescription) => {
    const resumeWords = resumeText.toLowerCase().split(/\W+/);
    const jobWords = jobDescription.toLowerCase().split(/\W+/);
    const matchedWords = jobWords.filter(word => resumeWords.includes(word));
    const score = (matchedWords.length / jobWords.length) * 100;
  
    return {
      score: Math.round(score),
      matchedWords: [...new Set(matchedWords)]
    };
  };
  