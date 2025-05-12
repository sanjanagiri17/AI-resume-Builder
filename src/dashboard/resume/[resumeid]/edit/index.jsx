import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';


function EditResume() {
    const { resumeid } = useParams();
    const location = useLocation(); // Get the current location (URL)
    const [resumeInfo, setResumeInfo] = useState();
    const [selectedTemplate, setSelectedTemplate] = useState(null); // State for storing selected template

    // Extract template from URL query parameters
    const params = new URLSearchParams(location.search);
    const template = params.get('template');

    useEffect(() => {
        if (template) {
            setSelectedTemplate(template); // Set the selected template
        }
        GetResumeInfo(); // Fetch resume data
    }, [template]);

    // Fetch resume data by resume ID
    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeid).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        });
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section  */}
                <FormSection selectedTemplate={selectedTemplate} /> {/* Pass the selected template to FormSection */}

                {/* Preview Section  */}
                <ResumePreview selectedTemplate={selectedTemplate} /> {/* Pass the selected template to ResumePreview */}
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
