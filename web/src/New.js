import React, { useState } from "react";
import { PlusOutlined, HeartOutlined } from "@ant-design/icons";
import { Modal, Input, Rate, Upload, message } from "antd";
import Maps from "./Map";
import axios from 'axios';

const { TextArea } = Input;

const HeartSvg = ({ size = 16, color = '#e91e8c' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

const FieldLabel = ({ icon, text }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        color: '#c2185b',
        fontWeight: '600',
        fontSize: '13px',
        margin: '14px 0 5px',
    }}>
        <span>{icon}</span> {text}
    </div>
);

const inputStyle = {
    borderRadius: '10px',
    borderColor: '#f8bbd0',
    fontSize: '14px',
};

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const New = ({ newEvent }) => {
    const [show, setShow] = useState(false);
    const [ver, setVer] = useState(0);

    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [stars, setStars] = useState(0);
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [picList, setPicList] = useState([]);
    const [desc, setDesc] = useState("");

    const [maxUploadPicNum] = useState(6);
    const [imagePreviewShow, setImagePreviewShow] = useState(false);
    const [imagePreviewTitle, setImagePreviewTitle] = useState('');
    const [imagePreviewSrc, setImagePreviewSrc] = useState('');

    const handleMapClick = (lat, lng) => { setLat(lat); setLng(lng); };

    const handleShowModal = () => {
        setUser(""); setTitle(""); setStars(0); setAddress("");
        setLat(0); setLng(0); setPicList([]); setDesc("");
        setShow(true);
    };

    const handleOnOK = () => {
        addCamp({
            user, title, stars, address, lat, lng,
            imgs: picList.map(item => item.response.data.id),
            desc,
        });
    };

    const handleCancelOK = () => setShow(false);

    const addCamp = (param) => {
        axios.post("/api/add", param, { header: { "Content-Type": "application/json" } }).then((res) => {
            if (res.data.code != 0) { message.error(res.data.message); return; }
            message.success("Your fancy story has been posted! 💖");
            newEvent(ver + 1);
            setVer(ver + 1);
            setShow(false);
        }).catch((error) => { message.error(error.message); });
    };

    const uploadImagePreviewHandle = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImagePreviewSrc(file.url || file.preview);
        setImagePreviewShow(true);
        setImagePreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const imagePreviewShowCancel = () => setImagePreviewShow(false);

    const uploadImageHandle = ({ file, fileList }) => {
        if (file.status === "uploading") { message.success("Uploading photo, please wait..."); setPicList(fileList); }
        if (file.status === "done") { message.success("Photo uploaded! 🌸", 3); setPicList(fileList); }
        if (file.status === "removed") { setPicList(fileList.filter(item => item.uid !== file.uid)); }
        if (file.status === "error") { message.error("Upload failed, please try again", 3); setPicList(fileList.filter(item => item.uid !== file.uid)); }
    };

    const UploadButton = (
        <div style={{ color: '#e91e8c', padding: '4px 0' }}>
            <PlusOutlined style={{ fontSize: '18px' }} />
            <div style={{ marginTop: 6, fontSize: '12px', fontWeight: '500' }}>Add Photo</div>
        </div>
    );

    return (
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            {/* ── Trigger Button ── */}
            <button
                onClick={handleShowModal}
                style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: '1.5px solid rgba(255,255,255,0.65)',
                    color: 'white',
                    borderRadius: '22px',
                    height: '38px',
                    padding: '0 20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
                    letterSpacing: '0.3px',
                    transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            >
                <HeartOutlined style={{ fontSize: '15px' }} />
                New Story
            </button>

            {/* ── Main Modal ── */}
            <Modal
                width={760}
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c2185b', fontSize: '17px', fontWeight: '700' }}>
                        <HeartSvg size={18} color="#e91e8c" />
                        Share Your Fancy Story
                    </div>
                }
                open={show}
                onOk={handleOnOK}
                onCancel={handleCancelOK}
                okText={<span><HeartSvg size={13} color="white" /> &nbsp;Post My Story</span>}
                cancelText="Maybe Later"
                styles={{
                    content: { borderRadius: '20px', overflow: 'hidden', padding: 0, boxShadow: '0 24px 64px rgba(194,24,91,0.18)' },
                    header: { background: 'linear-gradient(135deg, #fff0f6 0%, #ffe4ef 100%)', padding: '20px 24px 18px', borderBottom: '1px solid #ffd6e8', marginBottom: 0 },
                    body: { padding: '4px 24px 8px', background: '#fffafc', maxHeight: '70vh', overflowY: 'auto' },
                    footer: { background: '#fffafc', borderTop: '1px solid #ffd6e8', padding: '12px 24px' },
                }}
                okButtonProps={{
                    style: {
                        background: 'linear-gradient(135deg, #f06292, #e91e8c)',
                        border: 'none',
                        borderRadius: '18px',
                        height: '36px',
                        padding: '0 22px',
                        fontWeight: '600',
                        boxShadow: '0 4px 14px rgba(233,30,140,0.32)',
                    }
                }}
                cancelButtonProps={{
                    style: {
                        borderRadius: '18px',
                        height: '36px',
                        padding: '0 18px',
                        color: '#e91e8c',
                        borderColor: '#f48fb1',
                    }
                }}
            >
                <FieldLabel icon="👤" text="Your Name" />
                <Input style={inputStyle} size="middle" value={user} onChange={e => { e.persist(); setUser(e.target.value); }} placeholder="e.g. Sophie ✨" />

                <FieldLabel icon="✨" text="Story Title" />
                <Input style={inputStyle} size="middle" value={title} onChange={e => { e.persist(); setTitle(e.target.value); }} placeholder="e.g. The dreamiest brunch spot in Beverly Hills" />

                <FieldLabel icon="⭐" text="Rating" />
                <Rate
                    value={stars}
                    onChange={setStars}
                    style={{ color: '#e91e8c', fontSize: '22px' }}
                />

                <FieldLabel icon="📍" text="Address" />
                <Input style={inputStyle} size="middle" value={address} onChange={e => { e.persist(); setAddress(e.target.value); }} placeholder="e.g. 9500 Wilshire Blvd, Beverly Hills" />

                <FieldLabel icon="🗺️" text="Pin on Map" />
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #f8bbd0', marginBottom: '4px' }}>
                    <Maps latlng={{ lat, lng }} zoom={6} moveable={true} onClick={handleMapClick} />
                </div>

                <FieldLabel icon="📷" text="Photos (up to 6)" />
                <Upload
                    action={`${axios.defaults.baseURL}/api/upload`}
                    listType="picture-card"
                    fileList={picList}
                    onPreview={uploadImagePreviewHandle}
                    onChange={uploadImageHandle}
                    style={{ '--ant-color-primary': '#e91e8c' }}
                >
                    {picList.length >= maxUploadPicNum ? null : UploadButton}
                </Upload>

                <FieldLabel icon="💬" text="Description" />
                <TextArea
                    rows={3}
                    placeholder="Tell us about your fancy experience... (150 words max) 🌸"
                    maxLength={150}
                    value={desc}
                    onChange={e => { e.persist(); setDesc(e.target.value); }}
                    style={{ ...inputStyle, resize: 'none' }}
                    showCount
                />
            </Modal>

            {/* ── Image preview modal ── */}
            <Modal
                open={imagePreviewShow}
                title={imagePreviewTitle}
                footer={null}
                onCancel={imagePreviewShowCancel}
                styles={{ content: { borderRadius: '16px' } }}
            >
                <img alt="preview" style={{ width: '100%', borderRadius: '8px' }} src={imagePreviewSrc} />
            </Modal>
        </div>
    );
};

export default New;
