import React, { createRef, useContext } from 'react';
import '../styles/HomeMainParts.scss';
import Search from '../assets/search.png';
import Pic from '../assets/pic.jpg';
import travel from '../assets/travel.png';
import entertainment from '../assets/entertainment.png';
import fashion from '../assets/fashion.png';
import sports from '../assets/sports.png';
import lifestyle from '../assets/lifestyle.png';
import ad from '../assets/ads/ad.png';
import { NEWSCONTEXT } from '../App';
import { useHistory } from 'react-router';
import Weather from './Weather';


const HomeMainParts = () => {

    let newsContext=useContext(NEWSCONTEXT);
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
    let history=useHistory();
    let input=createRef<HTMLInputElement>();


    return (
        <section className="HomeMainParts"> 
            <div className="display">
                <div className="subdisplay">
                    <div className="title-style-container">
                        <h2>BREAKING NEWS</h2>
                        <ul className="display">
                            <li>
                                <div className="horizontal-news-card">
                                    {/* <img alt="news pic" src={Pic}/>
                                    <div>
                                        <h2>Loremipsum dir adipisicing elit ipsum dolor, sit amet consectetur adipisicing elitsectetur</h2>
                                        <p>Sep 06,2019 | &nbsp;Reading Time 20 Min</p>
                                    </div> */}
                                    {newsContext?.dataCache.has("headlines")?<>
                                        <img alt="news pic" src={(newsContext?.dataCache.get("headlines")?((newsContext?.dataCache.get("headlines")![0].urlToImage) as string):"")}/>
                                        <div onClick={()=>history.push("/news",{
                                            dataSet:"headlines",
                                            index:0,
                                            data:(newsContext?.dataCache.get("headlines"))![0]
                                        })}>
                                            {/* <h3>Featured | Business</h3> */}
                                            <h2>{(newsContext?.dataCache.get("headlines")![0].title)}</h2>
                                            <p>{newsContext?.dataCache.get("headlines")?getDate(newsContext?.dataCache.get("headlines")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("headlines")![0].source.name)}</p>
                                            {/* <button className="btn">READ NOW</button> */}
                                        </div>
                                    </>:null}
                                </div>
                            </li>
                            <hr/>
                            
                                {newsContext?.dataCache.has("headlines")?
                                <>
                                    {newsContext?.dataCache.get("headlines")!.slice(1,4).map((e,i)=>{
                                        return <li> <div className="vertical-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"headlines",
                                                index:i+1,
                                                data:(newsContext?.dataCache.get("headlines"))![i+1]
                                            })}>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                            </div>
                                        </div> </li>;
                                    })}
                                </>:null}
                        </ul>
                    </div>
                    <div className="title-style-container">
                        <h2>TECHNOLOGY</h2>
                        <ul className="display">
                            <li>
                                <div className="horizontal-news-card">
                                    {/* <img alt="news pic" src={Pic}/>
                                    <div>
                                        <h2>Loremipsum dir adipisicing elit ipsum dolor, sit amet consectetur adipisicing elitsectetur</h2>
                                        <p>Sep 06,2019 | &nbsp;Reading Time 20 Min</p>
                                    </div> */}
                                    {newsContext?.dataCache.has("tech")?<>
                                        <img alt="news pic" src={(newsContext?.dataCache.get("tech")?((newsContext?.dataCache.get("tech")![1].urlToImage) as string):"")}/>
                                        <div onClick={()=>history.push("/news",{
                                                dataSet:"tech",
                                                index:1,
                                                data:(newsContext?.dataCache.get("tech"))![1]
                                            })}>
                                            {/* <h3>Featured | Business</h3> */}
                                            <h2>{(newsContext?.dataCache.get("tech")![1].title)}</h2>
                                            <p>{newsContext?.dataCache.get("tech")?getDate(newsContext?.dataCache.get("tech")![1].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("tech")![1].source.name)}</p>
                                            {/* <button className="btn">READ NOW</button> */}
                                        </div>
                                    </>:null}
                                </div>
                            </li>
                            <hr/>
                            
                                {newsContext?.dataCache.has("tech")?
                                <>
                                    {newsContext?.dataCache.get("tech")!.slice(2,5).map((e,i)=>{
                                        return <li> <div className="vertical-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"tech",
                                                index:i+2,
                                                data:(newsContext?.dataCache.get("tech"))![i+2]
                                            })}>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                            </div>
                                        </div> </li>;
                                    })}
                                </>:null}
                        </ul>
                    </div>
                </div>
                <div className="title-style-container full-view">
                    <h2>BUSINESS</h2>
                    <ul className="display">
                        <li>
                            {newsContext?.dataCache.has("business")?
                                <>
                                    {newsContext?.dataCache.get("business")!.slice(1,4).map((e,i)=>{
                                        return <div className="horizontal-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"business",
                                                index:i+1,
                                                data:(newsContext?.dataCache.get("business"))![i+1]
                                            })}>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                            </div>
                                        </div>;
                                    })}
                                </>:null}
                        </li>
                        <li>
                            {newsContext?.dataCache.has("business")?
                                <>
                                    {newsContext?.dataCache.get("business")!.slice(4,7).map((e,i)=>{
                                        return <div className="horizontal-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"business",
                                                index:i+4,
                                                data:(newsContext?.dataCache.get("business"))![i+4]
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
                <img alt="main-ad" src={ad} className="advertisement"/>
                <div className="title-style-container full-view">
                    <h2>MUSIC</h2>
                    <ul className="display">
                        <li>
                            {newsContext?.dataCache.has("music")?
                                <>
                                    {newsContext?.dataCache.get("music")!.slice(4,6).map((e,i)=>{
                                        return <div className="pop-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"music",
                                                index:i+4,
                                                data:(newsContext?.dataCache.get("music"))![i+4]
                                            })}>
                                                <h3>Featured | MUSIC</h3>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                                <button className="btn">READ NOW</button>
                                            </div>
                                        </div>;
                                    })}
                                </>:null}
                        </li>
                        <li>
                            {newsContext?.dataCache.has("music")?
                                <>
                                    {newsContext?.dataCache.get("music")!.slice(6,8).map((e,i)=>{
                                        return <div className="vertical-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"music",
                                                index:i+6,
                                                data:(newsContext?.dataCache.get("music"))![i+6]
                                            })}>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                            </div>
                                        </div>;
                                    })}
                                </>:null}
                        </li>
                        <li>
                            {newsContext?.dataCache.has("music")?
                                <>
                                    {newsContext?.dataCache.get("music")!.slice(8,10).map((e,i)=>{
                                        return <div className="vertical-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"music",
                                                index:i+8,
                                                data:(newsContext?.dataCache.get("music"))![i+8]
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
                <div className="search-box">
                        <input type="text" placeholder="Search here.." ref={input}/>
                        <img alt="search-logo" src={Search} onClick={()=>{
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
                    <h2>CATEGORIES</h2>
                    <ul className="display">
                        <li>
                            <div className="menu-box" onClick={()=>{
                                // setNavLinkState(1);
                                history.push("/search",{
                                    "search":"travel",
                                    "inNav":true
                                });
                            }}>
                                <img src={travel} alt="travel"/>
                                Travel
                            </div>
                        </li>
                        <li>
                            <div className="menu-box" onClick={()=>{
                                // setNavLinkState(1);
                                history.push("/search",{
                                    "search":"lifestyle",
                                    "inNav":true
                                });
                            }}>
                                <img src={lifestyle} alt="lifestyle"/>
                                Lifestyle
                            </div>
                        </li>
                        <li>
                            <div className="menu-box" onClick={()=>{
                                // setNavLinkState(1);
                                history.push("/search",{
                                    "search":"fashion",
                                    "inNav":true
                                });
                            }}>
                                <img src={fashion} alt="fashion"/>
                                Fashion
                            </div>
                        </li>
                        <li>
                            <div className="menu-box" onClick={()=>{
                                // setNavLinkState(1);
                                history.push("/search",{
                                    "search":"sports",
                                    "inNav":true
                                });
                            }}>
                                <img src={sports} alt="sports"/>
                                Sports
                            </div>
                        </li>
                        <li>
                            <div className="menu-box" onClick={()=>{
                                // setNavLinkState(1);
                                history.push("/search",{
                                    "search":"entertainment",
                                    "inNav":true
                                });
                            }}>
                                <img src={entertainment} alt="entertainment"/>
                                Entertainment
                            </div>
                        </li>
                    </ul>
                </div>

                <Weather/>

                <div className="pop-news-card">
                    {newsContext?.dataCache.has("fashion")?<>
                        <img alt="news pic" src={(newsContext?.dataCache.get("fashion")?((newsContext?.dataCache.get("fashion")![0].urlToImage) as string):"")}/>
                        <div onClick={()=>history.push("/news",{
                                                dataSet:"fashion",
                                                index:0,
                                                data:(newsContext?.dataCache.get("fashion"))![0]
                                            })}>
                            <h3>Featured | Fashion</h3>
                            <h2>{(newsContext?.dataCache.get("fashion")![0].title)}</h2>
                            <p>{newsContext?.dataCache.get("fashion")?getDate(newsContext?.dataCache.get("fashion")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("fashion")![0].source.name)}</p>
                            <button className="btn">READ NOW</button>
                        </div>
                    </>:null}
                </div>
                <div className="title-style-container">
                    <h2>RECENT NEWS</h2>
                    <ul className="display">
                        {newsContext?.dataCache.has("headlines")?
                                <>
                                    {newsContext?.dataCache.get("headlines")!.slice(4,10).map((e,i)=>{
                                        return <li> <div className="vertical-news-card">
                                            <img alt="news pic" src={e.urlToImage as string}/>
                                            <div onClick={()=>history.push("/news",{
                                                dataSet:"headlines",
                                                index:i+4,
                                                data:(newsContext?.dataCache.get("headlines"))![i+4]
                                            })}>
                                                <h2>{e.title}</h2>
                                                <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                            </div>
                                        </div> </li>;
                                    })}
                                </>:null}
                    </ul>
                </div>
                
            </div>
            
        </section>
    );
};

export default HomeMainParts;