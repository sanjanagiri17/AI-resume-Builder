import React from 'react'

function SummeryPreview({ resumeInfo }) {
  if (!resumeInfo) return null;

  const themeColor = resumeInfo?.themeColor || '#ff6666';

  return (
    <div className='my-6'>
   { /*  <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Summary
      </h2>

      <hr className='border-[1.5px] my-2' style={{ borderColor: themeColor }} />*/}

      <p className='text-xs'>
        {resumeInfo?.summery}
      </p>
    </div>
  );
}

export default SummeryPreview;
