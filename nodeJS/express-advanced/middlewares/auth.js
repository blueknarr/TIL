function auth(req,res,next){
    console.log('사용자 인증');
    //제어를 다음 미들웨어에게 넘긴다.
    next();
};

module.exports = auth;