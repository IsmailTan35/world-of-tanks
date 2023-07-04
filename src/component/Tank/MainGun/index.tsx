import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import Weaponry from "@/component/Weaponry";
import SmokeParticles from "@/component/SmokeParticles";
const MainGun = () => {
  const meshRef = useRef<any>();
  const mainGunRef = useRef<any>();
  const connectionPointRef = useRef<any>();

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    if (!connectionPointRef) return;
    connectionPointRef.current.rotation.x = 1.55;
  }, [connectionPointRef]);

  const [degreX, setDegreX] = useState(180);
  const [degreY, setDegreY] = useState(110);
  const handleMouseMove = (event: any) => {
    setDegreX(prv => prv - event.movementX * 0.2);
    setDegreY(prv => {
      const fixedData = prv - event.movementY * 2;
      const result = fixedData > 120 ? 120 : fixedData < 80 ? 80 : fixedData;
      return result;
    });
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(state => {
    if (!meshRef.current) return;
    var target = new Vector3();
    mainGunRef.current.getWorldPosition(target);
    var cameraDistance = 20;
    state.camera.position.set(0, 5, -cameraDistance);
    var angle = MathUtils.degToRad(degreX);
    state.camera.position.applyAxisAngle(new Vector3(0, 1, 0), angle);
    state.camera.lookAt(target.x, target.y, target.z);
    var angleY = MathUtils.degToRad(degreY);
    meshRef.current.rotation.z = angleY;
  });

  return (
    <>
      <mesh position={[1.6, 0, 0]} ref={mainGunRef}>
        <mesh ref={connectionPointRef} position={[-0.8, 0, 0]}>
          <Cylinder args={[0.3, 0.3, 0.5, 60]}>
            <Edges color="black" />
            <meshStandardMaterial color={0x637f0e} />
          </Cylinder>
        </mesh>
        <mesh ref={meshRef}>
          <mesh>
            <Cylinder args={[0.1, 0.1, 4.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x637f0e} />
            </Cylinder>
          </mesh>
          <mesh position={[0, -2, 0]} ref={meshRef} name="barrel">
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x3e3f44} />
            </Cylinder>
          </mesh>
          <mesh
            position={[0, -5, 0]}
            ref={meshRef}
            name={"vectorial-barrel"}
          ></mesh>
          <Weaponry
            connonAmmo={1}
            {...{
              degreY,
              degreX,
            }}
          />
        </mesh>
      </mesh>
    </>
  );
};

export default MainGun;
