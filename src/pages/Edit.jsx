import {useParams, useNavigate} from "react-router-dom"
import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import {useContext, useEffect, useState} from "react"
import {DiaryDispacthContext, DiaryStateContext} from '../App'

const Edit = ()=>{
	const params = useParams();
	const nav = useNavigate();
	const {onDelete,onUpdate} = useContext(DiaryDispacthContext);
	const data = useContext(DiaryStateContext);
	const [curDiaryItem, setCurDiaryItem] = useState();
	
	// 전체 데이터중에서 params의 id와 일치하는 데이터만 추출
	useEffect(()=>{
		const crruentDiaryItem = data.find(
			(item) => String(item.id) === String(params.id)
		);
		// crruentDiaryItem값이 존재하지 않는 다면 (없는 페이지 호출)
		if(!crruentDiaryItem){
			window.alert("존재하지 않는 일기입니다.");
			nav("/", {replace: true});
		}
		setCurDiaryItem(crruentDiaryItem);
	}, [params.id, data]);
	
	const onClickDelete = ()=>{
		if(window.confirm("일기를 정말 삭제할까요? 다시 복구 되지 않아요!")){
			// 일기 삭제 로직
			onDelete(params.id);
			nav("/", {replace: true})
		}
	}
	
	const onSubmit = (input)=>{
		if(window.confirm("일기를 정말 수정할까요?")){
			onUpdate(
				params.id,
				input.createdDate.getTime(), 
				input.emotionId, 
				input.content,
			);
			nav("/", {replace: true});
		}
	}
	
	return (
		<div>
			<Header
				title={"일기 수정하기"}
				leftChild={
					<Button 
						text={"< 뒤로 가기"}
						onClick={()=>nav(-1)}
					/>
				}
				rightChild={
					<Button 
						onClick={onClickDelete}
						text={"삭제하기"} 
						type={"NEGATIVE"} 
					/>
				} 
			/>
			<Editor initData={curDiaryItem} onSubmit={onSubmit} />
		</div>
	)
}

export default Edit;