import React from 'react'
import styled from 'styled-components'

const Rightside = () => {
  return (
    <Container>
       <FollowCard>
         <Title>
          <h2>Add to your feed</h2>
          <img src="images/feed-icon.svg" alt="" />
         </Title>
         <FeedList>
          <li>
            <a><Avatar/></a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
           
          </li>
          <li>
            <a><Avatar/></a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
           
          </li>
         </FeedList>
         <Recommendations>View all recommendations
          <img src="images/right-icon.svg" alt="" />
       </Recommendations>
       </FollowCard>
       <BannerCard>
       <img
          src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
          alt=""
        />
       </BannerCard>
       
    </Container>
  )
}
const Container=styled.div`
    grid-area: 'rightside';
`
const FollowCard=styled.div`
  text-align: center;
  overflow:hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding:12px;
`
const Title=styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  color:rgba(0,0,0,0.6);
`
const FeedList=styled.ul`
  margin-top: 16px;
  li{
    display: flex;
    align-items: center;
    margin:12px 0;
    position: relative;
    font-size: 14px;
    &>div{
      display: flex;
      flex-direction: column;
      
    }
    button{
      background-color: transparent;
      color: rgba(0,0,0,0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding:16px;
      border-radius: 15px;
      box-sizing: border-box;
      align-items: center;
      display: inline-flex;
      font-weight: 600;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline:none;
    }
  }
`
const Avatar=styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width:48px;
  height: 48px;
  margin-right: 8px;
`
const Recommendations=styled.a`
  color:#0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  
`
const BannerCard=styled(FollowCard)`
  img{
    width:100%;
    height:100%;
  }
  margin-bottom: 50px;
  `;
export default Rightside