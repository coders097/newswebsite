const router=require('express').Router();
const fs=require('fs');
const path=require('path');
const fetch=require('node-fetch');

const NEWSAPI=process.env.NEWSAPI;


let fashion=JSON.parse(fs.readFileSync(path.join(__dirname,"../tempData/fashion.txt"),{encoding:"utf-8"}));

let accessTokens=new Map();
let genKey=()=>{
    return [...Array(30)].map(e=>((Math.random() * 36) | 0).toString(36)).join("");
}
let createToken=()=>{
    let token=genKey();
    accessTokens.set(token,true);
    setTimeout(()=>{
        accessTokens.delete(token);        
    },1000*60*120);
    return token;
}

router.get("/token",(req,res)=>{
    let token=createToken();
    res.status(200).json({
        success:true,
        data:token
    });
});

let cacheBox={};
let getResults=async (key)=>{
    if(cacheBox[key]){
        console.log("Loading from Cache!");
        return cacheBox[key];
    }
    let today=new Date();
    let yesterday=new Date(today);

    yesterday.setDate(yesterday.getDate()-1);

    let datStr="";
    datStr+=yesterday.getFullYear()+"-";
    datStr+=(yesterday.getMonth()+1)+"-";
    datStr+=(yesterday.getDate());
    let data=(key==='headlines')?(await (await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWSAPI}`)).json())
    :(await (await fetch(`https://newsapi.org/v2/everything?q=${key}&from=${datStr}&sortBy=popularity&apiKey=${NEWSAPI}&pageSize=100`)).json());
    if(data.status==='ok'){
        cacheBox[key]=data;
        setTimeout(()=>{
            cacheBox[key]=null;
        },1000*60*60*6);
        return data;
    }else return fashion;
}

router.post("/:type/",async (req,res)=>{

    let {token}=req.body;

    if(!token){
        res.status(401).json({
            success:false,
            error:"TOKEN NOT PRESENT"
        });
        return;
    }

    if(!accessTokens.has(token)){
        res.status(404).json({
            success:false,
            error:"TOKEN EXPIRED OR INVALID!"
        });
        return;
    }

    let _temp=await getResults(req.params.type);
    res.status(200).json(_temp);
});



module.exports=router;