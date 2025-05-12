import React, { useEffect, useState, useRef } from 'react' ; 
import { Button } from '@/components/ui/button'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import GlobalApi from '../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { RWebShare } from "react-web-share";

import htmlDocx from 'html-docx-js/dist/html-docx'; 
import { saveAs } from 'file-saver';


function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const printRef = React.useRef(null);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data);
    });
  };

  
  
  const HandleDownload = async () => {
  window.print();
  };
  


  const HandleDownloadDocx = () => {
    if (!printRef.current) return;

    // Inline styles recommended for better DOCX appearance
    const content = printRef.current.innerHTML;
    const html =
      "<!DOCTYPE html><html><head><meta charset='utf-8'>" +
      "<style>body{font-family:sans-serif;}</style>" +
      "</head><body>" + content + "</body></html>";

    const converted = htmlDocx.asBlob(html);
    saveAs(converted, 'resume.docx');
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>Congrats! Your AI-generated Resume is Ready!</h2>
          <p className='text-center'>Now you are ready to download and apply for jobs!</p>

          <div className='flex justify-between px-10 my-10 gap-4 flex-wrap'>
          <Button onClick={HandleDownload}>Download</Button>

            <Button onClick={HandleDownloadDocx} disabled={!resumeInfo}>Download DOCX</Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it ",
                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div ref={printRef} id="print-area">
        {resumeInfo && <ResumePreview resumeInfo={resumeInfo} selectedTemplate={resumeInfo.templateType} />}

        </div>
      </div>  
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume;  