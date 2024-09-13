import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/assets/lottie/btn.json"; // Lottie动画数据

const LottieAnimation = () => {
  const animationContainer = useRef(null);
  useEffect(() => {
    // 当组件挂载后，在animationContainer上播放Lottie动画
    const animation = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
    return () => {
      // 当组件卸载时，停止动画播放
      animation.destroy();
    };
  }, []);

  return <div ref={animationContainer} style={{ width: "350px" }} />;
};

export default LottieAnimation;
