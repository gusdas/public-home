import { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import * as NAVER from "../../util/naverMapHelper";
import { useHomesState, useHomesDispatch } from "./../../provider/HomeContext";

export function InfoWindowContent({ data, homeInfo }) {
  const sells = homeInfo.sells;
  const [visible, setVisible] = useState(true);
  return (
    <InfoWindowDiv visible={visible}>
      <Header>
        <h3>
          [{homeInfo.gov}] {homeInfo.name}
        </h3>
        <CloseButton
          onClick={() => {
            console.log("hihi");
            setVisible(!visible);
          }}
        >
          X
        </CloseButton>
      </Header>
      <p>임대조건(2,3순위 청년 기준, 보증금 최대전환 시)</p>
      <InfoWindowScroll>
        <div>
          <span className="notranslate">
            {sells.map((sell, idx) => {
              return (
                <ul key={idx}>
                  <li>주택정보: {sell.classes}</li>
                  <li>보증금: {sell.totalPrice}</li>
                  <li>임대료: {sell.monthPay}</li>
                </ul>
              );
            })}
          </span>
        </div>
      </InfoWindowScroll>
    </InfoWindowDiv>
  );
}

export default function Marker() {
  const state = useHomesState();
  const dispatch = useHomesDispatch();
  const addCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { loading, data, error } = state.homes;
  // console.log(`Marker`);
  // console.log(data);

  NAVER.createMarker(data, state.map.data, (props) => {
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <InfoWindowContent
        data={state.map.data}
        homeInfo={props}
      ></InfoWindowContent>
    );
    return htmlString;
  });
}
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.button`
  background: none;
  outline: none;
  border: none;
  opacity: 1;
  color: #16933a;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    opacity: 0.7;
  }
  &:before,
  &:after {
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
const InfoWindowDiv = styled.div`
  width: 350px;
  text-align: left;
  padding: 10px;

  ${(props) => (props.visible ? "width: 350px" : "width: 0px")}
`;

const InfoWindowScroll = styled.div`
  display: flex;
  overflow: auto;
  height: 30vh;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
