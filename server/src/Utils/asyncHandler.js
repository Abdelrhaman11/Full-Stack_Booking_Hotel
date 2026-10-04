

export const asyncHandler = (controller)=>{
    return(req,res,next)=>{
        controller(req,res,next).catch((error)=>{
            return next(new Error(error,{cause:500}))
        }) 
    }
}


export const globleErrorHandling = (error,req,res,next) => {
return res.status(error.cause || 500).json({succes : false ,message:error.message,stack:error.stack});
}