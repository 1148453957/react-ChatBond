import { useEffect, useState, useCallback } from "react";
import { LoadingOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons'
import { Dropdown, Button, Drawer, Spin, Progress,Upload  } from "antd";
const { Dragger } = Upload;
export function Component({
  isCreate,
  uploadedInfo,
  onFileListAdd,
  onFileDelete,
  trainDisabledChange,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  async function previewFn(type: string) {

  
}
  return (
    <div className="w-full flex flex-col">
    <div className="w-full flex flex-wrap gap-5 mb-5" v-if="props.isCreate">
      <span className="w-full"
        >You can click <EyeOutlined className="text-3 text-#64ed80" /> to preview the file or click
        <UploadOutlined className="text-3 text-#64ed80" /> to upload the default file</span
      >
      <Button className="!h-12 !text-3.5 !fw-500 !rounded-1 !fcc" loading={isLoading}
        >Ecommerce.txt<EyeOutlined
          className="ml-5 text-5 text-#64ed80"
          onClick={()=>previewFn('Ecommerce.txt')}
        />
        <UploadOutlined className="ml-5 text-5 text-#64ed80"  onClick={()=>uploadFn('Ecommerce.txt')} />
      </Button>
      <Button className="!h-12 !text-3.5 !fw-500 !rounded-1 !fcc" loading={isLoading}
        >Education.txt<EyeOutlined
          className="ml-5 text-5 text-#64ed80"
          onClick={()=>uploadFn('Education.txt')}  />
        <UploadOutlined className="ml-5 text-5 text-#64ed80" onClick={()=>uploadFn('Education.txt')}
      /></Button>
      <Button className="!h-12 !text-3.5 !fw-500 !rounded-1 !fcc" loading={isLoading}
        >Financial.txt<EyeOutlined
          className="ml-5 text-5 text-#64ed80"
          onClick={()=>uploadFn('Financial.txt')}  />
        <UploadOutlined className="ml-5 text-5 text-#64ed80" onClick={()=>uploadFn('Financial.txt')} 
      /></Button>
    </div>
    <div className="border-1 border-#E6E6E6 rounded-3 p-6">
      <Dragger
        withCredentials
        data={upDataFn}
        accept=".doc,.docx,.pdf,.txt"
        action="`${botDomain}/api/v1/bot/uploadFileResource`"
        name="file"
        showUploadList={false}
        disabled={isLoading}
        multiple={false}

        change={handleFileChange}
      >
        <p className="ant-upload-drag-icon">

          {isLoading? <Spin  indicator={indicator} />:
          <img  className="w-8 h-8 mt-10 mb-6 mx-auto" src="@/assets/img/icon_upload.png" />
          
          }
         
        </p>
        <p className="ant-upload-hint !text-#040608 mb-2">
          Drag & drop files here, or click to select files
        </p>
        <p className="text-3 text-#9B9B9C">Supported File Types: .pdf, .doc, .docx, .txt</p>

     
      </Dragger>


      <template v-if="attachList.length">
        <div className="flex justify-between my-6">
          <span className="text-4 text-#040608 fw-500">Attached Files</span>
        </div>
        <ul className="max-h-100 overflow-y-scroll">


        {attachList.map((item: any, index: number) => (





          <li
            className="flex justify-between items-center bg-#F7F8F8 mb-2 lh-12 h-12 pl-6 pr-4 rounded-1"
            key={index}
          >
            <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{{
              item.fileName
            }}</span>
            <div className="flex items-center">
              <span className="text-#9B9B9C text-3 mr-4">({{ item.fileCharsNumber }} chars)</span>
              <img
                className="w-30px h-30px cursor-pointer"
                src="@/assets/img/icon_delete.png"
                @click="clickDelete(item.fileId)"
              />
            </div>
          </li>
}

        </ul>
      </template>

      <template v-if="oldList.length">
        <div className="flex justify-between my-6">
          <span className="text-4 text-#040608 fw-500">Uploaded Files</span>
        </div>
        <ul className="max-h-100 overflow-y-scroll">
          <li
            className="flex justify-between items-center bg-#F7F8F8 mb-2 lh-12 h-12 pl-6 pr-4 rounded-1"
            v-for="(item, index) in oldList"
            :key="index"
          >
            <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{{
              item.fileName
            }}</span>
            <div className="flex items-center">
              <span className="text-#9B9B9C text-3 mr-4">({{ item.fileCharsNumber }} chars)</span>
              <img
                className="w-30px h-30px cursor-pointer"
                src="@/assets/img/icon_delete.png"
                @click="clickDelete(item.fileId)"
              />
            </div>
          </li>
        </ul>
      </template>
    </div>

    <a-modal
      v-model:open="contentModelVisible"
      :title="modalTitle"
      wrapClassName="siteModel"
      :width="modalWidth"
      centered
      :footer="null"
    >
      <div
        className="whitespace-break-spaces w-full max-h-[calc(100vh-200px)] overflow-y-auto flex flex-col mt-5 flex-items-center"
      >
        {{ modalContent }}
      </div>
    </a-modal>
  </div>
  );
}
