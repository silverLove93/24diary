import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit'
import NotFound from './pages/NotFound';
import {useReducer, useRef, createContext, useEffect, useState} from "react";

function reducer(state,action) {
	let nextState;

	switch(action.type){
		case "INIT":
			return action.data;
		case "CREATE": { 
			nextState = [action.data, ...state]
			break;
		}
		case "UPDATE": {
			nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
			break;
		}
		case "DELETE": {
			nextState = state.filter((item) => String(item.id) !== String(action.id));
			break;
		}
		default:
			return state;
	}
	localStorage.setItem("diary",JSON.stringify(nextState))
	return nextState;
}
  // 1. 일기데이터 컨텍스트
  export const DiaryStateContext = createContext();
  // 2. 일기를 수정하는 함수 컨텍스트
  export const DiaryDispacthContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispacth] = useReducer(reducer, []);
  const idRef = useRef(0);

	useEffect(()=>{
		const storedData = localStorage.getItem("diary");
		const parsedData = JSON.parse(storedData);

		if(!storedData){
			setIsLoading(false);
			return;
		}
		
		// useRef를 데이터의 최대 아이디 값으로 설정
		if(!Array.isArray(parsedData)){
		setIsLoading(false)
			return; // 배열이 아닐때 forEach를 사용할 수 없기에 바로 리턴 시키기는 구문
		}
		let maxId = 0;
		parsedData.forEach((item)=>{
			// Number로 한번 더 감싸는 이유는 처음 텍스트로 변환하였기 때문에 혹시모를 사고를 대비하기 위함
			if(Number(item.id) > maxId){
				maxId = Number(item.id)
			}
		})
		idRef.current = maxId + 1;
		
		dispacth({
			type : "INIT",
			data : parsedData
		})
	setIsLoading(false)
	},[])

// 새로운 일기 추가
const onCreate = (createdDate,emotionId,content)=>{
	dispacth({
		type: "CREATE",
		data: {id:idRef.current++,createdDate,emotionId,content}
	})
}

// 기존 일기 수정
const onUpdate = (id,createdDate,emotionId,content)=>{
	dispacth({
		type: "UPDATE",
		data: {id,createdDate,emotionId,content}
	})
}

// 기존 일기 삭제
const onDelete = (id)=>{
	dispacth({
		type: "DELETE",
		id
	})
}

if(isLoading){
  return <div>데이터 로딩중입니다...</div>
}

  return (
    <div className='app'>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispacthContext.Provider value={{onCreate,onUpdate,onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/New" element={<New />} />
            <Route path="/Diary/:id" element={<Diary />} />
            <Route path="/Edit/:id" element={<Edit />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </DiaryDispacthContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  )
}

export default App;