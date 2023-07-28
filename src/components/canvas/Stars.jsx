import { useState, useRef, Suspense } from "react"; // 匯入React hooks
import { Canvas, useFrame } from "@react-three/fiber"; // 匯入Three.js的Canvas和useFrame元件
import { Points, PointMaterial, Preload } from "@react-three/drei"; // 匯入Three.js的Points、PointMaterial和Preload元件
import * as random from "maath/random/dist/maath-random.esm"; // 匯入隨機數生成函式庫

const Stars = (props) => {
  const ref = useRef(); // 創建一個參考物件
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 })); // 使用useState hook創建一個sphere變數，其值為由maath/random庫產生的一個浮點數陣列

  useFrame((state, delta) => { // 使用useFrame hook設定星空的旋轉動畫
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}> {/* 創建一個group元件，設定其旋轉角度*/}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}> {/* 創建一個Points元件，將sphere作為其positions屬性的值傳遞*/}
        <PointMaterial // 創建一個PointMaterial元件，設定其透明、顏色、大小和深度寫入屬性的值
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'> {/* 使用CSS設定div元素的樣式*/} 
      <Canvas camera={{ position: [0, 0, 1] }}>{/* 創建一個Canvas元件，設定其攝影機的位置*/} 
        <Suspense fallback={null}> {/* 創建一個Suspense元件，設定其fallback屬性為null*/} 
          <Stars /> {/* 呼叫剛剛建立的Stars元件*/}
        </Suspense>

        <Preload all /> {/* 創建一個Preload元件，設定其all屬性為true*/} 
      </Canvas>
    </div>
  );
};

export default StarsCanvas; // 匯出StarsCanvas元件供其他模組使用