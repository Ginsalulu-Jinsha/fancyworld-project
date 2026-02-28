import { useState, useEffect } from 'react';
import { Layout, List, Rate, message, Tabs } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';

const { Content } = Layout;

const CATEGORIES = [
    { key: '', label: 'All ✨' },
    { key: 'women_clothing', label: 'Fashion 👗' },
    { key: 'nail_salon', label: 'Nails 💅' },
    { key: 'beauty_store', label: 'Beauty 💄' },
    { key: 'hair_salon', label: 'Hair 💇' },
];

const HeartSvg = ({ size = 16, color = '#e91e8c' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

const Body = ({ windowHeight, newEventNotice }) => {
    return (
        <Content style={{
            minHeight: windowHeight,
            background: 'linear-gradient(160deg, #fff0f6 0%, #ffe8f2 45%, #fdf4f9 100%)',
        }}>
            {/* ── Hero Banner ── */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(233,30,140,0.07) 0%, rgba(240,98,146,0.05) 100%)',
                borderBottom: '1px solid #ffd6e8',
                padding: '38px 48px 32px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative background hearts */}
                <div style={{ position: 'absolute', top: 12, left: '6%', opacity: 0.08 }}><HeartSvg size={70} color="#e91e8c" /></div>
                <div style={{ position: 'absolute', top: 20, right: '7%', opacity: 0.06 }}><HeartSvg size={90} color="#e91e8c" /></div>
                <div style={{ position: 'absolute', bottom: 8, left: '22%', opacity: 0.05 }}><HeartSvg size={50} color="#e91e8c" /></div>

                {/* Heart row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                    {['#ffb3d0', '#f48fb1', '#e91e8c', '#f48fb1', '#ffb3d0'].map((c, i) => (
                        <HeartSvg key={i} size={i === 2 ? 28 : i === 1 || i === 3 ? 22 : 16} color={c} />
                    ))}
                </div>

                <h1 style={{
                    fontSize: '34px',
                    fontWeight: '800',
                    color: '#c2185b',
                    margin: '0 0 10px',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.2,
                }}>
                    ✨ Pretty Experiences
                </h1>
                <p style={{
                    color: '#ad1457',
                    fontSize: '16px',
                    margin: 0,
                    opacity: 0.78,
                    fontWeight: 500,
                }}>
                    Discover & share the most beautiful moments around you 💕
                </p>
            </div>

            <Camps newNotice={newEventNotice} />
        </Content>
    );
};

const FancyCard = ({ item }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link target="_blank" to={{ pathname: `/detail`, search: `id=${item.id}` }}
            style={{ textDecoration: 'none' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: '280px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'white',
                    border: '1.5px solid #fce4ec',
                    boxShadow: hovered
                        ? '0 16px 48px rgba(233,30,140,0.18)'
                        : '0 4px 20px rgba(233,30,140,0.09)',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                }}
            >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '186px' }}>
                    <img
                        style={{
                            height: '186px',
                            width: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transform: hovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.35s ease',
                        }}
                        src={item.imgs[0].startsWith('http') 
                            ? item.imgs[0] 
                            : `${axios.defaults.baseURL}/api/file?id=${item.imgs[0]}`}
                        alt={item.title}
                    />
                    {/* Pink gradient overlay on hover */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(194,24,91,0.25) 0%, transparent 60%)',
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.25s ease',
                    }} />
                    {/* Heart badge */}
                    <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(255,255,255,0.90)',
                        borderRadius: '50%', width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        transform: hovered ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.2s ease',
                    }}>
                        <HeartSvg size={16} color="#e91e8c" />
                    </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '14px 16px 18px' }}>
                    <Rate
                        disabled
                        defaultValue={item.stars}
                        style={{ fontSize: '14px', color: '#e91e8c', marginBottom: '8px', display: 'block' }}
                    />
                    <div style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#c2185b',
                        marginBottom: '6px',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {item.title}
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: '#aaa',
                        lineHeight: 1.6,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {item.desc.substring(0, 60)}...
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Camps = ({ newNotice }) => {
    const [camps, setCamps] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        getCamps();
    }, [newNotice, activeCategory]);

    const getCamps = () => {
        axios.get('/api/list', { params: { category: activeCategory } }).then((res) => {
            if (res.data.code != 0) { message.error(res.data.message); return; }
            setCamps(res.data.data);
        }).catch((error) => { message.error(error.message); });
    };

    return (
        <div style={{ padding: '24px 44px 48px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    activeKey={activeCategory}
                    onChange={setActiveCategory}
                    centered
                    items={CATEGORIES.map(cat => ({
                        key: cat.key,
                        label: (
                            <span style={{ 
                                fontSize: '16px', 
                                fontWeight: 600, 
                                padding: '0 12px',
                                color: activeCategory === cat.key ? '#c2185b' : '#f48fb1'
                            }}>
                                {cat.label}
                            </span>
                        ),
                    }))}
                    className="fancy-tabs"
                    style={{ borderBottom: 'none' }}
                />
            </div>
            {camps.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px 0', color: '#f48fb1' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#e91e8c', marginBottom: '8px' }}>
                        No stories yet — be the first!
                    </div>
                    <div style={{ fontSize: '14px', color: '#f48fb1' }}>
                        Click "New Story" in the top bar to share your fancy experience 💕
                    </div>
                </div>
            ) : (
                <List
                    grid={{ gutter: 24, column: 4 }}
                    dataSource={camps}
                    renderItem={(item) => (
                        <List.Item style={{ marginBottom: '16px' }}>
                            <FancyCard item={item} />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default Body;
