import { Suspense, LazyExoticComponent } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <Suspense
      fallback={
     /*    <div className="w-full h-[calc(100%-64px)] bg-[#fff]    fcc flex-col">
          <Spin
            className="!mt--16 h-16"
            indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
          />
          <p className="text-4 ">Loading...</p>
        </div> */
        <></>
      }
    >
      <props.lazyChildren />
    </Suspense>
  );
};
export default LazyImportComponent;
