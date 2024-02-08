import React, { useState ,useRef} from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';
import { postArticleAPI } from '../actions';
import {Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const PostModal = (props) => {
    const [editorText,setEditorText]=useState("");
    const[shareImage,setShareImage]=useState("");
    const[videoLink,setVideoLink]=useState("");
    const[assetArea,setAssetArea]=useState("");
    const handleChange=(e)=>{
        const image=e.target.files[0];
        if(image==='' || image===undefined){
            alert(`not an image, the file is a ${typeof(image)}`);
            return;
        }
        setShareImage(image);
    }
    // const handleVideo=(e)=>{
    //     const video=e.target.files[0];
    //     if(video===''  || video===undefined){
    //         alert(`not a video, the file is a ${typeof(video)}`);
    //         return;
    //     }
    //     setVideoLink(video)
    // }
    const handleVideo = async (e) => {
        const video = e.target.files[0];
      
        if (!video) {
          alert('Please select a valid video file.');
          return;
        }
      
        try {
          const storage = getStorage();
          const storageRef = ref(storage, 'videos/' + video.name);
          const uploadTask = uploadBytesResumable(storageRef, video);
      
          uploadTask.on('state_changed', /* handle progress */);
      
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setVideoLink(downloadURL);
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      };
    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticle=(e)=>{
        console.log('post');
        e.preventDefault();
        console.log('Target:', e.target);
        if(e.target!==e.currentTarget){
            console.log("target");
            return;
        }
        const payload={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            timestamp:Timestamp.now(),
        };
        console.log(payload.video);
        console.log(payload);
        props.postArticle(payload);
        reset(e);
    }
    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        props.handleClick(e);
    }
  return (
    <>
    {props.showModal==="open" && 
    
    <Container>
    <Content>
       <Header>
        <h2>Create a post</h2>
        <button onClick={(event)=>{
            reset(event)
        }}>
            <img src='/images/close-icon.png' alt=''/>
            
        </button>
       </Header>
       <SharedContent>
            <UserInfo>
                {props.user ?(<img src={props.user.photoURL} alt=''/>):(<img src='images/user.svg' alt=''/>)}
                {props.user.displayName ?(<span>{props.user.displayName}</span> ):(<span>Name</span> )} 
                 
            </UserInfo>
            <Editor>
            <textarea value={editorText} onChange={(e)=>{setEditorText(e.target.value)}}
            placeholder='What do you want to talk about?' autoFocus={true}></textarea>
            {assetArea==="image" && 
                <UploadImage>
                    <input
                    type='file'
                    accept='image/gif image/jpeg image/png video/mp4'
                    name='image'
                    id='file'
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    ></input>
                   <p>
                        <label htmlFor='file' style={{ color: 'blue', fontSize: '12px',fontWeight:'600' }}>
                            Select an image to upload
                        </label>
                    </p>
                    {shareImage && <img src={URL.createObjectURL(shareImage)} alt="Uploaded" />}
                </UploadImage>
            }
           {assetArea === "image" ? (
                <UploadImage>
                    <input
                    type='file'
                    accept='image/gif image/jpeg image/png video/mp4'
                    name='image'
                    id='file'
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    ></input>
                   <p>
                        <label htmlFor='file' style={{ color: 'blue', fontSize: '12px',fontWeight:'600' }}>
                            Select an image to upload
                        </label>
                    </p>
                    {shareImage && <img src={URL.createObjectURL(shareImage)} alt="Uploaded" />}
                </UploadImage>
                ) : assetArea === "video" ? (
                <>
                    {/* <input
                    type='text'
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    ></input> */}
                    <input
                    type='file'
                    accept='video/mp4'
                    name='image'
                    id='file'
                    style={{ display: 'none' }}
                    onChange={handleVideo}
                    ></input>
                    <p>
                        <label htmlFor='file' style={{ color: 'blue', fontSize: '12px',fontWeight:'600',textAlign:'center' }}>
                            Select a video to upload
                        </label>
                    </p>
                    {videoLink && <ReactPlayer width={"100%"} url={URL.createObjectURL(videoLink)} />}
                </>
                ) : null}
            </Editor>
                
            </SharedContent>

            <ShareCreation>
            <AttachAssets>
                    <AssetButton onClick={()=>switchAssetArea("image")}>
                        <img src='images/image-share.png' alt=''/>
                    </AssetButton>
                    <AssetButton onClick={()=>switchAssetArea("video")}>
                        <img src='images/video-share.png' alt=''/>
                    </AssetButton>
            </AttachAssets>
            <ShareComment>
                <AssetButton>
                    <img src='images/comment-share.png' alt=''/>
                    Anyone
                </AssetButton>
            </ShareComment>
            <PostButton disabled={!editorText ?   true :false} onClick={(event)=>postArticle(event)}>
                post
            </PostButton>
            </ShareCreation>    
        </Content>
    </Container>
        
        }
            
        </>
    
    )
    }
const Container=styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    z-index: 999;
    color:black;
    background-color: rgba(0,0,0,0.7);
    animation: fadeIn 0.3s;
`
const Content=styled.div`
    width:100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

`
const Header=styled.div`
    /* display: block; */
    padding:16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color:rgba(0,0,0,0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    button{
        height:40px;
        width:40px;
        outline: none;
        border: none;
        background-color: rgba(0,0,0,0.15);
        border-radius: 50%;
    }
`
const SharedContent=styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    padding:8px 12px;
    background: transparent;
`
const UserInfo=styled.div`
    display: flex;
    padding:12px 24px;
    align-items: center;
    img{
        width:48px;
        height:48px;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`
const ShareCreation=styled.div`
    display: flex;
    justify-content: center;
    padding:12px 24px 12px 16px;
`
const AssetButton=styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    background-color: white;
    outline: none;
    border: none;
`
const AttachAssets=styled.div`
    display: flex;
    align-items: center; 
    padding-right: 8px; 
    ${AssetButton}{
        width:40px;
    }
`

const ShareComment=styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        img{
            margin-right: 5px;
        }
    }
`
const PostButton=styled.button`
    min-width: 60px;
    padding-right: 16px;
    padding-left: 16px;
    background-color: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: white;
    border-radius: 20px;
    &:hover{
        background-color: ${props=>(props.disabled?"rgba(0,0,0,0.85)":"#004182")};
    }
`
const Editor=styled.div`
 padding:12px 24px;
 textarea{
    resize: none;
    width:100%;
    min-height: 100px;
 }
 input{
    width:100%;
    font-size: 16px;
    height:35px;
    margin-bottom: 20px;
 }


`
const UploadImage=styled.div`
    text-align: center;
    img{
        width: 100%;
    }
`
const UploadVideo=styled.div`
`

const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    }
}
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => {
        dispatch(postArticleAPI(payload));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);
