export default function Clouds(){

  return(

  <div style={{
    position:"absolute",
    top:0,
    left:0,
    width:"100%",
    height:"200px",
    background:"url('https://i.imgur.com/c7q3B9B.png') repeat-x",
    animation:"cloudmove 60s linear infinite",
    opacity:0.4
  }} />

  )
}