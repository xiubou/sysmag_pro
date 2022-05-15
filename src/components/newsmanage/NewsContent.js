import React,{useEffect, useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsContent(props) {
    const [editorState, setEditorState] = useState("")
    
    useEffect(()=>{
        // console.log(props.content)
        if(props.content === undefined) return // 若更新内容转换展示
        const contentBlock = htmlToDraft(props.content);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
    },[props.content])

    return (
        <div style={{border: '1px solid #F1F1F1',minHeight:'200px'}}>
            <Editor
                editorState={editorState}
                toolbarClassName="mytoolbar"
                wrapperClassName="mywrapper"
                editorClassName="myeditor"
                onEditorStateChange={(editorState)=>setEditorState(editorState)}

                onBlur={()=>{
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
