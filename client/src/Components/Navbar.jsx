import React from 'react'

function Navbar() {
  return (
    <div className='' style={{height:'137px',backgroundColor:'#ED5353',width:'100vw',borderRadius:'0px 0px 62px 55px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{display:'flex',justifyContent:'space-between',flex:0.9}}>
            <span style={{fontWeight:700,fontSize:30,color:'white'}}>Jobfinder</span>
            <div>
                <button style={{width:'113px',height:'46px',border:'2px solid white',borderRadius:'7px',color:'white',backgroundColor:"transparent",cursor:'pointer'}}>Login</button>
                <button style={{width:'113px',height:'46px',border:'2px solid white',borderRadius:'7px',backgroundColor:'white',color:"#ED5353",marginLeft:10,cursor:'pointer'}}>Register</button>

            </div>
        </div>
    </div>
  )
}

export default Navbar