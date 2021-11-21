import React, { useContext } from 'react';
import '../styles/Hero.scss';
import Pic from '../assets/pic.jpg';
import { NEWSCONTEXT, NewsState } from '../App';
import { useHistory } from 'react-router';

const Hero = () => {

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

    return (
        <section className="Hero">
            <div style={{gridArea:"one"}}>
                <div className="pop-news-card">
                    {(newsContext && newsContext?.dataCache.has("business"))?<>
                        <img alt="news pic" src={(newsContext?.dataCache.get("business")?((newsContext?.dataCache.get("business")![0].urlToImage) as string):"")}/>
                        <div onClick={()=>history.push("/news",{
                            dataSet:"business",
                            index:0,
                            data:(newsContext?.dataCache.get("business"))![0]
                        })}>
                            <h3>Featured | Business</h3>
                            <h2>{(newsContext?.dataCache.get("business")![0].title)}</h2>
                            <p>{newsContext?.dataCache.get("business")?getDate(newsContext?.dataCache.get("business")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("business")![0].source.name)}</p>
                            {/* <button className="btn">READ NOW</button> */}
                        </div>
                    </>:null}
                </div>
            </div>
            <div style={{gridArea:"two"}}>
                <div className="pop-news-card">
                    {newsContext?.dataCache.has("tech")?<>
                        <img alt="news pic" src={(newsContext?.dataCache.get("tech")?((newsContext?.dataCache.get("tech")![0].urlToImage) as string):"")}/>
                        <div onClick={()=>history.push("/news",{
                            dataSet:"tech",
                            index:0,
                            data:(newsContext?.dataCache.get("tech"))![0]
                        })}>
                            <h3>Featured | Tech</h3>
                            <h2>{(newsContext?.dataCache.get("tech")![0].title)}</h2>
                            <p>{newsContext?.dataCache.get("tech")?getDate(newsContext?.dataCache.get("tech")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("tech")![0].source.name)}</p>
                            {/* <button className="btn">READ NOW</button> */}
                        </div>
                    </>:null}
                </div>
            </div>
            <div style={{gridArea:"three"}}>
                <div className="pop-news-card">
                    {newsContext?.dataCache.has("travel")?<>
                        <img alt="news pic" src={(newsContext?.dataCache.get("travel")?((newsContext?.dataCache.get("travel")![0].urlToImage) as string):"")}/>
                        <div onClick={()=>history.push("/news",{
                            dataSet:"travel",
                            index:0,
                            data:(newsContext?.dataCache.get("travel"))![0]
                        })}>
                            <h3>Featured | Travel</h3>
                            <h2>{(newsContext?.dataCache.get("travel")![0].title)}</h2>
                            <p>{newsContext?.dataCache.get("travel")?getDate(newsContext?.dataCache.get("travel")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("travel")![0].source.name)}</p>
                            {/* <button className="btn">READ NOW</button> */}
                        </div>
                    </>:null}
                </div>
            </div>
            <div style={{gridArea:"four"}}>
                <div className="pop-news-card">
                    {newsContext?.dataCache.has("sports")?<>
                        <img alt="news pic" src={(newsContext?.dataCache.get("sports")?((newsContext?.dataCache.get("sports")![0].urlToImage) as string):"")}/>
                        <div onClick={()=>history.push("/news",{
                            dataSet:"sports",
                            index:0,
                            data:(newsContext?.dataCache.get("sports"))![0]
                        })}>
                            <h3>Featured | Sports</h3>
                            <h2>{(newsContext?.dataCache.get("sports")![0].title)}</h2>
                            <p>{newsContext?.dataCache.get("sports")?getDate(newsContext?.dataCache.get("sports")![0].publishedAt):null} | &nbsp;{(newsContext?.dataCache.get("sports")![0].source.name)}</p>
                            {/* <button className="btn">READ NOW</button> */}
                        </div>
                    </>:null}
                </div>
            </div>
        </section>
    );
};

export default Hero;