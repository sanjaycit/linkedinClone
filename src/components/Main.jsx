import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import PostModal from './PostModal'
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';
import ReactPlayer from 'react-player';
const Main = (props) => {
  const[showModal,setShowModal]=useState("close");
  useEffect(()=>{
    props.getArticles();
  },[props.article])
  const handleClick=(e)=>{
    // if(e.target!==e.currentTarget){
    //   return;
    // }
    switch(showModal){
      case("open"):
        setShowModal("close");
        break;
      case("close"):
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  }
  return (
    <>
    
      <Container>
      <Share>
      <div>
       {props.user && props.user.photoURL?
       (
         <img src={props.user.photoURL} alt="" />
       ):
       (
           <img src="images/user.svg" alt="" />
       )
       }
     
       <button onClick={handleClick} disabled={props.loading ?true:false}>Start a post</button>
      </div>
      <div>
       <button>
         <img src="images/photo.svg" alt="" />
         <span>Photo</span>
       </button>
       <button>
         <img src="images/video-post2.png" alt="" />
         <span>video</span>
       </button>
       <button>
         <img src="images/events-post.png" alt="" />
         <span>Events</span>
       </button>
       <button>
         <img src="images/article-post.png" alt="" />
         <span>write article</span>
       </button>

      </div>
      </Share>
      {props.articles.length===0 ?(
      <p>There are no articles</p>
    ):(
      <Content>
      {
        props.loading && <img src='images/loading-spinner.svg'/>
      }
      {props.articles.length>0 && 
      props.articles.map((article,key)=>(
       <Article key={key}>
       <SharedActor>
         <a>
           <img src={article.actor.image} alt="" />
           <div>
             <span>{article.actor.title}</span>
             <span>{article.actor.description}</span>
             <span>{article.actor.data.toDate().toLocaleString()}</span>
           </div>
          
         </a>
         <button>
           <img src="images/ellipsis.png" alt="" />
         </button>
       </SharedActor>
       <Description>{article.description}</Description>
       <SharedImg>
         <a>
           {!article.sharedImg && article.video ? (<ReactPlayer width="100%" url={article.video}></ReactPlayer>):
           (article.sharedImg && <img src={article.sharedImg}/>)}
         </a>
       </SharedImg>
       <SocialCounts>
         <li>
           <button>
           <img src="images/like.png" alt="" />
           <img src="images/heart-icon.png" alt="" />
           <span>75</span>
           </button>
         </li>
         <li><a>{article.comments}</a></li>
         
       </SocialCounts>
       <SocialActions>
       <button>
         <img src="images/like.png" alt="" />
         <span>Like</span>
       </button>
       <button>
         <img src="images/comment.png" alt="" />
         <span>Comment</span>
       </button>
       <button>
         <img src="images/share-icon.png" alt="" />
         <span>Share</span>
       </button>
       <button>
         <img src="images/send-icon.png" alt="" />
         <span>Send</span>
       </button>
       </SocialActions>
      
      </Article>
      ))}
    
   
     
     </Content>
    )}
      
      <PostModal showModal={showModal} handleClick={handleClick}/>
      
     
   </Container>
   
    </>
  )
}
const Container=styled.div`
    grid-area: 'main';
`
const CommonCard=styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  position: relative;
  border: none;
`
const Share=styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color:#958b7b;
  margin:0 0 8px;
  div{
    button{
      outline: none;
      color:rgba(0,0,0,0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

    }
    &:first-child{
      display: flex;
      align-items: center;
      padding:8px 16px 0 16px;
      img{
        width:48px;
        border-radius: 50%;
        margin-right: 8px;

      }
      button{
        margin:4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0,0,0,0.15);
      }
    }
    &:nth-child(2){
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button{
        img{
          margin:0 4px 0 -12px;
        }
        span{
          color:#70b5f9;
        }
      }
    }
  }
`
const Article=styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
`;
const SharedActor=styled.div`
  padding-right: 40px;
  display: flex;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  align-items: center;
  margin-bottom: 8px;
  a{
    margin-right: 12px;
    flex-grow: 1;
    display: flex;
    
    overflow: hidden;
    img{
      width:48px;
      height:48px;
    }
    &>div{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span{
        text-align: left;
        &:first-child{
          font-size: 14px;
          font-weight: 700;
          color:rgba(0,0,0,1)
        }
        &:nth-child(n+1){
          font-size: 12px;
          color:rgba(0,0,0,0.6);
        }
      }
      
    }
  }
  button{
    position: absolute;
    right:12px;
    top:0;
    background: transparent;
    border: none;
    outline: none;
  }

`
const Description=styled.div`
  overflow: hidden;
  padding:0 16px;
  color:rgba(0,0,0,0.9);
  font-size: 14px;
  text-align: left;

`
const SharedImg=styled.div`
  margin-top: 8px;
  width:100%;
  display: block;
  position: relative;
  /* background-color: #f9fafb; */
  img{
    /* object-fit: contain; */
    width:100%;
    height: 100%;
  }
`
const SocialCounts=styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin:0 16px;
  padding:8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style-type: none;
  li{
    font-size: 12px;
    margin-right: 5px;
    button{
      display: flex;
      border: none;
      background-color: white;
    }
  }

`
const SocialActions=styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 40px;
  margin:0;
  padding:4px 8px;
  button{
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color:#0a66c2;
    outline: none;
    border: none;
    background-color: white;
    @media (min-width:768px) {
      span{
        margin-left:8px;
      }
    }
  }
  
`
const Content=styled.div`
  text-align: center;
  &>img{
    width:30px;

  }
`
const mapStateToProps=(state)=>{
  return{
    loading:state.articleState.loading,
    user:state.userState.user,
    articles:state.articleState.articles,
  }
}
const mapDispatchToProps=(dispatch)=>({
  getArticles:()=>dispatch(getArticlesAPI()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Main);
