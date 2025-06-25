const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1]
    console.log('token receive',token)
    console.log('secret token',process.env.JWT_SECRET)
    if(!token){
        return res.status(403).json({success:false,message:"Invalid token"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(403).json({success:false,message:"Invalid access token"})
    }
    req.user=decoded;
    next();
}


module.exports=verifyToken;