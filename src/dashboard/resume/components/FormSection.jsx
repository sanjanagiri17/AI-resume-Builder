import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home,  LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from './ThemeColor';
import ATSAnalyzer from "../../../resume/components/ATSAnalyzer";


function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1); // ✅ Start with Personal Details
  const [enabledNext, setEnableNext] = useState(false);
  const {resumeid}=useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
      
      <div className='flex gap-5'>
            <Link to={"/dashboard"}>
          <Button><Home/></Button>
          </Link>
          <ThemeColor/>
         
          </div>


        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}

          <Button
            // disabled={!enabledNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Dynamic Form Rendering */}
      {activeFormIndex === 1 ? (
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : activeFormIndex === 6 ?( 
          <ATSAnalyzer/>
      ) : activeFormIndex === 7 ?( 
        <Navigate to={'/my-resume/'+resumeid+"/view"}/>
      ) : null}
    </div>
  );
}

export default FormSection;
