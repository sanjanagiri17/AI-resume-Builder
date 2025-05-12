import React, { useEffect, useState, useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: ""
};

function Experience() {
  const [experinceList, setExperinceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  
  useEffect(()=>{
    resumeInfo?.Experience.length>0&&setExperinceList(resumeInfo?.Experience)
    
},[])

const handleChange=(index,event)=>{
  const newEntries=experinceList.slice();
  const {name,value}=event.target;
  newEntries[index][name]=value;
  console.log(newEntries)
  setExperinceList(newEntries);
}

const AddNewExperience=()=>{
    
  setExperinceList([...experinceList,{
      title:'',
      companyName:'',
      city:'',
      state:'',
      startDate:'',
      endDate:'',
      workSummery:'',
  }])
}

const RemoveExperience=()=>{
  setExperinceList(experinceList=>experinceList.slice(0,-1))
}

const handleRichTextEditor=(e,name,index)=>{
  const newEntries=experinceList.slice();
  newEntries[index][name]=e.target.value;
 
  setExperinceList(newEntries);
}

  const generateWorkSummaryFromAI = async (index) => {
    const experience = experinceList[index];
    const {
      title = '',
      companyName = '',
      city = '',
      state = '',
      startDate = '',
      endDate = ''
    } = experience;

    const prompt = `Write a concise and professional 3-5 line work experience summary for someone who worked as a ${title || 'Software Developer'} at ${companyName || 'a tech company'} in ${city}, ${state} from ${startDate} to ${endDate}. Focus on achievements, responsibilities, and skills.`;

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const newEntries = [...experinceList];
      newEntries[index].workSummery = text.trim();
      setExperinceList(newEntries);
      toast("AI work summary generated!");
    } catch (error) {
      console.error("AI generation failed:", error);
      toast("Failed to generate work summary");
    }
  };

  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        Experience:experinceList
    });
 
},[experinceList]);

  const onSave=()=>{
    setLoading(true)
    const data={
        data:{
            Experience:experinceList.map(({ id, ...rest }) => rest)
        }
    } 
    console.log(experinceList)

    GlobalApi.UpdateResumeDetail(params.resumeid, data).then(res => {
      console.log(res);
      setLoading(false);
      toast('Details updated!');
    }).catch(error => {
      console.error("Update failed:", error);
      setLoading(false);
      toast('Server Error, Please try again!');
    });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-fuchsia-500 border-t-4 mt-1">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>
      <div>
        {experinceList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Position Title</label>
              <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
            </div>
            <div>
              <label className="text-xs">Company Name</label>
              <Input name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
            </div>
            <div>
              <label className="text-xs">City</label>
              <Input name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
            </div>
            <div>
              <label className="text-xs">State</label>
              <Input name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
            </div>
            <div>
              <label className="text-xs">Start Date</label>
              <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
            </div>
            <div>
              <label className="text-xs">End Date</label>
              <Input type="date" name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className="col-span-2">
              <RichTextEditor
                experienceData={item}
                defaultValue={item?.workSummery}
                onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
                onGenerateAI={() => generateWorkSummaryFromAI(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewExperience}>+ Add More Experience</Button>
          <Button variant="outline" onClick={RemoveExperience}>- Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
