import Lottie from "lottie-react"
import { preloaderData } from "../utils"

const Loader = () => {
  return (
    <div className="h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2">
      <Lottie animationData={preloaderData} loop={true} as="preloader" />
    </div>
  )
}

export default Loader
