import React from 'react'

function SkillPreview({ resumeInfo }) {
  if (!resumeInfo) return null;

  const themeColor = resumeInfo?.themeColor || '#ff6666';

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{
        color: themeColor
      }}>Skills</h2>

      <hr className='border-[1.5px] my-2' style={{
        borderColor: themeColor
      }} />
      
      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <h2 className='text-xs'>{skill?.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px]'>
              <div className='h-2' style={{
                backgroundColor: themeColor,
                width: (skill?.rating || 0) * 20 + '%'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
