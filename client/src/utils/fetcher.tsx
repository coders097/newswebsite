import { NewsState } from "../App"

let fetchData=(data:{
    dataCache:Map<string, NewsState[]> | undefined,
    setDataCache:React.Dispatch<React.SetStateAction<Map<string, NewsState[]>>> | undefined
    searchWords:string[],
    token:string | null | undefined,
})=>{
    if(data.token){
        let options={
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                token:data.token
            })
        };
        data.searchWords=data.searchWords.filter(dat=>!data.dataCache?.has(dat));
        Promise.all(data.searchWords.map(word=>fetch(`http://localhost:3001/fetch/${word}`,options)))
        .then(results => Promise.all(results.map(r => r.json())))
        .then(datas=>{
            // console.log("here");
            datas.forEach((e,i)=>{
                data.dataCache?.set(data.searchWords[i],e.articles);
            });
            if(data.setDataCache && data.dataCache)
                data.setDataCache(new Map<string,NewsState[]>(data.dataCache));
            // console.log(data.dataCache);
        })
        .catch(errs=>console.log(errs))
    }
}

let fetchToken=(data:{
    token?:string | null,
    setToken?:React.Dispatch<React.SetStateAction<string | null>>
})=>{
    if(data.token!=null) return;
    fetch("http://localhost:3001/fetch/token").then(res=>res.json()).then(_data=>{
        if(data.setToken) data.setToken(_data.data);
        // console.log(_data.data)
    }).catch(err=>console.log(err));
}

export default {
    fetchData,
    fetchToken
}