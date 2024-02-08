import React from 'react'
import styled from 'styled-components'
import Leftside from './Leftside'
import Main from './Main'
import Rightside from './Rightside'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'


const Home = (props) => {
  return (
    <Container>
        
        
        {!props.user && <Navigate to='/' />}
        <Section>
            <h5><a>Hirirng in a hury ~</a></h5>
            <p>Find talented pros in record time with Upwork and Keep business moving</p>
        </Section>
        <Layout>
           <Leftside/>
           <Main/>
           <Rightside/>
        </Layout>
         
    </Container>
  )
}
const Container=styled.div`
    padding-top:52px;
    width:100%;
`
const Section=styled.div`
    min-height: 50px;
    padding:16px 0;
    display: flex;
    text-align: center;
    text-decoration: underline;
    justify-content: center;
    box-sizing: content-box;
    h5{
        color:#0a66c2;
        a{
            font-weight: 700;
        }
    }
    p{
        font-size: 14px;
        color:#434649;
        font-weight: 600;
    }
    @media (max-width:768px){
        flex-direction: column;
        padding:0 5px;
    }
`
const Layout=styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
    column-gap: 25px;
    /* grid-template-rows: auto; */
    row-gap: 25px;
    margin: 25px 0;
    @media (max-width:768px) {
        display: flex;
        flex-direction: column;
        padding:0 5px;
    }
`
const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    }
}
export default connect(mapStateToProps)(Home);