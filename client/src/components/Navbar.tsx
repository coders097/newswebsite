import React, { createRef, useEffect, useRef, useState } from 'react';
import '../styles/Navbar.scss';
import Search from '../assets/search.png';
import Calender from '../assets/calendar.png';
import Logo from '../assets/logo.png';
import cloudAd from '../assets/ads/ginger.png';
import { useHistory, useLocation } from 'react-router';

const Navbar = () => {

    let [openMobileView,setMobileView]=useState(false);
    let [navLinkState,setNavLinkState]=useState(0);
    let history=useHistory();
    let input=createRef<HTMLInputElement>();
    let inputMob=createRef<HTMLInputElement>();
    let location=useLocation();

    let months=["January","February","March","April","May","June","July","Auguest","September","October","November","December"];

    let getTodaysDate=()=>{
        let date=new Date();
        let stringRes="";
        stringRes+=months[date.getMonth()]+" ";
        stringRes+=date.getDate()+", ";
        stringRes+=date.getFullYear();
        return stringRes;
    };

    useEffect(()=>{
        if(location.state){
            let {search}=location.state as {search:string};
            if(search){
                if(search==="tech" && (navLinkState!==1)) setNavLinkState(1);
                else if(search==="travel" && (navLinkState!==2)) setNavLinkState(2);
                else if(search==="lifestyle" && (navLinkState!==3)) setNavLinkState(3);
                else if(search==="fashion" && (navLinkState!==4)) setNavLinkState(4);
                else if(search==="entertainment" && (navLinkState!==5)) setNavLinkState(5);
                else if(search==="music" && (navLinkState!==6)) setNavLinkState(6);
                else if(search==="sports" && (navLinkState!==7)) setNavLinkState(7);
                else setNavLinkState(-1);
            }else{
                if(location.pathname==="/"){
                    setNavLinkState(0);
                }
            }
        }
    },[location.state]);

    return (
        <nav>
            <div className="header">
                <img alt="calender" src={Calender}/>
                <p>{getTodaysDate()}</p>
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
            </div>
            <hr/>
            <div className="main">
                <img alt="logo" src={Logo} onClick={()=>history.push("/",{})}/>
                <div className="burger" onClick={()=>setMobileView(!openMobileView)}>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <img alt="ad" src={cloudAd}/>
            </div>
            <ul>
                <li className={(navLinkState==0)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(0);
                    history.push("/",{});
                }}>Home</li>
                <li className={(navLinkState==1)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(1);
                    history.push("/search",{
                        "search":"tech",
                        "inNav":true
                    });
                }}>Technology</li>
                <li className={(navLinkState==2)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(2);
                    history.push("/search",{
                        "search":"travel",
                        "inNav":true
                    });
                }}>Travel</li>
                <li className={(navLinkState==3)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(3);
                    history.push("/search",{
                        "search":"lifestyle",
                        "inNav":true
                    });
                }}>Lifestyle</li>
                <li className={(navLinkState==4)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(4);
                    history.push("/search",{
                        "search":"fashion",
                        "inNav":true
                    });
                }}>Fashion</li>
                <li className={(navLinkState==5)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(5);
                    history.push("/search",{
                        "search":"entertainment",
                        "inNav":true
                    });
                }}>Entertainment</li>
                <li className={(navLinkState==6)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(6);
                    history.push("/search",{
                        "search":"music",
                        "inNav":true
                    });
                }}>Music</li>
                <li className={(navLinkState==7)?"--active":""}
                onClick={()=>{
                    // setNavLinkState(7);
                    history.push("/search",{
                        "search":"sports",
                        "inNav":true
                    });
                }}>Sports</li>

            </ul>
            {openMobileView?<div className="nav-view">
                <ul>
                    <li className={(navLinkState==0)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(0);
                        history.push("/",{});
                        setMobileView(!openMobileView);
                    }}>Home</li>
                    <li className={(navLinkState==1)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(1);
                        history.push("/search",{
                            "search":"tech",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Technology</li>
                    <li className={(navLinkState==2)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(2);
                        history.push("/search",{
                            "search":"travel",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Travel</li>
                    <li className={(navLinkState==3)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(3);
                        history.push("/search",{
                            "search":"lifestyle",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Lifestyle</li>
                    <li className={(navLinkState==4)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(4);
                        history.push("/search",{
                            "search":"fashion",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Fashion</li>
                    <li className={(navLinkState==5)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(5);
                        history.push("/search",{
                            "search":"entertainment",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Entertainment</li>
                    <li className={(navLinkState==6)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(6);
                        history.push("/search",{
                            "search":"music",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Music</li>
                    <li className={(navLinkState==7)?"--active":""}
                    onClick={()=>{
                        // setNavLinkState(7);
                        history.push("/search",{
                            "search":"sports",
                            "inNav":true
                        });
                        setMobileView(!openMobileView);
                    }}>Sports</li>
                </ul>
                <div className="header">
                    <img alt="calender" src={Calender}/>
                    <p>Monday, December 14, 2016</p>
                    <div className="search-box">
                        <input type="text" placeholder="Search here.." ref={inputMob}/>
                        <img alt="search-logo" src={Search} onClick={()=>{
                            if(inputMob.current?.value.trim()==""){
                                alert("Type Something!");
                            }else{
                                history.push("/search",{
                                    "search":inputMob.current?.value.trim(),
                                    "inNav":false
                                });
                            }
                            setMobileView(!openMobileView);
                        }}/>
                    </div>
                </div>
            </div>:null}
        </nav>
    );
};

export default Navbar;