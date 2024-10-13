import gsap from "gsap"
import ModelView from "./ModelView"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"
import { yellowImg } from "../utils"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models, sizes } from "../constants"
import { animateWithGsapTimeline } from "../utils/animations"

const Model = () => {
  const [size, setSize] = useState("small")
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8f8a81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  })
  const [activeColor,  setActiveColor] = useState('')

  // camera controll for model view
  const cameraControlSmall = useRef()
  const cameraControlLarge = useRef()

  // model
  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())
  // rotation
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  const tl = gsap.timeline()

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size === 'small') {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to("#heading", {
      x: 0,
      y: 0,
      opacity: 1,
    })
  }, [])
  return (
    <section>
      <div className="screen-max-width">
       
        <div className="flex flex-col items-center">
          <div className="w-full h-[80vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full "
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}
              eventSource={document.getElementById("root")}
            >
                <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-semibold text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, idx) => (
                  <li
                    key={idx}
                    className={`w-4 h-4 rounded-full mx-2 !cursor-pointer ${ activeColor === item.color[0] ? `outline outline-offset-2` : '' }`}
                    style={{ backgroundColor: item.color[0], outlineColor: item.color[0] }}
                    onClick={() => {
                      setModel(item)
                      setActiveColor(item.color[0])
                    }}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model