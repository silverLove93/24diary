// date객체를 yyyy-mm-dd 형식으로 변환해주는 함수
export const getStringedDate = (targetDate)=>{
	let year = targetDate.getFullYear();
	let month = targetDate.getMonth() + 1;
	let date = targetDate.getDate();
	
	// month와 date가 두자리가 되지 못할때 앞에 0을 붙여주기
	if(month < 10) {
		month = `0${month}`;
	}
	if(date < 10) {
		date = `0${date}`;
	}
	return `${year}-${month}-${date}`;
}