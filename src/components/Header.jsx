import React from 'react'
import { connect } from 'react-redux'
import styled from  'styled-components'
import { signOutAPI } from '../actions'
const Header = (props) => {
  return (
   <Container>
    <Content>
        <Logo>
            <a href="/home">
                <img src="images/home-logo.svg" alt="" />
            </a>
        </Logo>
        <Search>
            <div>
                <input type="text" placeholder='search' />
            </div>
            <SearchIcon>
                <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
        </Search>
        <Nav>
            <NavListWrap>
                <NavList className='active'>
                    <a>
                        <img src="images/nav-home.svg" alt="" />
                        <span>Home</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="images/nav-network.svg" alt="" />
                        <span>My Network</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="images/nav-jobs.svg" alt="" />
                        <span>Jobs</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="images/nav-messaging.svg" alt="" />
                        <span>Messaging</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="images/nav-notifications.svg" alt="" />
                        <span>Notifications</span>
                    </a>
                </NavList>
                <User>
                    <a>
                        {props.user && props.user.photoURL ?
                            (<img src={props.user.photoURL} alt="" />):
                            (<img src="images/user.svg" alt="" />) 
                        }
                        <span>me
                        <img src="images/down-icon.svg" alt="" /></span>
                    </a>
                    <SignOut onClick={()=>props.signOut()}>
                        <a>Sign out</a>
                    </SignOut>
                </User>

                <Work>
                    <a>
                        <img src="images/nav-work.svg" alt="" />
                        <span>Work
                        <img src="images/down-icon.svg" alt="" /></span>
                    </a>
                </Work>
            </NavListWrap>
        </Nav>
    </Content>
   </Container>
  )
}
const Container=styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    left:0;
    position: fixed;
    padding:0 24px;
    top:0;
    z-index: 100;
    width:100vw;
`
const Content=styled.div`
    display: flex;
    margin:0 auto;
    align-items: center;
    min-height: 100%;
    max-width: 1128px;
`
const Logo=styled.span`
    font-size: 0px;
    margin-right: 8px;
`
const Search=styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    &>div{
        max-width:280px;
        input{
          border:none;
          box-shadow: none;
          background-color:#eef3f8;
          border-radius: 2px;
          color:rgba(0,0,0,0.9);
          width:218px;
          padding:0 8px 0 40px;
          line-height: 1.75;
          font-weight: 400;
          font-size: 14px;
          height: 34px;
          border-color: #dce6f1;
          vertical-align: text-top;

        }
    }
`
const SearchIcon=styled.div`
    width: 40px;
    position: absolute;
    top:10px;
    left:2px;
    z-index: 1;
    border-radius: 0 2px 2px 0;
    margin: none;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.15s;

`
const Nav=styled.nav`
    margin-left: auto;
    display: block;
    @media (max-width:768px) {
        position: fixed;
        left:0;
        bottom:0;
        background-color: white;
        width:100%;
    }
`
const NavListWrap=styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;

    .active{
        span::after{
            content: '';
            transform: scaleX(1);
            border-bottom: 2px solid var(--white,#fff);
            position: absolute;
            bottom:0;
            left:0;
            transition: transform 0.2s ease-in-out;
            border-color: rgba(0,0,0,0.9);
            width:100%;
        }
    }

`
const NavList=styled.li`
    display: flex;
    align-items: center;
    a{
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 42px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
    }
    span{
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
    }
    @media (max-width:768px) {
        min-width:70px;
    }
    &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`
const SignOut=styled.div`
    position: absolute;
    top:45px;
    background: white;
    border-radius: 0 0 5px 5px;
    width:100px;
    height:40px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: center;
    display: none;
`
const User=styled(NavList)`
    a>img{
        width:24px;
        height:24px;
        border-radius: 50%;
    }
    a>span{
        display: flex;
        align-items: center;
    }
    &:hover{
        ${SignOut}{
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`
const Work=styled(User)`
    border-left:1px solid rgba(0,0,0,0.08) ;
`

const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    };
}
const mapDispatchToProps=(dispatch)=>({
    signOut:()=>dispatch(signOutAPI()),
})


export default connect(mapStateToProps,mapDispatchToProps)(Header);