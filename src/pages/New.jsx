import Header from "../components/Header"
import Button from "../components/Button"
import {useNavigate} from "react-router-dom"
import {useContext} from "react"
import {DiaryDispacthContext} from "../App"
import Editor from "../components/Editor"

const New = ()=>{
	const {onCreate} = useContext(DiaryDispacthContext);
	const nav = useNavigate(); // nav에 인수로 -1을 줄때 뒤로가기 기능처리
	
	const onSubmit = (input) => {
		onCreate(input.createdDate.getTime(), input.emotionId, input.content);
        nav("/", {replace: true});
	}
	return (
		<div>
			<Header
				className={"Header"} 
				title={"새 일기 쓰기"} 
				leftChild={<Button onClick={()=>nav(-1)} text={"뒤로가기"} />} 
			/>
			<Editor onSubmit={onSubmit} />
		</div>
		
	)
}

export default New;