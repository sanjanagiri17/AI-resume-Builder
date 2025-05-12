import React from 'react';

const ModernTemplate = ({ resumeInfo = {} }) => {
  const themeColor = resumeInfo.themeColor || "#ff9900";

  const firstName = resumeInfo.firstName || "John";
  const lastName = resumeInfo.lastName || "Resumgo";
  const address = resumeInfo.address || "525 N Tryon Street, NC 28117";
  const phone = resumeInfo.phone || "(123)-456-7890";
  const email = resumeInfo.email || "example@gmail.com";
  const jobTitle = resumeInfo.jobTitle || "Graphic Designer";
  const summary = resumeInfo.summery || "Creative and detail-oriented graphic designer...";
  const skills = resumeInfo.skills || [];
  const experience = resumeInfo.Experience || [];
  const education = resumeInfo.education || [];

  return (
    <div className="max-w-5xl mx-auto font-sans bg-white  text-sm">
      {/* Header */}
      <div className="flex h-40">
        <div className=" w-32 flex flex-col items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: themeColor }}>
        <div>{firstName[0]}</div>
          <div>{lastName[0]}</div>
          <div className="absolute top-0 right-0 w-5 h-5 bg-gray-100 clip-triangle"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 bg-gray-100 clip-triangle-rotated"></div>
        </div>
        <div className="flex-1 bg-gray-100 px-6 py-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
          <h2 className="text-lg tracking-widest uppercase text-gray-600">{jobTitle}</h2>
          <div  style={{ color: themeColor }}>
                    <p> <span className='text-gray-700 '> Email :</span> {email}  <span className='text-gray-700 pl-1.5'> Contect :</span>  {phone}</p>
                    <p> <span className='text-gray-700 pr-1.5'> Address :</span> {address}</p>
                </div>
        </div>
        
      </div>

      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left column */}
        <div className="col-span-2">
          {/* Profile */}
          <div className="mb-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-1" style={{ color: themeColor }}>Profile</h3>
            <p className="text-gray-700 mt-2">{summary}</p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-1" style={{ color: themeColor }}>Experience</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mt-4">
                <p className="font-semibold text-sm">{exp.title} - {exp.startDate} {exp.currentlyWorking ? 'to Present' : `to ${exp.endDate}`}</p>
                <p className="text-xs italic text-gray-600">{exp.companyName} - {exp.city}, {exp.state}</p>
                <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-1">
          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-1" style={{ color: themeColor }}>Skills</h3>
            <ul className="mt-2 space-y-1">
              {skills.map((skill, index) => (
                <li key={index} className="text-sm text-gray-800">{skill.name}</li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-1" style={{ color: themeColor }}>Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="mt-4">
                <p className="font-semibold text-sm">{edu.degree} {edu.major}</p>
                <p className="text-xs italic text-gray-600">{edu.universityName}</p>
                <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                <p className="text-sm mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default ModernTemplate;
