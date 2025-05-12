import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Summery = ({ enabledNext }) => {
  const { resumeInfo = {}, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState(""); // ✅ Moved inside component
  const params = useParams();

  const experienceLevels = ["Fresher", "Junior", "Experienced"]; // ✅ Moved inside component

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery
      });
    }
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
       
      }
    };
    GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Details Updated");
    }).catch(error => setLoading(false));
  };

  const generateSummaryFromAI = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      setGenerating(true);

      const jobTitle = resumeInfo?.jobTitle?.trim() || "software developer";
      let prompt = "";

      switch (experienceLevel) {
        case "Fresher":
          prompt = `Write a resume summary for a fresher applying for a ${jobTitle} role. Highlight academic background, enthusiasm, and willingness to learn. Keep it concise (4-5 lines).`;
          break;
        case "Junior":
          prompt = `Write a resume summary for a junior ${jobTitle} with 1-3 years of experience. Emphasize early achievements and growth mindset. 4-5 lines.`;
          break;
        case "Experienced":
          prompt = `Write a resume summary for an experienced ${jobTitle} with 3+ years of experience. Focus on expertise, leadership, and impact. 4-5 lines.`;
          break;
        default:
          prompt = `Write a professional 4-5 line resume summary for a ${jobTitle}.`;
          break;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setSummery(text.trim());
      toast("AI Summary generated!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast("Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-fuchsia-500 border-t-4 mt-1">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex flex-col md:flex-row md:items-center gap-3 justify-between'>
            <label className="font-medium">Add Summary</label>

            <div className='flex flex-col md:flex-row md:items-center gap-3'>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                type="button"
                className="border-fuchsia-500 text-fuchsia-500 flex gap-2"
                onClick={generateSummaryFromAI}
                disabled={generating || !experienceLevel}
              >
                {generating ? <LoaderCircle className="animate-spin w-4 h-4" /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
              </Button>
            </div>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Summery;
