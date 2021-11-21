import React, { createRef, useContext, useEffect, useState } from 'react';
import '../styles/NewsView.scss';
import Profile from '../assets/profile.jpg';
import Pic from '../assets/pic.jpg';
import Search from '../assets/search.png';
import { useHistory, useLocation } from 'react-router';
import { NEWSCONTEXT, NewsState } from '../App';
import FetchManager from '../utils/fetcher';

const NewsView = () => {

    let newsContext=useContext(NEWSCONTEXT);
    let input=createRef<HTMLInputElement>();
    let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let getDate=(stringVal:string | null)=>{
        if(!stringVal) return "";
        let date=new Date(stringVal);
        let stringRes="";
        stringRes+=months[date.getMonth()]+" ";
        stringRes+=date.getDate()+", ";
        stringRes+=date.getFullYear();

        return stringRes;
    }
    let location=useLocation();
    let history=useHistory();
    let [data,setData]=useState<{
        data:NewsState
        dataSet:string,
        index:number
    } | null>(null);

    useEffect(()=>{
        if(location.state){
            setData(location.state as {
                data:NewsState
                dataSet:string, 
                index:number
            });
        }else history.push("/");
        window.scrollTo(0,0);
    },[location.state]);

    useEffect(()=>{

        if(newsContext?.token){
            FetchManager.fetchData({
                dataCache:newsContext?.dataCache,
                searchWords:["headlines","sports"],
                setDataCache:newsContext?.setDataCache,
                token:newsContext?.token
            });
        }else{
            FetchManager.fetchToken({
                setToken:newsContext?.setToken,
                token:newsContext?.token
            })
        }
    },[newsContext?.token]);

    let properIndex=(ind:number,dataSet:string)=>{
        if(ind<0) return newsContext!.dataCache.get(dataSet)!.length-1;
        return ind%newsContext!.dataCache.get(dataSet)!.length;
    }

    return (
        <>
            <div className="NewsView-header">
                <h1>{data && data?.data.title}</h1>
                <p>{data && data?.data.description}</p>
                <div className="user">
                    <img alt="profile" src={`https://randomuser.me/api/portraits/${Math.random()>0.5?"women":"men"}/${parseInt(Math.random()*50+"")}.jpg`}/>
                    <div>
                        <p>Published on {getDate(data && data.data.publishedAt)}</p>
                        <p>By <span>{data && data?.data.source.name}</span></p>
                    </div>
                </div>
            </div>
            <section className="NewsView">
                <div className="body">
                    <div className="content">
                        <img alt="news-pic" src={data?data?.data.urlToImage as string:""}/>
                        <p>
                            {data && data?.data.content} molestiae esse eius! Deserunt repellat fuga nesciunt animi 
                            quisquam cum molestiae at error dolorum, neque nemo amet provident ex vitae alias ad ratione dolor voluptates 
                            optio. Modi facilis praesentium placeat eligendi cumque. Quam quaerat delectus mollitia iste cumque, ratione 
                            incidunt quidem nesciunt dolore veniam natus sed esse eius! Deserunt repellat fuga nesciunt animi 
                            quisquam cum molestiae at error dolorum, neque nemo amet provident ex vitae alias ad ratione dolor voluptates 
                            optio. Modi facilis praesentium placeat eligendi cumque. Quam quaerat delectus mollitia iste cumque, ratione 
                            incidunt quidem nesciunt dolore veniam natus sed.
                        </p>
                        <img alt="ad" src={Pic} className="advertisement"/>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti reprehenderit porro consequuntur? 
                            Placeat architecto autem reiciendis fuga dicta natus? Similique, nesciunt! Aspernatur inventore, ratione 
                            consequatur voluptas corrupti reprehenderit doloribus nulla eum provident unde repellat similique, 
                            alias autem excepturi, deleniti ad molestias adipisci! Temporibus facere voluptate, corrupti voluptates 
                            quas numquam soluta vitae eaque commodi delectus.
                        </p>
                        {data && data.dataSet && newsContext?.dataCache.has(data.dataSet)?<>
                            <div className="pagination">
                                <div className="item">
                                    <h2>PREV ARTICLE</h2>
                                    <p onClick={()=>history.push("/news",{
                                                dataSet:data?.dataSet,
                                                index:properIndex(data!.index-1,data!.dataSet),
                                                data:(newsContext?.dataCache.get(data?.dataSet!))![properIndex(data!.index-1,data!.dataSet)]
                                            })}>{newsContext.dataCache.get(data.dataSet)![properIndex(data.index-1,data.dataSet)].title}</p>
                                </div>
                                <div className="item">
                                    <h2>NEXT ARTICLE</h2>
                                    <p onClick={()=>history.push("/news",{
                                                dataSet:data?.dataSet,
                                                index:properIndex(data!.index+1,data!.dataSet),
                                                data:(newsContext?.dataCache.get(data?.dataSet!))![properIndex(data!.index+1,data!.dataSet)]
                                            })}>{newsContext.dataCache.get(data.dataSet)![properIndex(data.index+1,data.dataSet)].title}</p>
                                </div>
                            </div>
                        </>:null}
                        <div className="title-style-container">
                            <h2>MORE NEWS</h2>
                            <ul className="display">
                                <li>
                                    {newsContext?.dataCache.has("headlines")?
                                    <>
                                        {newsContext?.dataCache.get("headlines")!.slice(12,15).map((e,i)=>{
                                            return <div className="horizontal-news-card">
                                                <img alt="news pic" src={e.urlToImage as string}/>
                                                <div onClick={()=>history.push("/news",{
                                                    dataSet:"headlines",
                                                    index:i+12,
                                                    data:(newsContext?.dataCache.get("headlines"))![i+12]
                                                })}>
                                                    <h2>{e.title}</h2>
                                                    <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                                </div>
                                            </div>;
                                        })}
                                    </>:null}
                                </li>
                                <li>
                                    {newsContext?.dataCache.has("sports")?
                                        <>
                                            {newsContext?.dataCache.get("sports")!.slice(12,15).map((e,i)=>{
                                                return <div className="horizontal-news-card">
                                                    <img alt="news pic" src={e.urlToImage as string}/>
                                                    <div onClick={()=>history.push("/news",{
                                                        dataSet:"sports",
                                                        index:i+12,
                                                        data:(newsContext?.dataCache.get("sports"))![i+12]
                                                    })}>
                                                        <h2>{e.title}</h2>
                                                        <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                                    </div>
                                                </div>;
                                            })}
                                        </>:null}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside">
                        <p>ADVERTISEMENT</p>
                        <img src={Pic} alt="adv"/>
                        <div className="search-box">
                            <input type="text" placeholder="Search here.." ref={input}/>
                            <img alt="search-logo" src={Search}  onClick={()=>{
                            if(input.current?.value.trim()==""){
                                alert("Type Something!");
                            }else{
                                history.push("/search",{
                                    "search":input.current?.value.trim(),
                                    "inNav":false
                                });
                            }
                            }}/>
                        </div>
                        <div className="title-style-container">
                            <h2>MORE NEWS</h2>
                            <ul className="display">
                                {data && newsContext?.dataCache.has(data!.dataSet)?
                                <>
                                    {[...new Array(6)].map((e,i)=>{
                                        return <li> <div className="vertical-news-card">
                                            <img alt="news pic" src={newsContext!.dataCache.get(data!.dataSet)![properIndex(data!.index+i+1,data!.dataSet)].urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:data!.dataSet,
                                                index:properIndex(data!.index+i+1,data!.dataSet),
                                                data:(newsContext?.dataCache.get(data!.dataSet))![properIndex(data!.index+i+1,data!.dataSet)]
                                            })}>
                                                <h2>{newsContext!.dataCache.get(data!.dataSet)![properIndex(data!.index+i+1,data!.dataSet)].title}</h2>
                                                <p>{getDate(newsContext!.dataCache.get(data!.dataSet)![properIndex(data!.index+i+1,data!.dataSet)].publishedAt)} | &nbsp;{newsContext!.dataCache.get(data!.dataSet)![properIndex(data!.index+i+1,data!.dataSet)].source.name}</p>
                                            </div>
                                        </div> </li>;
                                    })}
                                </>:null}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewsView;