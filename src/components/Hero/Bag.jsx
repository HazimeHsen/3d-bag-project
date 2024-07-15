import { useRef, useEffect, Suspense } from "react";
import { Canvas, useLoader, useFrame, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import {
  ShadowMaterial,
  PlaneGeometry,
  MeshStandardMaterial,
  Color,
} from "three";
import ColorSwitcher from "./ColorSwitchers";

extend({ ShadowMaterial, PlaneGeometry, MeshStandardMaterial, Color });

const Modal = ({ activeData }) => {
  const fileUrl = "/marc_jacobs_woven_tote_bag/scene.gltf";
  const gltf = useLoader(GLTFLoader, fileUrl);
  const meshRef = useRef(null);
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;
  useEffect(() => {
    if (gltf && gltf.scene) {
      let i = 0;
      gltf.scene.traverse((child) => {
        if (i === 5 || i === 8 || i === 9) {
          child.material = new MeshStandardMaterial({
            color: new Color(activeData.itemList.bag.color),
          });
        }
        if (i === 3 || i === 6) {
          child.material = new MeshStandardMaterial({
            color: new Color(activeData.itemList.strap.color),
          });
        }
        if (i === 7) {
          child.material = new MeshStandardMaterial({
            color: new Color(activeData.headingColor),
          });
        }
        i++;
      });
    }
  }, [gltf, activeData]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={gltf.scene} ref={meshRef} />;
};

const Bag = ({ activeData, swatchData, handleSwatchClick, condition }) => {
  const color = activeData.itemList.bag.color;
  const textColor = activeData.headingColor;
  return (
    <div className="w-full relative">
      <div
        style={{ backgroundColor: color }}
        className={`w-[300px] h-1/2 absolute top-0 z-0 transition-colors duration-200 ease-in-out rounded-br-full rounded-bl-full left-[50%] -translate-x-1/2`}></div>
      <Canvas className="bag" shadows>
        <Suspense fallback={<Loader textColor={textColor} />}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Modal activeData={activeData} />
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      <ColorSwitcher
        activeData={activeData}
        swatchData={swatchData}
        condition={condition}
        handleSwatchClick={handleSwatchClick}
      />
    </div>
  );
};

const Loader = ({ textColor }) => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: textColor }} className="font-semibold text-xl">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

export default Bag;
