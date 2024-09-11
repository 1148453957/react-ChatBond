import { useState } from 'react'
import HomeHeader from '@/components/HomeHeader'

import {  ConfigProvider } from 'antd';
function App() {

console.log(111111,HomeHeader);

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#0AC655",
      },
    }}
  >
    <div id="app">
      {/* 这里是额外传参的，不然用useSession不刷新，不知道为啥 */}

      <HomeHeader  />
     
    </div>
  </ConfigProvider>
  )
}

export default App
