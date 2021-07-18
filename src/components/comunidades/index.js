import styled from 'styled-components';

const MainComunidades = styled.div`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .commutyArea {
    display: none;
    @media(min-width: 860px) {
      display: flex;
      flex-direction: row;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 
      "profileArea commutyArea";
    grid-template-columns: 160px 1fr;
  }
  .tableCommunity{
    width: 100%;
  }
  .boxtable{
    background-color: #F1F9FE;
    width: 100%;
    border-collapse: collapse;
    color:#2E7BB4;
    font-size: 18px;
    line-height: 21px;
  }
  .boxtr{
    display: flex;
    padding:8px;
    align-items: center;
  }
  .boxtr img{
    width: 100px;
    border-radius: 50%;
    min-height: 100px;
  }
  .tdImg{
    width:20%;
  }
  .td{
    border:0px;
  }
  .boxtr:nth-child(even) {
    background-color: #D9E6F6;
  }
`; 

export default MainComunidades