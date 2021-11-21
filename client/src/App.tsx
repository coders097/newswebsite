import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchResultsView from './components/SearchResultsView';
import NewsView from './components/NewsView';
import Home from './pages/Home';
import { BrowserRouter,Route } from 'react-router-dom';
import FetchManager from './utils/fetcher';

export interface NewsState{
  author: string | null;
  title :string | null;
  source: {
    id: string | null;
    name: string | null;
  };
  description:string  | null;
  url:string | null;
  urlToImage:string | null;
  publishedAt:string | null;
  content:string |null
}

export let NEWSCONTEXT=createContext<{
  dataCache:Map<string, NewsState[]>;
  setDataCache:React.Dispatch<React.SetStateAction<Map<string, NewsState[]>>>;
  token:string | null;
  recent?:NewsState[];
  setRecent?:React.Dispatch<React.SetStateAction<NewsState[]>>;
  setToken?:React.Dispatch<React.SetStateAction<string | null>>
} | null>(null);
const App = () => {
  
  let [dataCache,setDataCache]=useState(new Map<string,NewsState[]>());
  let [token,setToken]=useState<string | null>(null);
  let [recent,setRecent]=useState<NewsState[]>([]);

  useEffect(()=>{
    FetchManager.fetchToken({
      token,
      setToken
    });
  },[]);
  
  return (
    <BrowserRouter>
      <NEWSCONTEXT.Provider value={{dataCache,setDataCache,token,recent,setRecent,setToken}}>
        <Navbar/>
        <Route exact path="/" render={()=><Home/>}/>
        <Route path="/search" render={()=><SearchResultsView/>}/>
        <Route path="/news" render={()=><NewsView/>}/>
        <hr/>
        <Footer/>
      </NEWSCONTEXT.Provider>
    </BrowserRouter>
  );
};

export default App;