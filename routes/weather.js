const router=require('express').Router();
const fetch=require('node-fetch');


router.get("/",(req,res)=>{
    let {lat,lon}=req.query;
    if(!lat || !lon){
        res.status(404).json({
            error:"not found"
        });
        return;
    }
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de85450009352912b0f20f1a45e44b0e`)
        .then(res=>res.json())
        .then(data=>res.status(200).json(data))
        .catch(err=>res.json({
            error:"not found"
        }));
});


module.exports=router;