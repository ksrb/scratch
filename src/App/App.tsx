import { InboxOutlined, MenuOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Image,
  Layout,
  Upload as AntdUpload,
} from "antd";
import React, { FC, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./styles.module.scss";

const Upload: FC = () => {
  const [videoPath1, setVideoPath1] = useState("");

  const handleOnChange = useCallback((event: any) => {
    if (event?.file?.status === "done") {
      const path = URL.createObjectURL(event.file.originFileObj);
      setVideoPath1(path);
    }
  }, []);

  const handleOnRemove = useCallback(() => {
    setVideoPath1("");
  }, []);

  const customRequest = useCallback(({ onSuccess, file }: any) => {
    const checkInfo = () => {
      setTimeout(() => {
        onSuccess(null, file);
      }, 200);
    };
    checkInfo();
  }, []);

  return (
    <>
      <AntdUpload.Dragger
        maxCount={1}
        accept="video/*"
        onChange={handleOnChange}
        onRemove={handleOnRemove}
        customRequest={customRequest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Video</p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </AntdUpload.Dragger>
      <ReactPlayer
        url={videoPath1}
        width="100%"
        height="100%"
        controls={true}
        volume={0}
      />
    </>
  );
};

const FormItem: FC<any> = ({ children, ...props }) => {
  return (
    <Form.Item className={styles.form_item} {...props}>
      {children}
    </Form.Item>
  );
};

function App() {
  return (
    <Layout>
      <Layout.Header className={styles.layout_header}>
        <Image
          height={37}
          width={125}
          preview={false}
          src={process.env.PUBLIC_URL + "/mhslogo.png"}
        />
        <MenuOutlined className={styles.layout_headerMenu} />
      </Layout.Header>
      <Layout.Content className={styles.layout_content}>
        <Form layout="horizontal">
          <FormItem label="Test Date">
            <DatePicker />
          </FormItem>
          <FormItem label="Movement name">
            <AutoComplete />
          </FormItem>
          <FormItem label="Side view">
            <Upload />
          </FormItem>
          <FormItem label="Front view">
            <Upload />
          </FormItem>
          <div className={styles.form_button}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Layout.Content>
    </Layout>
  );
}

export default App;
