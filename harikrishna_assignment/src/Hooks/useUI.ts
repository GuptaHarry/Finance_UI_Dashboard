import { useContext } from "react";
import { UIContext }from '../Context/UIContext';


export default function useUI(){
  const context = useContext(UIContext);
  if(!context){
    throw new Error("Error occured");
  }

  return context;
}