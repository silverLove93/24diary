import {useContext, useState, useEffect} from "react"
import {DiaryStateContext} from "../App"
import {useNavigate} from "react-router-dom"

const useDiary = (id)=>{
	const data = useContext(DiaryStateContext);
	const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();
	
	// 전체 데이터중에서 params의 id와 일치하는 데이터만 추출
	useEffect(()=>{
		const crruentDiaryItem = data.find((item) => 
			String(item.id) === String(id)
		);
		// crruentDiaryItem값이 존재하지 않는 다면 (없는 페이지 호출)
		if(!crruentDiaryItem){
			window.alert("존재하지 않는 일기입니다.");
			nav("/", {replace: true});
		}
		setCurDiaryItem(crruentDiaryItem);
	},[id, data])
	
	return curDiaryItem;
}

export default useDiary;