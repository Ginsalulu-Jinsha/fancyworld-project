import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import New from "./New";

const { Header } = Layout;

const Head = ({ newEventCallbak }) => {
    const [menus] = useState([
        { title: "Pretty Experience", path: "/" },
        { title: "About", path: "/about" },
    ]);
    const navigate = useNavigate();

    const menuClick = ({ key }) => {
        const menu = menus.find(m => m.title === key);
        if (menu) navigate(menu.path);
    };

    return (
        <Header style={{
            background: 'linear-gradient(135deg, #b5004f 0%, #e91e8c 52%, #f06292 100%)',
            boxShadow: '0 2px 24px rgba(185,0,80,0.28)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 36px',
            height: '64px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* ── Brand ── */}
            <div style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: '800',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
                marginRight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                textShadow: '0 1px 8px rgba(0,0,0,0.15)',
                userSelect: 'none',
                cursor: 'pointer',
            }} onClick={() => navigate('/')}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="rgba(255,230,242,0.95)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Fancy World
            </div>

            {/* ── Nav Menu ── */}
            <div style={{ flex: 1 }}>
                <Menu
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '15px',
                        fontWeight: '500',
                        lineHeight: '62px',
                    }}
                    mode="horizontal"
                    defaultSelectedKeys={['Pretty Experience']}
                    items={menus.map(item => ({
                        key: item.title,
                        label: item.title,
                    }))}
                    onClick={menuClick}
                />
            </div>

            {/* ── New Button (rendered inside New.js) ── */}
            <New newEvent={newEventCallbak} />
        </Header>
    );
};

export default Head;
