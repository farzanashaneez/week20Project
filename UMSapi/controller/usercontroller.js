const getuser=(req,res)=>{
    res.json({
        message:"api working"
    })
}
const postuser=(req,res)=>{
    console.log("post is working",req.body)
}
export {getuser,postuser}