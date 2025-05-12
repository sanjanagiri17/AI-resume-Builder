import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassicTemplate from '../dashboard/resume/components/preview/templates/ClassicTemplate'; // Adjust path if necessary
import ModernTemplate from '../dashboard/resume/components/preview/templates/ModernTemplate'; // Adjust path if necessary
import dummyData from '@/data/dummy';
import { Loader2, PlusSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
  
} from "@/components/ui/dialog";
import GlobalApi from './../../service/GlobalApi';

function TemplatesPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateType) => {
    setSelectedTemplate(templateType);  // store the selected template
    setOpenDialog(true);
  };

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4(); // Generate a new unique ID for the resume
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        templateType: selectedTemplate
      }
    };

    // Call API to create a new resume
    GlobalApi.CreateNewResume(data).then((resp) => {
      if (resp) {
        setLoading(false);
        // After creating the resume, navigate to the edit page
        navigate(`/dashboard/resume/${resp.data.data.documentId}/edit?template=${selectedTemplate}`);

      }
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">Choose Your Resume Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
       
       {/* Classic Template Card */}
        <div className="border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow">
            {/* Replace ClassicTemplate with background image */}
            <div
                className="h-[500px] bg-contain bg-center bg-no-repeat"
                style={{
                backgroundImage: "url('/public/images/Classic.png')",
                }}
            ></div>

            <div className="p-4 flex justify-center">
                <button
                onClick={() => handleSelectTemplate('classic')}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                Use This Template
                </button>
            </div>
        </div>

        {/* Modern Template Card */}
        <div className="border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow">
        <div
                className="h-[500px] bg-contain bg-center bg-no-repeat"
                style={{
                backgroundImage: "url('/public/images/Modern.png')",
                }}
            ></div>
          <div className="p-4 flex justify-center">
            <button
              onClick={() => handleSelectTemplate('modern')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Use This Template
            </button>
          </div>
        </div>
      </div>

      {/* Dialog for creating new resume */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <Input
                className="my-2"
                placeholder="Ex. Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreate}
              >
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TemplatesPage;
