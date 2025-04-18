"use client"

import * as THREE from 'three'
import React, { useRef, useMemo, JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { programmerImg } from '@/library/image.cdn'

type GLTFResult = GLTF & {
  nodes: {
    Circle010_black002_0: THREE.Mesh
    Cube014_metalframe002_0: THREE.Mesh
    Cube014_glass002_0: THREE.Mesh
    Cube014_screen001_0: THREE.Mesh
    Cylinder021_Material_0: THREE.Mesh
    Sphere010_lensinglass_0: THREE.Mesh
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
    ['metalframe.002']: THREE.MeshStandardMaterial
    PaletteMaterial002: THREE.MeshPhysicalMaterial
    ['screen.001']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    PaletteMaterial003: THREE.MeshStandardMaterial
  }
}

interface IPhoneProMaxProps {
  link?: string;
  props?: JSX.IntrinsicElements['group'];
}

export default function IPhoneProMax({ link, props }: IPhoneProMaxProps) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/3d-objects/iPhone-pro-max/IPhoneProMax-transformed.glb') as unknown as GLTFResult

  // useMemo ensures texture updates when `link` changes
  const imageTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(link || programmerImg)

    texture.flipY = false
    texture.center.set(0.5, 0.5)
    texture.rotation = Math.PI
    texture.needsUpdate = true

    return texture
  }, [link])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <mesh name="Circle010_black002_0" geometry={nodes.Circle010_black002_0.geometry} material={materials.PaletteMaterial001} position={[0.079, 0.619, 0.068]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={0.038} />
        <mesh name="Cube014_metalframe002_0" geometry={nodes.Cube014_metalframe002_0.geometry} material={materials['metalframe.002']} position={[-0.003, 0.023, 0.002]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Cube014_glass002_0" geometry={nodes.Cube014_glass002_0.geometry} material={materials.PaletteMaterial002} position={[-0.003, 0.023, 0.002]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Cube014_screen001_0" geometry={nodes.Cube014_screen001_0.geometry} position={[-0.003, 0.023, 0.002]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial map={imageTexture} />
        </mesh>
        <mesh name="Cylinder021_Material_0" geometry={nodes.Cylinder021_Material_0.geometry} material={materials.Material} position={[0.023, 0.759, 0.068]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="Sphere010_lensinglass_0" geometry={nodes.Sphere010_lensinglass_0.geometry} material={materials.PaletteMaterial003} position={[0.073, 0.719, 0.254]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.006, 0.013, 0.013]} />
      </group>
    </group>
  )
}

useGLTF.preload('/3d-objects/iPhone-pro-max/IPhoneProMax-transformed.glb')
