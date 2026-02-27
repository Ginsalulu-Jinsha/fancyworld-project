import React, {useState} from 'react';
import { Layout } from 'antd';
import { Header, Footer, Content} from 'antd/es/layout/layout';
//引入路由库
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./index.css";
import Head from "./Head";
import Body from "./Body";
import Detail from "./Detail";
import About from "./About";
import Foot from "./Foot";

const App = () => {
    const [bodyHeight, setBodyHeight] = useState(window.innerHeight - 64 -64);
    const [newEvent, setNewEvent] = useState(0);

    const newEventHandle = (ver) =>{
        setNewEvent(ver);
    };

    return (
        <BrowserRouter>
            <Layout>
                <Head newEventCallbak={newEventHandle}/>

                <Routes>
                    <Route path='/' element={<Body windowHeight={bodyHeight} newEventNotice={newEvent}/>} />
                    <Route path='/detail' element={<Detail windowHeight={bodyHeight}/>} />
                    <Route path='/about' element={<About windowHeight={bodyHeight}/>} />
                </Routes>

                <Foot />
            </Layout>
        </BrowserRouter>
    );
}
export default App;