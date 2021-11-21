import React, { useContext, useEffect } from 'react';
import { NEWSCONTEXT } from '../App';
import Hero from '../components/Hero';
import HomeMainParts from '../components/HomeMainParts';
import fetchManager from '../utils/fetcher';

const Home = () => {

    let newsContext=useContext(NEWSCONTEXT);
    useEffect(()=>{
        if(newsContext?.token)
            fetchManager.fetchData({
                dataCache:newsContext?.dataCache,
                setDataCache:newsContext?.setDataCache,
                searchWords:["headlines","tech","business","music","travel","sports","fashion"],
                token:newsContext?.token
            });
    },[newsContext?.token]);

    return (
        <>
            <Hero/>
            <HomeMainParts/>
        </>
    );
};

export default Home;