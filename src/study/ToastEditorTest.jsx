import React, {useEffect} from 'react';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {Editor} from '@toast-ui/react-editor';

function ToastEditorTest(props) {
    const editorRef = React.createRef();

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown();
        }
    }, []);

    const handleClick = () => {
        console.log("focus");
    };

    return (
        <>
            <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                onFocus={handleClick}
                ref={editorRef}
                theme='dark'
            />
        </>
    );
}

export default ToastEditorTest;
