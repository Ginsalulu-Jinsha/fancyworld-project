import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Layout, Row, Col, Divider, Rate, Carousel, Image, List, Typography, Button, Modal, Input, message} from "antd";
import Maps from "./Map";
import axios from 'axios';
import moment from 'moment';

const {Content} = Layout;
const {Paragraph, Text} = Typography;
const {TextArea} = Input;

const Detail = ({windowHeight}) =>{
    const [searchParams] = useSearchParams();
    const [camp, setCamp] = useState({title:"", stars: 0, address:"", desc:"", comments: 0, lat:0, lng:0, imgs:[], time:""});

    useEffect(()=>{
        const paramID = searchParams.get("id");
        getCampDetail(paramID);
    }, []);

    const getCampDetail = (id) => {
        axios.get('/api/detail', {params:{id:id}}).then((res)=>{
            if(res.data.code != 0){
                message.error(res.data.message);
                return ;
            }
            setCamp(res.data.data);
        }).catch((error)=>{
            console.log(error.message);
        });
    };

    return (
        <Content style={{minHeight:windowHeight}}>
            <Row style={{marginTop:"20px"}}>
                <Col span={2}></Col>
                <Col span={12}>
                    <Description camp={camp}/>
                    <Divider plain>💬 Reviews</Divider>
                    <Comments campID={searchParams.get("id")} />
                </Col>
                <Col span={7} offset={1}>
                    <Divider plain>📷 Photos</Divider>
                    <Imgs imgs={camp.imgs}/>
                    <Divider plain>📍 Location</Divider>
                    <Maps latlng={{lat:camp.lat,lng:camp.lng}} zoom = {6}/>
                </Col>
                <Col span={2}></Col>
            </Row>
        </Content>
    );
}
//营地详情组件
const Description = ({camp}) => {
    //console.log(camp);
    return (
        <div>
            <Row><h1>{camp.title}</h1></Row>
            <Row style={{marginTop:"10px", lineHeight:"35px"}}>
                <Col span={6}><Rate disabled defaultValue={camp.stars} value={camp.stars} /></Col>
                <Col span={4}><span>⭐ {camp.stars} / 5</span></Col>
                <Col span={4}>💬 {camp.comments} reviews</Col>
                <Col offset={1}>🗓 {moment(camp.time*1000).format('YYYY-MM-DD HH:mm')}</Col>
            </Row>
            <Row style={{marginTop:"10px"}}><h3>📍 {camp.address}</h3></Row>
            <Row style={{marginTop:"10px"}}><h3>✨ About this experience</h3></Row>
            <Row style={{marginTop:"10px"}}><span>{camp.desc}</span></Row>
        </div>
    );
}

//图片组件
const Imgs = ({imgs}) => {
    return (
        <div>
            <Carousel autoplay style={{ backgroundColor: `rgba(209,209,209, 0.5)`, height: 300, textAlign:"center"}}>
                {imgs.map((img,idx)=><Image key={idx} height={300} src={`${axios.defaults.baseURL}/api/file?id=${img}`} />)}
            </Carousel>
        </div>
    );
}

//评论组件
const Comments = ({campID}) =>{
    const [coms, setComs] = useState([]);

    useEffect(()=>{
        getCommentList(campID);
    },[]);

    const commentAddEventHandle = () => {
        // const data = comments.map(item=>item);
        // setComs(data);
        getCommentList(campID);
    }

    const getCommentList = (id) =>{
        axios.get("/api/comments", {params:{campID:id}}).then((res)=>{
            if(res.data.code != 0){
                message.error(res.data.message);
                return ;
            }
            setComs(res.data.data);
        }).catch((error)=>{
            message.error(error.message);
        });
    };

    return (
        <div>
            <List
                header={<CommentButton campID={campID} addEventCallbackFunc={commentAddEventHandle}/>}
                bordered
                size="small"
                dataSource={coms}
                renderItem={(item) => (
                    <List.Item>
                        <Typography>
                            <Paragraph>
                                <span>👤 {item.user}</span>
                                <span style={{marginLeft:"20px"}}>⭐ {item.stars} / 5</span>
                                <span style={{marginLeft:"20px"}}>🗓 {moment(item.time*1000).format("YYYY-MM-DD HH:mm")}</span>
                            </Paragraph>
                            <Text>{item.desc}</Text>
                        </Typography>
                    </List.Item>
                )}
            />
        </div>
    );
}

const CommentButton = ({campID, addEventCallbackFunc}) => {
    const [show, setShow] = useState(false);

    const [user, setUser] = useState("");
    const [stars, setStars] = useState(0);
    const [desc, setDesc] = useState("");

    const handelShowModal = () => {
        setUser("");
        setStars(0);
        setDesc("");
        setShow(true);
    }

    const handelCancelModal = () => {
        setShow(false);
    }

    const handelOkModal = () => {
        const param = {campID:campID, user:user, stars:stars, desc:desc};
        addCampComment(param);
    }

    const addCampComment = (param) =>{
        axios.post("/api/comment/add", param, {header:{"Content-Type":"application/json"}}).then((res)=>{
            if(res.data.code != 0){
                message.error(res.data.message);
                return
            }
            addEventCallbackFunc();
            setShow(false);
        }).catch((error)=>{
            message.error(error.message);
        });
    };

    return (
        <div>
            <Button type="primary" size="small" onClick={handelShowModal}>💬 Add a Review</Button>
            <Modal title="💕 Leave a Review" open={show} onOk={handelOkModal} onCancel={handelCancelModal}>
                <Row style={{marginBottom:"10px"}}>
                    <Col span={5}>Your Name:</Col>
                    <Col span={18}><Input size="small" value={user} onChange={e=>{ e.persist(); setUser(e.target.value); }} placeholder="e.g. Sophie ✨"/></Col>
                </Row>
                <Row style={{marginBottom:"10px"}}>
                    <Col span={5}>Rating:</Col>
                    <Col span={18}><Rate value={stars} onChange={setStars}/></Col>
                </Row>
                <Row>
                    <Col span={5}>Review:</Col>
                    <Col span={18}><TextArea row={4} value={desc} onChange={e => { e.persist(); setDesc(e.target.value);}} placeholder="Share your fancy experience 💗"/></Col>
                </Row>
            </Modal>
        </div>
    );
}
export default Detail;