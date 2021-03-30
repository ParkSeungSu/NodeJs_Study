/* 
    객체 배열 == 정보를 정리하는 도구
    배열 = 순서가 있는
    객체 = 순서가 없는

*/

var members = ['park','seung','su'];
//               0       1      2

for (let index = 0; index < members.length; index++) {
    console.log('array loop',members[index]);
    
}
for(var i in members){
    console.log('array loop',i,members[i]);
}

console.log(members[2]);

var roles = {
    programmer:'park',
    designer:'seung',
    manager:'su'
};

console.log(roles);

for (var name in roles){
    console.log('object ==>',name,roles[name]);
}