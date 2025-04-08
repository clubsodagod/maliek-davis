"use client"

import * as THREE from 'three'
import React, { JSX, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { programmerImg } from '@/library/image.cdn'

type GLTFResult = GLTF & {
  nodes: {
    iPad_Pro_2020_Body_0: THREE.Mesh
    iPad_Pro_2020_screen_0: THREE.Mesh
    camera_module_glass_0: THREE.Mesh
    ['camera1_camera1(2)_0']: THREE.Mesh
    camera_module2001_Camera_Flash_0: THREE.Mesh
    camera_module2001_Mic_0: THREE.Mesh
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
    screen: THREE.MeshStandardMaterial
    PaletteMaterial002: THREE.MeshStandardMaterial
    camera12: THREE.MeshStandardMaterial
    Camera_Flash: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
  }
}

interface IpadProProps {
  link?: string;
  props?: JSX.IntrinsicElements['group'];
}

export default function IpadPro({ link, props }: IpadProProps) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/3d-objects/iPad-Pro/IPadPro-transformed.glb') as unknown as GLTFResult

  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    const url = link || programmerImg

    textureLoader.load(url, (loadedTexture) => {
      loadedTexture.flipY = true
      loadedTexture.center.set(0.5, 0.5)
      loadedTexture.rotation = Math.PI * 2
      loadedTexture.needsUpdate = true

      setImageTexture(loadedTexture)
    })
  }, [link])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <mesh
          name="iPad_Pro_2020_Body_0"
          geometry={nodes.iPad_Pro_2020_Body_0.geometry}
          material={materials.PaletteMaterial001}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name="iPad_Pro_2020_screen_0"
          geometry={nodes.iPad_Pro_2020_screen_0.geometry}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          {imageTexture && <meshStandardMaterial map={imageTexture} />}
        </mesh>
        <mesh
          name="camera_module_glass_0"
          geometry={nodes.camera_module_glass_0.geometry}
          material={materials.PaletteMaterial002}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name="camera1_camera1(2)_0"
          geometry={nodes['camera1_camera1(2)_0'].geometry}
          material={materials.camera12}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name="camera_module2001_Camera_Flash_0"
          geometry={nodes.camera_module2001_Camera_Flash_0.geometry}
          material={materials.Camera_Flash}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          name="camera_module2001_Mic_0"
          geometry={nodes.camera_module2001_Mic_0.geometry}
          material={materials.material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/3d-objects/iPad-Pro/IPadPro-transformed.glb')
