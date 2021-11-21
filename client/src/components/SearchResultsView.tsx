import React, { useContext, useEffect, useState } from 'react';
import '../styles/SearchResultsView.scss';
import Pic from '../assets/pic.jpg';
import { NEWSCONTEXT } from '../App';
import { useHistory, useLocation } from 'react-router';
import FetchManager from '../utils/fetcher';


const SearchResultsView = () => {

    let newsContext=useContext(NEWSCONTEXT);
    let location=useLocation();
    let history=useHistory();
    let [searchKey,setSearchKey]=useState<string | null>(null);
    let [fromNav,setFromNav]=useState<boolean>(false);

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


    let [pagiIndex,setPagiIndex]=useState(0);


    useEffect(()=>{
        // console.log(location.state);
        if(location.state){
            setFromNav((location.state as any).inNav); 
            setSearchKey((location.state as any).search);
            FetchManager.fetchData({
                dataCache:newsContext?.dataCache,
                searchWords:[(location.state as any).search],
                setDataCache:newsContext?.setDataCache,
                token:newsContext?.token
            });
            setPagiIndex(0);
        }else{
            history.push("/");
        }
        window.scrollTo(0,0);
    },[location.state]);

    return (
        <section className="SearchResultsView">
            {(fromNav && searchKey)?<ul className="header">
                <li style={{gridArea:"one"}}>
                    <div className="pop-news-card">
                        {newsContext?.dataCache.has(searchKey)?<>
                            <img alt="news pic" src={newsContext?.dataCache.get(searchKey)?newsContext?.dataCache.get(searchKey)![0].urlToImage as string:""}/>
                            <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:0,
                                                data:(newsContext?.dataCache.get(searchKey!))![0]
                                            })}>
                                <h3>Featured | {searchKey.substring(0,1).toUpperCase()+searchKey.substring(1)}</h3>
                                <h2>{newsContext?.dataCache.get(searchKey)![0].title}</h2>
                                <p>{newsContext?.dataCache.get(searchKey)?getDate(newsContext?.dataCache.get(searchKey)![0].publishedAt):null} | &nbsp;{newsContext?.dataCache.get(searchKey)![0].source.name}</p>
                            </div>
                        </>:null}
                    </div>
                </li>
                <li style={{gridArea:"two"}}>
                    <div className="pop-news-card">
                        {newsContext?.dataCache.has(searchKey)?<>
                            <img alt="news pic" src={newsContext?.dataCache.get(searchKey)?newsContext?.dataCache.get(searchKey)![1].urlToImage as string:""}/>
                            <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:1,
                                                data:(newsContext?.dataCache.get(searchKey!))![1]
                                            })}>
                                <h3>Featured | {searchKey.substring(0,1).toUpperCase()+searchKey.substring(1)}</h3>
                                <h2>{newsContext?.dataCache.get(searchKey)![1].title}</h2>
                                <p>{newsContext?.dataCache.get(searchKey)?getDate(newsContext?.dataCache.get(searchKey)![1].publishedAt):null} | &nbsp;{newsContext?.dataCache.get(searchKey)![1].source.name}</p>
                            </div>
                        </>:null}
                    </div>
                </li>
                <li style={{gridArea:"three"}}>
                    <div className="pop-news-card">
                        {newsContext?.dataCache.has(searchKey)?<>
                            <img alt="news pic" src={newsContext?.dataCache.get(searchKey)?newsContext?.dataCache.get(searchKey)![2].urlToImage as string:""}/>
                            <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:2,
                                                data:(newsContext?.dataCache.get(searchKey!))![2]
                                            })}>
                                <h3>Featured | {searchKey.substring(0,1).toUpperCase()+searchKey.substring(1)}</h3>
                                <h2>{newsContext?.dataCache.get(searchKey)![2].title}</h2>
                                <p>{newsContext?.dataCache.get(searchKey)?getDate(newsContext?.dataCache.get(searchKey)![2].publishedAt):null} | &nbsp;{newsContext?.dataCache.get(searchKey)![2].source.name}</p>
                            </div>
                        </>:null}
                    </div>
                </li>
                <li style={{gridArea:"four"}}>
                    <div className="pop-news-card">
                        {newsContext?.dataCache.has(searchKey)?<>
                            <img alt="news pic" src={newsContext?.dataCache.get(searchKey)?newsContext?.dataCache.get(searchKey)![3].urlToImage as string:""}/>
                            <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:3,
                                                data:(newsContext?.dataCache.get(searchKey!))![3]
                                            })}>
                                <h3>Featured | {searchKey.substring(0,1).toUpperCase()+searchKey.substring(1)}</h3>
                                <h2>{newsContext?.dataCache.get(searchKey)![3].title}</h2>
                                <p>{newsContext?.dataCache.get(searchKey)?getDate(newsContext?.dataCache.get(searchKey)![3].publishedAt):null} | &nbsp;{newsContext?.dataCache.get(searchKey)![3].source.name}</p>
                            </div>
                        </>:null}
                    </div>
                </li>
                <li style={{gridArea:"five"}}>
                    <div className="pop-news-card">
                        {newsContext?.dataCache.has(searchKey)?<>
                            <img alt="news pic" src={newsContext?.dataCache.get(searchKey)?newsContext?.dataCache.get(searchKey)![4].urlToImage as string:""}/>
                            <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:4,
                                                data:(newsContext?.dataCache.get(searchKey!))![4]
                                            })}>
                                <h3>Featured | {searchKey.substring(0,1).toUpperCase()+searchKey.substring(1)}</h3>
                                <h2>{newsContext?.dataCache.get(searchKey)![4].title}</h2>
                                <p>{newsContext?.dataCache.get(searchKey)?getDate(newsContext?.dataCache.get(searchKey)![4].publishedAt):null} | &nbsp;{newsContext?.dataCache.get(searchKey)![4].source.name}</p>
                            </div>
                        </>:null}
                    </div>
                </li>
            </ul>:null}
            <div className="title-style-container">
                <h2>MORE RESULTS</h2>
                <ul className="body">
                    {searchKey && newsContext?.dataCache.get(searchKey)?<li>
                        {newsContext?.dataCache.get(searchKey)!.slice(pagiIndex+5,pagiIndex+10).map((e,i)=>{
                                return <div className="vertical-news-card">
                                    <img alt="news pic" src={e.urlToImage as string}/>
                                    <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:i+pagiIndex+5,
                                                data:(newsContext?.dataCache.get(searchKey!))![i+pagiIndex+5]
                                            })}>
                                        <h2>{e.title}</h2>
                                        <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                    </div>
                                </div>;
                            })}
                    </li>:null}
                    {searchKey && newsContext?.dataCache.get(searchKey) && (pagiIndex+10<newsContext?.dataCache.get(searchKey)!.length)?<li>
                        {newsContext?.dataCache.get(searchKey)!.slice(pagiIndex+10,pagiIndex+15).map((e,i)=>{
                                return <div className="vertical-news-card">
                                    <img alt="news pic" src={e.urlToImage as string}/>
                                    <div onClick={()=>history.push("/news",{
                                                dataSet:searchKey,
                                                index:i+pagiIndex+10,
                                                data:(newsContext?.dataCache.get(searchKey!))![i+pagiIndex+10]
                                            })}>
                                        <h2>{e.title}</h2>
                                        <p>{getDate(e.publishedAt)} | &nbsp;{e.source.name}</p>
                                    </div>
                                </div>;
                            })}
                    </li>:null}
                </ul>
                {searchKey && newsContext?.dataCache.get(searchKey)?
                    <ul className="pagination">
                            <li onClick={()=>{
                                if(pagiIndex==0) return;
                                setPagiIndex(pagiIndex-10);
                            }}>{"< left"}</li>
                            <li onClick={()=>{
                                if(pagiIndex+10>=newsContext!.dataCache.get(searchKey as string)!.length) return;
                                setPagiIndex(pagiIndex+10);
                            }}>{"right >"}</li>
                    </ul>
                :null}
            </div>
        </section>
    );
};

export default SearchResultsView;