import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePrview from './preview/ExperiencePrview';
import EducationalPreview from './preview/EducationalPreview';
import SkillPreview from './preview/SkillPreview';

// Import templates
import ClassicTemplate from './preview/templates/ClassicTemplate';
import ModernTemplate from './preview/templates/ModernTemplate';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  if (!resumeInfo) return null;

  // Automatically select template based on resumeInfo.templateType
  switch (resumeInfo.templateType) {
    case 'classic':
      return <ClassicTemplate resumeInfo={resumeInfo} />;
    case 'modern':
      return <ModernTemplate resumeInfo={resumeInfo} />;
    default:
      // Fallback if no templateType is defined
      return (
        <div className=' h-full p-14 border-t-[20px]'
          style={{ borderColor: resumeInfo?.themeColor || '#ff6666' }}>
          
          {/* Personal Detail  */}
          <PersonalDetailPreview resumeInfo={resumeInfo} />
          
          {/* Summary */}
          <SummeryPreview resumeInfo={resumeInfo} />
          
          {/* Professional Experience */}
          {resumeInfo?.Experience?.length > 0 && <ExperiencePrview resumeInfo={resumeInfo} />}
          
          {/* Education */}
          {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
          
          {/* Skills */}
          {resumeInfo?.skills?.length > 0 && <SkillPreview resumeInfo={resumeInfo} />}
        </div>
      );
  }
}

export default ResumePreview;
