import  { useState } from 'react'
import styled from "styled-components";
import { Hosp } from '../../hooks/useHospital';
import { Doc } from '../../hooks/useDoctor';
import { FetchResponse } from '../../services/apiClient';
import { Timing } from '../../hooks/useTiming';
import { Token } from '../../hooks/useToken';

const Input = styled.input`
  font-size: 14px;
  &::placeholder {
    color: black;
    font-size: 14px;
  }
`;
const DD = styled.div`
  color: rgb(0, 0, 0);
  background-color: rgb(242, 242, 242);
  border: 1px solid rgba(251, 251, 251, 0.9);
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 0px;
  border-radius: 4px;
  font-size: 14px;
  position:relative;
`;
const LIHOVER = styled.li`
  &:hover{
    background:darkgrey;
    padding:0;
  }
  margin-top:.2rem;
  padding:0;

`



interface Props{
  data : () => FetchResponse<Hosp>[] | FetchResponse<Doc>[] | FetchResponse<Timing>[] | FetchResponse<Token>[] | undefined;
  elmnt? : () => JSX.Element;
  placeHolder2 : string |undefined;
  value : string;
  setId?:(val:number) => void
}
const DropDown = ({data,elmnt,placeHolder2,value,setId}:Props) => {
  
  const [isOpen, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen(!isOpen);
  };

  const [placeHolder,setPlaceHolder] = useState<null | string>(null) 

  const isHospDoc = (item: any) => item.name;
  const isTiming = (item: any) => item.timing;
  const isToken = (item: any) => item.token;

  return (
    <DD className="dropdown">
                <Input readOnly={true} placeholder={placeHolder ? placeHolder :placeHolder2} className="form-control" onClick={toggleDropDown} style={{width:'100%',position:'absolute',left:0,color:'black'}} type="text"/>
                

                {isOpen && (
                  <ul
                    className="dropdownmenu"
                    style={{
                      position: "absolute",
                      background: "white",
                      maxHeight: "10.5rem",
                      overflowY: "scroll",
                      left: 0,
                      top:'2.5rem',
                      width:'100%',
                      padding:'10px',margin:0
                      ,border:'1px solid gray',zIndex:999
                    }}
                  >
                    <li>
                    {
                      (elmnt ? elmnt() : null)
                    }
                      
                    </li>
                    {data() ? data()?.map((page) =>
                  page.results
                .map((item) => (
                (isToken(item)) ? 
                isToken(item).map(
                  (token:number) => <LIHOVER onClick={(e)=>{

                    setOpen(false)
                    setPlaceHolder((e.target as HTMLElement).innerHTML)
                    setId ? setId(parseInt((e.target as HTMLElement).getAttribute('value')!)) : null
                  }} style={{padding:'7px',cursor:'pointer'}} key={token} value={token}>
                    {token}
                                
                  </LIHOVER>):
             
                  <LIHOVER onClick={(e)=>{
                    setOpen(false)
                    setPlaceHolder((e.target as HTMLElement).innerHTML)
                    setId ? setId(parseInt((e.target as HTMLElement).getAttribute('value')!)) : null
                  }} style={{padding:'7px',cursor:'pointer'}} key={item.id} value={item.id}>
                    {isHospDoc(item) || isTiming(item)}
                  </LIHOVER>


                 ))) : value}
                  </ul>
                )}
              </DD>
  )
}

export default DropDown