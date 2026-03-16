"use client"

import { motion } from "framer-motion"

export default function SunMoon(){

  const hour = new Date().getHours()
  const isDay = hour >= 6 && hour < 18

  return(

  <div style={{
    position:"absolute",
    top:"40px",
    right:"40px",
    fontSize:"50px"
  }}>

  {isDay ? (

    <motion.div
    initial={{y:80, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration:1}}
    >
    ☀️
    </motion.div>

  ):(

    <motion.div
    initial={{y:80, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration:1}}
    >
    🌙
    </motion.div>

  )}

  </div>

  )
}