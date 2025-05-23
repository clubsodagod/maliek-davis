/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 macbook.gltf -t -T -k -K s 
Files: macbook.gltf [40.86KB] > C:\Users\owner\Desktop\maliek_davis\public\3d-objects\macbook\macbook-transformed.glb [257.21KB] (-529%)
Author: timblewee (https://sketchfab.com/timblewee)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/macbook-pro-13-inch-2020-efab224280fd4c3993c808107f7c0b38
Title: Macbook Pro 13 inch 2020
*/

import * as THREE from 'three'
import React, { JSX, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useLoader } from '@react-three/fiber'
import { programmerImg } from '@/library/image.cdn'

type ActionName = 'Animation'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_12: THREE.Mesh
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_14: THREE.Mesh
    Object_16: THREE.Mesh
    Object_21: THREE.Mesh
    Object_27: THREE.Mesh
  }
  materials: {
    PaletteMaterial003: THREE.MeshStandardMaterial
    PaletteMaterial001: THREE.MeshStandardMaterial
    PaletteMaterial002: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    PaletteMaterial004: THREE.MeshStandardMaterial
    ['Touch_Bar_Shot_2021-04-02_at_18.13.28']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

// Define the MacBookThreeProps type
interface MacBookThreeProps {
  link?: string;
  props?: JSX.IntrinsicElements['group'];
}

export default function MacBook({ link, props }: MacBookThreeProps) {

  const group = React.useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/3d-objects/macbook/macbook-transformed.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)
  const [currentInView, setCurrentInView] = useState(null);
  const [startAnimation, setStartAnimation] = useState<boolean>(true);


  const [image, setImage] = useState<string>(link || programmerImg)
  const tempTexture = useLoader(THREE.TextureLoader, image)
  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null)


  useFrame(() => {

    if (actions.Animation) {
      actions.Animation.play()

    }
  });



  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    const url = link || programmerImg
    textureLoader.load(url, (loadedTexture) => {
      loadedTexture.center.set(0.5, 0.5)
      loadedTexture.rotation = Math.PI * 2
      loadedTexture.flipY = false
      loadedTexture.needsUpdate = true

      setImageTexture(loadedTexture)
    })
  }, [link])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
            <group name="Empty_1" position={[0, 0.001, 0]} rotation={[-Math.PI, 0, 0]} scale={[-0.039, 0.039, 0.039]}>
              <group name="Camera_Light_0" position={[0, 0.077, -0.044]} rotation={[-1.192, 0, 0]} scale={[-25.381, 25.381, 25.381]}>
                <mesh castShadow name="Object_12" geometry={nodes.Object_12.geometry} material={materials.PaletteMaterial003} />
              </group>
            </group>
            <mesh castShadow name="Object_4" geometry={nodes.Object_4.geometry} material={materials.PaletteMaterial001} />
            <mesh castShadow name="Object_6" geometry={nodes.Object_6.geometry} material={materials.PaletteMaterial002} />
            <mesh castShadow name="Object_7" geometry={nodes.Object_7.geometry}  >

              {/* Apply the texture to the material */}
              <mesh castShadow name="Object_7" geometry={nodes.Object_7.geometry}>
                {imageTexture && <meshStandardMaterial map={imageTexture} />}
              </mesh>
            </mesh>
          </group>
          <group name="Circle001_12" position={[0.203, 0.008, -0.104]} rotation={[0.011, -0.75, 1.274]} />
        </group>
        <mesh castShadow name="Object_14" geometry={nodes.Object_14.geometry} material={materials.PaletteMaterial003} position={[0, -0.014, 0]} scale={0.275} />
        <mesh castShadow name="Object_16" geometry={nodes.Object_16.geometry} material={materials.PaletteMaterial001} position={[0, 0.008, -0.104]} rotation={[1.949, 0, 0]} scale={0.275} />
        <mesh castShadow name="Object_21" geometry={nodes.Object_21.geometry} material={materials.PaletteMaterial004} position={[0, -0.014, 0]} scale={0.275} />
        <mesh castShadow name="Object_27" geometry={nodes.Object_27.geometry} material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']} position={[0, -0.014, 0]} scale={0.275} />
      </group>
    </group>
  )
}

useGLTF.preload('/3d-objects/macbook/macbook-transformed.glb')

