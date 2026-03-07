import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Earth(){

return(

mesh>
<sphereGeometry args={[2,32,32]} />
<meshStandardMaterial color="blue" />
</mesh>

)

}

export default function Globe3D(){

return(

Canvas style={{height:300}}>

ambientLight intensity={0.5} />

pointLight position={[10,10,10]} />

Earth/>

OrbitControls/>

</Canvas>

)

}