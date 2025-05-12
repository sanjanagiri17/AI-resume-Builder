const ClassicTemplate = ({ resumeInfo = {} }) => {
    const themeColor = resumeInfo.themeColor || "#333";
  
    // Fallback dummy data
    const firstName = resumeInfo.firstName || "James";
  const lastName = resumeInfo.lastName || "Carter";
  const jobTitle = resumeInfo.jobTitle || "Full Stack Developer";
  const address = resumeInfo.address || "525 N Tryon Street, NC 28117";
  const phone = resumeInfo.phone || "(123)-456-7890";
  const email = resumeInfo.email || "example@gmail.com";
  const summary =
    resumeInfo.summery ||
    "Dedicated developer with strong experience in full-stack technologies and agile workflows. Passionate about building performant applications that solve real-world problems.";
  const skills = resumeInfo.skills || [];
  const experience = resumeInfo.experience || [];
  const education = resumeInfo.education || [];

  console.log("Experience Data:", experience);
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white text-black font-sans text-sm leading-relaxed ">
       {/* Header */}
        <div className="mb-4 flex justify-between items-start w-full max-w-4xl">
            <div>
                <h1 className="text-blue-600 text-4xl font-normal leading-tight" style={{ color: themeColor }}>
                    {firstName} {lastName}
                </h1>
                <h2 className="text-blue-400 text-lg font-normal leading-tight mt-1" style={{ color: themeColor }}>
                {jobTitle}
                </h2>
                </div>
                <div className="text-right text-blue-600 text-xs font-normal leading-tight space-y-0.5 p-4" style={{ color: themeColor }}>
                    <p>{email} · {phone}</p>
                    <p>{address}</p>
                </div>
            </div>
  
        {/* Summary / Profile */}
        <div >
          <h3 className="text-base font-bold mb-1" style={{ color: themeColor }}>
           
          </h3>
          <p className="text-sm text-gray-800">{summary}</p>
        </div>
  
        {/* Experience */}
        <div className='my-6'>
      <h2 className='text-left  text-3xl mb-2' style={{ color: themeColor }}>
        Professional Experience
      </h2>

      

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className='my-5 '>
          <h2 className='text-sm ' style={{ color: themeColor }}>
            {experience?.title}
          </h2>
          <h2 className='text-xs flex justify-between mb-4' style={{ color: themeColor }} >
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
          </h2>

          {/* Supports HTML formatting */}
          <div dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
        </div>
      ))}
    </div>





      {/**  Educational details */}

      <div className='my-6'>
      <h2 className='text-left text-3xl mb-2' style={{ color: themeColor }}>
        Education
      </h2>


      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm ' style={{ color: themeColor }}>
          {education?.degree}  {education?.major}
          </h2>
          <h2 className='text-xs flex justify-between'>
          {education?.universityName} 
            <span>{education?.startDate} - {education?.endDate}</span>
          </h2>
          <p className='text-xs my-2'>{education?.description}</p>
        </div>
      ))}
    </div>


  
        {/* Skills */}
        <div class="my-6">
            <h2 class="text-left text-3xl mb-2" style={{ color: themeColor }}>Area of Experties</h2>
            <ul className="list-disc pl-5 grid grid-cols-2 gap-3 my-4">
            {resumeInfo?.skills?.map((skill, index) => (
              <li
                key={index}
                className="text-xs text-black marker:text-[var(--theme-color)]"
                style={{ '--theme-color': themeColor }}
              >
                {skill?.name}
              </li>
            ))}
          </ul> 
        </div>
  
       
      </div>
    );
  };
  
  export default ClassicTemplate;
  