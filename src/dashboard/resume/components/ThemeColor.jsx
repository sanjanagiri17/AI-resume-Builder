import React, { useContext, useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || "");
  const { resumeid } = useParams();

  useEffect(() => {
    setSelectedColor(resumeInfo?.themeColor || "");
  }, [resumeInfo?.themeColor]);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color
    });

    const data = {
      data: {
        themeColor: color
      }
    };

    GlobalApi.UpdateResumeDetail(resumeid, data).then(resp => {
      toast('Theme color updated');
    }).catch(err => {
      toast('Failed to update theme color');
      console.error(err);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((item, index) => (
            <div
              key={index}
              title={item}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border
                ${selectedColor === item ? 'border-2 border-black' : ''}`}
              style={{ background: item }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
