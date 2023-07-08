import React, { use, useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const disabledCollide = [
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
  "ground",
  "cannon",
];
function Rock(props: any) {
  const { position } = props;
  const { scene } = useThree();
  const args: any = [11.5, 5, 5];
  const [isCollided, setIsCollided] = useState(false);
  const [stoneRef, stoneApi]: any = useBox(() => ({
    type: "Static",
    args,
    mass: 1500,
    position,
    onCollide: (e: any) => {
      if (!e.body?.name || disabledCollide.includes(e.body.name) || isCollided)
        return;
      setIsCollided(prv => {
        if (prv) return prv;
        scene.remove(stoneRef.current);
        stoneApi.collisionResponse.set(false);
        return prv;
      });
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsCollided(true);
    }, 2500);
  }, [stoneRef]);
  return (
    <>
      <mesh
        position={position}
        ref={stoneRef}
        castShadow
        receiveShadow
        name="rock"
      >
        <mesh position={[3, 0, 0]} castShadow>
          <Sphere args={[3, 15, 15, 15, 15, 0, 15]}>
            <meshStandardMaterial color={0x9999999} />
          </Sphere>
        </mesh>
        <mesh castShadow>
          <Sphere args={[3, 15, 15, 15, 15, 0, 15]}>
            <meshStandardMaterial color={0x9999999} />
          </Sphere>
        </mesh>
        <mesh position={[-3, 0, 0]} castShadow>
          <Sphere args={[3, 15, 15, 15, 15, 0, 15]}>
            <meshStandardMaterial color={0x9999999} />
          </Sphere>
        </mesh>
      </mesh>
      <color attach="background" args={["lightblue"]} />
    </>
  );
}

export default Rock;