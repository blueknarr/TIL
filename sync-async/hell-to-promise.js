const userPromise = getUser(2);
userPromise
.then(user => getRepos(user.gitHubID))
.then(repos => getCommits(repos[0]))
.then(commits => console.log(commits))
.catch(error => console.error(error.message));

/*functions */
function getUser(id,callback){
    console.log('Reading data');
    const users = [
        {id:1, gitHubID: ' neo'},
        {id:2, gitHubID: ' john'}
    ]

    return new Promise((resolve,reject)=>{
        setTimeout(( )=>{
            const user = users.find(user => user.id === id);
            if(user) resolve(user);
            else reject(new Error(`cant not find id:${id}`));
        },2000)
    })    
}

function getRepos(userID){
    console.log(`Finding [${userID}]'s all github repo...`);
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            const i = Math.floor(Math.random() * 100)
            if(i%2===0) resolve(['til','sync']);
            else reject(new Error(`can't find repos with userID: ${userID}`))
        },1500)
    })
}

function getCommits (repo){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`getting all commits in [${repo}]`);
        }, 1500);
    })
}