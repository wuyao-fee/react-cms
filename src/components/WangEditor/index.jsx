import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
// import { IDomEditor, IEditorConfig } from "@wangeditor/editor";

export default function WangEditor(props) {
  // 存储editor实例
  const [editor, setEditor] = useState();
  // 编辑器内容
  const [html, setHtml] = useState("<p>hellio</p>");

  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello&nbsp;world</p>");
    }, 1500);
  }, []);

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容..."
  };

  const pro = (html) => {
    props.handleSubmitEdit(html);
    console.log(html, "子组件html");
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="editor-container">
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "400px", "overflow-y": "hidden" }}
        />
        <Button type="primary" onClick={() => pro(html)}>
          传递
        </Button>
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </div>
  );
}
