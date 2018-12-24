console.log('main code progress...');
getUser(1, (user)=>{
    getRepos(user.gitHubID,(repos)=>{
        console.log(repos);
        getCommits(repos,(commits)=>{
            console.log(commits);
        })
    });
}) 
//console.log(user);
console.log('main code progress....');

function getUser(id,callback){
    const users = [
        {id:1, gitHubID: ' neo'},
        {id:2, gitHubID: ' john'}
    ]
    setTimeout( () => {
        console.log('Reading data');
        const user = users.find( user => user.id === id);
        //준비 완료
        callback(user);
    },2000)        
}

function getRepos(userID, callback){
    console.log(`Finding [${userID}]'s all github repo...`);
    setTimeout(() => {
        callback(['til','es6','express-demo']);
    }, 1500);
}

function getCommits (repo,callback){
    console.log(`getting all commits in [${repo}]`);
    setTimeout(() => {
        callback(['init repo','finish']);
    }, 2000);
}