import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useThree } from "@react-three/fiber";

import {
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Dog = () => {

  const model = useGLTF("/models/dog.drc.glb");

  const dogModel = useRef(null);

  /* --------------------------------
     THREE CONFIG
  -------------------------------- */

  useThree(({ camera, gl }) => {

    camera.position.set(0, 0, 0.8);

    gl.toneMapping = THREE.ReinhardToneMapping;

    gl.outputColorSpace = THREE.SRGBColorSpace;

  });

  /* --------------------------------
     TEXTURES
  -------------------------------- */

  const [normalMap, sampleMatCap] = useTexture([
    "/models/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]);

  normalMap.flipY = false;
  sampleMatCap.flipY = false;

  normalMap.colorSpace = THREE.SRGBColorSpace;
  sampleMatCap.colorSpace = THREE.SRGBColorSpace;

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpg",
    "/branches_normals.jpg",
  ]);

  branchMap.colorSpace = THREE.SRGBColorSpace;
  branchNormalMap.colorSpace = THREE.SRGBColorSpace;

  /* --------------------------------
     MATERIALS
  -------------------------------- */

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    matcap: branchMap,
  });

  /* --------------------------------
     ANIMATION
  -------------------------------- */

  const { actions } = useAnimations(
    model.animations,
    model.scene
  );

  /* --------------------------------
     APPLY MATERIAL
  -------------------------------- */

  useEffect(() => {

    model.scene.traverse((child) => {

      if (!child.isMesh) return;

      if (child.name.includes("DOG")) {
        child.material = dogMaterial;
      } else {
        child.material = branchMaterial;
      }

    });

  }, [
    model,
    dogMaterial,
    branchMaterial,
  ]);

  /* --------------------------------
     DOG ANIMATION
  -------------------------------- */

  useEffect(() => {

    const animation =
      actions?.["Take 001"];

    if (animation) {
      animation.reset().fadeIn(0.5).play();
    }

    return () => {
      animation?.fadeOut(0.5);
    };

  }, [actions]);

  /* --------------------------------
     LENIS
  -------------------------------- */

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    const update = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", update);

    let rafId;

    const raf = (time) => {

      lenis.raf(time);

      rafId = requestAnimationFrame(raf);

    };

    rafId = requestAnimationFrame(raf);

    return () => {

      cancelAnimationFrame(rafId);

      lenis.destroy();

    };

  }, []);

  /* --------------------------------
     DOG SCROLL ANIMATION
  -------------------------------- */

  useGSAP(
    () => {

      if (!dogModel.current) return;

      const scene = dogModel.current.scene;

      const introTimeline = gsap.timeline();

      introTimeline.fromTo(
        scene.position,
        {
          z: -0.2,
        },
        {
          z: 0.3,
          duration: 1.5,
          ease: "power3.out",
        }
      );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-2",
          start: "top bottom",
          endTrigger: ".section-3",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scrollTimeline
        .to(scene.position, {
          z: "-=0.75",
          y: "+=0.1",
        })
        .to(
          scene.rotation,
          {
            x: `+=${Math.PI / 10}`,
          },
          "<"
        )
        .to(
          scene.rotation,
          {
            y: `-=${Math.PI}`,
          },
          "<"
        )
        .to(
          scene.position,
          {
            x: "-=0.7",
            y: "-=0.1",
            z: "+=0.4",
          },
          "<"
        );

      return () => {

        scrollTimeline.scrollTrigger?.kill();

        scrollTimeline.kill();

      };

    },
    {
      dependencies: [model],
    }
  );

  /* --------------------------------
     MOBILE SCALE
  -------------------------------- */

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth <= 768;

  return (
    <>

      <primitive
        ref={dogModel}
        object={model.scene}
        scale={isMobile ? 0.6 : 1}
        position={[0.28, -0.5, 0]}
        rotation={[0, Math.PI / 5.7, 0]}
      />

      <directionalLight
        position={[0, 5, 5]}
        intensity={10}
      />

      <ambientLight intensity={0.3} />

    </>
  );
};

useGLTF.preload("/models/dog.drc.glb");

export default Dog;