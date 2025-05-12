import React from 'react'

function ExperiencePrview({ resumeInfo }) {
  if (!resumeInfo) return null;

  const themeColor = resumeInfo?.themeColor || '#ff6666';

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Professional Experience
      </h2>

      <hr className='border-[1.5px] my-2' style={{ borderColor: themeColor }} />

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: themeColor }}>
            {experience?.title}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
          </h2>

          {/* Supports HTML formatting */}
          <div dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePrview;
