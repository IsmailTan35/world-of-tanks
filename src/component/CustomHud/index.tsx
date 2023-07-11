import React, { memo, useEffect, useRef, useState } from "react";
import {
  Edges,
  Environment,
  Hud,
  OrthographicCamera,
  Text,
} from "@react-three/drei";
import { useAppSelector } from "@/store";

const CustomHud = () => {
  const [myPosition, setMyPosition] = useState<any>([0, 0, 0]);
  const position = useAppSelector(state => state.tanksPosition.player);
  const trees = useAppSelector(state => state.tanksPosition.trees);
  const rocks = useAppSelector(state => state.tanksPosition.rocks);
  const remotePlayers = useAppSelector(
    state => state.tanksPosition.remotePlayers
  );

  useEffect(() => {
    const divede = 200;
    if (position) {
      setMyPosition([
        position[0] / divede,
        position[1] / divede,
        position[2] / divede,
      ]);
    }
  }, [position]);

  return (
    <>
      <Hud>
        <OrthographicCamera makeDefault position={[0, 0, 2]} zoom={75} />
        <Environment preset="forest" />
        <mesh position={[-5, -4.5, 0]}>
          <boxGeometry args={[3.1, 1.1, 0.2]} />
          <meshBasicMaterial color="black" />
          <mesh position={[-1, 0, 0]}>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshBasicMaterial color="red" />
            <Edges color={"black"} />
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              1
            </Text>
          </mesh>
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshBasicMaterial color="red" />
            <Edges color={"black"} />
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              2
            </Text>
          </mesh>
          <mesh position={[1, 0, 0]}>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshBasicMaterial color="red" />
            <Edges color={"black"} />
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              3
            </Text>
          </mesh>
        </mesh>
        <mesh position={[5.5, 3, 0]}>
          <boxGeometry args={[2.5, 2.5, 0.1]} />
          <meshBasicMaterial color="green" />
          <Edges color={"black"} />
          {myPosition && (
            <mesh
              position={[myPosition[0], myPosition[2], 1]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <Edges color={"white"} />
              <cylinderGeometry args={[0.05, 0.05, 1, 30]} />
              <meshBasicMaterial color={0x0000ff} />
            </mesh>
          )}
          {remotePlayers.map((player: any, idx: any) => {
            return (
              <mesh
                key={idx}
                position={[player.position[0], player.position[2], 1]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <Edges color={"white"} />
                <cylinderGeometry args={[0.05, 0.05, 1, 30]} />
                <meshBasicMaterial color={0xff0000} />
              </mesh>
            );
          })}
          {trees.length === 500 && (
            <FixedObje {...{ objects: trees, color: "darkgreen" }} />
          )}
          {rocks.length === 100 && (
            <FixedObje {...{ objects: rocks, color: "gray" }} />
          )}
        </mesh>
      </Hud>
    </>
  );
};

const FixedObje = memo((props: any) => {
  const { objects, color } = props;
  return (
    <>
      {objects.map((tree: any, idx: any) => {
        if (!tree) return null;
        return (
          <mesh
            key={idx}
            position={[tree[0], tree[2], 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <Edges color={"white"} />
            <cylinderGeometry args={[0.05, 0.05, 1, 30]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </>
  );
});
FixedObje.displayName = "FixedObje";

export default memo(CustomHud);
