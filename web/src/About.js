import React from 'react';
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const HeartSvg = ({ size = 28, color = '#ff6b9d', opacity = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ opacity }} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

const images = [
    {
        // Girls laughing together — vibrant feminine group portrait
        url: 'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption: '💖 Share Your Fancy Moments',
        desc: 'Every beautiful memory is sweeter when shared — post your fancy story and inspire girls around the world.',
    },
    {
        // Cherry blossom tunnel — dreamy pink sakura path in Japan
        url: 'https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption: '🌸 Discover Pretty Places',
        desc: 'From cherry-blossom streets to sun-kissed rooftops — explore dreamy destinations that make your heart bloom.',
    },
    {
        // Woman with shopping bags on a sunlit city boulevard
        url: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5fGVufDB8fDB8fHww',
        caption: '🛍️ Shop Like a Goddess',
        desc: 'Stroll down luxury boulevards and hidden boutiques — because every girl deserves her Rodeo Drive moment.',
    },
    {
        // Pastel macarons at a Parisian-style patisserie counter
        url: 'https://plus.unsplash.com/premium_photo-1661369382323-6e38cd913b6b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption: '✨ Pretty Little Indulgences',
        desc: 'Life is too short for boring desserts — discover the most adorable, Instagram-worthy sweet spots in the city.',
    },
];

const About = ({ windowHeight }) => {
    const navigate = useNavigate();

    return (
        <Content style={{
            minHeight: windowHeight,
            background: 'linear-gradient(160deg, #fff0f6 0%, #ffe8f2 40%, #ffd6e8 100%)',
            overflowX: 'hidden',
        }}>
            {/* Floating hearts background decoration */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, left: '5%', opacity: 0.12 }}><HeartSvg size={80} color="#ff6b9d" /></div>
                <div style={{ position: 'absolute', top: 60, right: '8%', opacity: 0.10 }}><HeartSvg size={120} color="#ff6b9d" /></div>
                <div style={{ position: 'absolute', top: 160, left: '20%', opacity: 0.08 }}><HeartSvg size={60} color="#e91e8c" /></div>
                <div style={{ position: 'absolute', top: 100, right: '30%', opacity: 0.07 }}><HeartSvg size={50} color="#ff6b9d" /></div>

                {/* ── Hero Section ── */}
                <div style={{
                    textAlign: 'center',
                    padding: '64px 24px 48px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {/* Big decorative hearts row */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
                        {['#ffb3d0','#ff6b9d','#e91e8c','#ff6b9d','#ffb3d0'].map((c, i) => (
                            <HeartSvg key={i} size={i === 2 ? 42 : i === 1 || i === 3 ? 34 : 26} color={c} />
                        ))}
                    </div>

                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: '800',
                        color: '#c2185b',
                        margin: '0 0 12px',
                        letterSpacing: '-0.5px',
                        lineHeight: 1.2,
                    }}>
                        Welcome to <span style={{ color: '#e91e8c' }}>Fancy World</span> 💕
                    </h1>

                    <p style={{
                        fontSize: '20px',
                        color: '#ad1457',
                        maxWidth: '680px',
                        margin: '0 auto 10px',
                        lineHeight: 1.7,
                        fontWeight: 500,
                    }}>
                        A dreamy space designed <em>exclusively for girls</em> — to share, explore,
                        and fall in love with beautiful shopping & travel experiences.
                    </p>

                    <p style={{
                        fontSize: '16px',
                        color: '#c2185b',
                        maxWidth: '560px',
                        margin: '0 auto 36px',
                        lineHeight: 1.8,
                        opacity: 0.85,
                    }}>
                        Every fancy story you share becomes someone else's next great adventure. ✨
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <Button
                            onClick={() => navigate('/')}
                            style={{
                                background: 'linear-gradient(135deg, #f06292, #e91e8c)',
                                border: 'none',
                                color: 'white',
                                height: '46px',
                                padding: '0 32px',
                                borderRadius: '23px',
                                fontSize: '16px',
                                fontWeight: '600',
                                boxShadow: '0 6px 20px rgba(233,30,140,0.35)',
                                cursor: 'pointer',
                            }}
                        >
                            💖 Explore Pretty Experiences
                        </Button>
                    </div>
                </div>

                {/* ── Image Gallery ── */}
                <div style={{ padding: '20px 48px 56px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            <HeartSvg size={22} color="#e91e8c" />
                            <h2 style={{ fontSize: '26px', color: '#c2185b', margin: 0, fontWeight: '700' }}>
                                Our World of Fancy
                            </h2>
                            <HeartSvg size={22} color="#e91e8c" />
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '28px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}>
                        {images.map((img, idx) => (
                            <div key={idx} style={{
                                borderRadius: '20px',
                                overflow: 'hidden',
                                background: 'white',
                                boxShadow: '0 8px 32px rgba(233,30,140,0.12)',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                border: '2px solid #ffe0ef',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(233,30,140,0.22)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(233,30,140,0.12)';
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={img.url}
                                        alt={img.caption}
                                        style={{
                                            width: '100%',
                                            height: '220px',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    {/* Pink heart overlay badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'rgba(255,255,255,0.88)',
                                        borderRadius: '50%',
                                        width: '38px',
                                        height: '38px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}>
                                        <HeartSvg size={20} color="#e91e8c" />
                                    </div>
                                </div>
                                <div style={{ padding: '18px 20px 22px' }}>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        color: '#c2185b',
                                        marginBottom: '8px',
                                        lineHeight: 1.4,
                                    }}>
                                        {img.caption}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        color: '#888',
                                        lineHeight: 1.7,
                                    }}>
                                        {img.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── How It Works ── */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255,182,213,0.4) 0%, rgba(255,228,240,0.6) 100%)',
                    padding: '56px 48px 64px',
                    borderTop: '1px solid #ffd6e8',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            <HeartSvg size={22} color="#e91e8c" />
                            <h2 style={{ fontSize: '26px', color: '#c2185b', margin: 0, fontWeight: '700' }}>
                                How Fancy World Works
                            </h2>
                            <HeartSvg size={22} color="#e91e8c" />
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '28px',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}>
                        {/* Card 1 — Share */}
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '36px 28px',
                            textAlign: 'center',
                            boxShadow: '0 8px 28px rgba(233,30,140,0.10)',
                            border: '2px solid #ffe0ef',
                        }}>
                            <div style={{
                                width: '70px', height: '70px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f8bbd0, #f48fb1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px', fontSize: '30px',
                                boxShadow: '0 4px 16px rgba(233,30,140,0.20)',
                            }}>
                                ✍️
                            </div>
                            <h3 style={{ fontSize: '20px', color: '#c2185b', fontWeight: '700', marginBottom: '12px' }}>
                                Share Your Story
                            </h3>
                            <p style={{ color: '#888', lineHeight: 1.8, fontSize: '14px', marginBottom: '20px' }}>
                                Click the <strong style={{ color: '#e91e8c' }}>New</strong> button in the top navigation bar
                                to post your own fancy shopping trip, dreamy café visit, or any beautiful experience
                                that made your heart flutter. 💗
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                background: '#fff0f6', borderRadius: '20px', padding: '6px 16px',
                                fontSize: '13px', color: '#e91e8c', fontWeight: '600',
                            }}>
                                <HeartSvg size={14} color="#e91e8c" /> Click "New" to get started
                            </div>
                        </div>

                        {/* Card 2 — Explore */}
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '36px 28px',
                            textAlign: 'center',
                            boxShadow: '0 8px 28px rgba(233,30,140,0.10)',
                            border: '2px solid #ffe0ef',
                        }}>
                            <div style={{
                                width: '70px', height: '70px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f8bbd0, #f48fb1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px', fontSize: '30px',
                                boxShadow: '0 4px 16px rgba(233,30,140,0.20)',
                            }}>
                                🗺️
                            </div>
                            <h3 style={{ fontSize: '20px', color: '#c2185b', fontWeight: '700', marginBottom: '12px' }}>
                                Explore Pretty Experiences
                            </h3>
                            <p style={{ color: '#888', lineHeight: 1.8, fontSize: '14px', marginBottom: '20px' }}>
                                Head to the <strong style={{ color: '#e91e8c' }}>Pretty Experience</strong> page to
                                discover amazing places shared by other girls — from hidden brunch spots to
                                must-visit boutiques that spark life inspiration. ✨
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                background: '#fff0f6', borderRadius: '20px', padding: '6px 16px',
                                fontSize: '13px', color: '#e91e8c', fontWeight: '600',
                                cursor: 'pointer',
                            }}
                                onClick={() => navigate('/')}
                            >
                                <HeartSvg size={14} color="#e91e8c" /> Browse & get inspired
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom tagline ── */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px 24px 48px',
                    background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                        {[...Array(7)].map((_, i) => (
                            <HeartSvg key={i} size={i % 2 === 0 ? 18 : 24} color={i % 2 === 0 ? '#f48fb1' : '#e91e8c'} />
                        ))}
                    </div>
                    <p style={{ fontSize: '18px', color: '#ad1457', fontWeight: '600', margin: 0 }}>
                        "Life is short — make it fancy, make it beautiful, make it yours." 💕
                    </p>
                </div>
            </div>
        </Content>
    );
};

export default About;
