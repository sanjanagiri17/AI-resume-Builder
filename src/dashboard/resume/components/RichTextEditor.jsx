import React, { useState , useEffect } from 'react'
import  Editor , { EditorProvider , BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
   
    BtnUnderline,
    BtnUndo,
    Separator,
    Toolbar, } from 'react-simple-wysiwyg'
 import { Button } from '@/components/ui/button.jsx';
 import { Brain, LoaderCircle } from "lucide-react";
 import { toast } from 'sonner';


function RichTextEditor({ onRichTextEditorChange, experienceData = {}, onGenerateAI ,defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const [generating] = useState(false);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    return (
      <div>
        <div className='flex justify-between my-2'>
          <label className='text-xs' name="workSummery" >Work Summary</label>
          <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-fuchsia-500 text-fuchsia-500 transition-all duration-200"
          onClick={onGenerateAI}
          disabled={generating}
        >
           {generating ? <LoaderCircle className="animate-spin w-4 h-4" /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
        </Button>
        </div>
        <EditorProvider>
          <Editor
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onRichTextEditorChange(e);
            }}
          >
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <Separator />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
    );
  }
  
  export default RichTextEditor;
  