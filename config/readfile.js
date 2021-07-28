exports.readfile = function(data){
  let totalList = "<ul>"
  let count = 0;

  while(count<data.length){
    totalList += `<li>이메일 : ${data[count].email}</li>
    <li>이름 : ${data[count].name}</li>
    <li>생일 : ${data[count].birth}</li> 
    <li>전화번호 : ${data[count].number}</li>
    <li>주소 : ${data[count].address}</li>
    <li>직업 : ${data[count].job}</li>
    <li>월급(만) : ${data[count].pay}</li>
    <li>출산여부 : ${data[count].childbirth}</li>
    <li>차종 : ${data[count].car}</li>
    <li>주요 연료 : ${data[count].fuel}</li>
    <li>반려동물 여부 : ${data[count].pet}</li>
    <li>경력단절 여부 : ${data[count].careerbreak}</li>
    ==========================`
    count++;
  }
  totalList+=`</ul>`
  return totalList;
}