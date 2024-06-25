import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import {useState, useContext} from "react";
import {DiaryStateContext} from "../App";

const getMonthlyData = (povotDate, data)=>{
    // 해당하는 달의 시작일과 시간(0시0분0초)
    const beginTime = new Date(
        povotDate.getFullYear(),
        povotDate.getMonth(),
        1,
        0,
        0,
        0
    ).getTime();
    // 해당 하는 달의 마지막 일(해당하는 달의 이전달의 마지막 날로 설정)
    const endTime = new Date(
        povotDate.getFullYear(),
        povotDate.getMonth() + 1,
        0,
        23,
        59,
        59
    ).getTime();
    return data.filter((item)=>
    beginTime <= item.createdDate && item.createdDate <= endTime)
}

const Home = ()=>{
    const data = useContext(DiaryStateContext);
	const [povotDate, setPovotDate] = useState(new Date());
	const monthlyData = getMonthlyData(povotDate,data)
	const onIncreaseMonth = ()=>{
		setPovotDate(
			new Date(povotDate.getFullYear(), povotDate.getMonth() + 1)
		)
	}
	const onDecreaseMonth = ()=>{
        setPovotDate(
            new Date(povotDate.getFullYear(), povotDate.getMonth() - 1)
        )
	}
    return (
        <div>
            <Header 
				title={`${povotDate.getFullYear()}년 ${povotDate.getMonth() + 1}월`}
				leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
				rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
			/>
			<DiaryList data={monthlyData} />
        </div>
    )
}

export default Home;