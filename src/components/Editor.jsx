import "./Editor.css"
import EmotionItem from "./EmotionItem"
import Button from "../components/Button"
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {emotionList} from "../util/constants";
import {getStringedDate} from "../util/get-stinged-date";

const Editor = ({initData,onSubmit})=>{
	const nav = useNavigate();
	const [input, setInput] = useState({
		// 날짜 객체를 그대로 전달하면 input의 value에서 변경 안됨
		// input의 value는 yyyy-mm-dd형식으로 전달해야함
		createdDate: new Date(), 
		emotionId: 0,
		content: ""
	});
	
	const onClickSubmitButton = ()=>{
		onSubmit(input);
	}

    // 마운트 될때 해당하는 데이터를 보여주는 이펙트
	// 혹시 잘 안나온다면 해당하는 value값이 잘 들어가 있는지 체크
	useEffect(()=>{
		if(initData){
			setInput({
				...initData,
				createdDate: new Date(Number(initData.createdDate)),
			})
		}
	},[initData])

	// 사용자가 날짜를 바꾸어도 input State가 바로 바뀔 수 있도록 도와주는 함수
const onChangeInput = (e)=>{
	// e.target.name : 어떤 요소에 입력이 들어올건지
	// e.target.value : 입력된 값이 무엇인지
	let name = e.target.name;
	let value = e.target.value;
	
	// value가 날짜 객체가 아닌 스트링으로 전달되기 때문에 날짜 객체로 변환시키기
	if(name === "createdDate"){
		value = new Date(value);
	}
	setInput({
		...input,
	[name] : value
	})
}
	return (
		<div className={"Editor"}>
			<section className={"date_section"}>
				<h4>오늘의 날짜</h4>
				<input 
					name={"createdDate"}
					onChange={onChangeInput}
					value={getStringedDate(input.createdDate)} 
					type="date" 
				/>
			</section>
			<section className={"emotion_section"}>
				<h4>오늘의 감정</h4>
				<div className={"emotion_list_wrapper"}>
					{emotionList.map((item)=>
						<EmotionItem 
							// EmotionItem은 컴포넌트라서 onChangeInput의 인수로 이벤트 객체 전달해주어야 함
							onClick={()=>{
								onChangeInput({
									target : {
										name : "emotionId",
										value : item.emotionId,
									},
								})
							}}
							key={item.emotionId}
							// isSelected란? 아이템의 emotionId가 위에 기재한 emotionId와 같을 경우 true 반환하는 props
							isSelected={item.emotionId === input.emotionId}
							{...item}
						/>)}
				</div>
			</section>
			<section className={"content_section"}>
				<h4>오늘의 일기</h4>
				<textarea 
					name={"content"}
					value={input.content}
					onChange={onChangeInput} 
					placeholder={"오늘은 어땠나요?"}
				/>
			</section>
			<section className={"button_section"}>
				<Button onClick={()=>nav(-1)} text="취소하기" />
				<Button onClick={onClickSubmitButton} text="작성완료" type={"POSITIVE"} />
			</section>
		</div>
	)
}

export default Editor;