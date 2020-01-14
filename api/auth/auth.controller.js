import Joi from 'joi';//자바스크립트를 검증하고 스키마를 모델링할 수 있는 라이브러리
import crypto from 'crypto';//해싱함수를 구현하게 해주는 라이브러리
import { user } from '../../models';

import dotenv from 'dotenv';
dotenv.config();

export const Register = async (ctx) => {
    const Request = Joi.object().keys({
        user_id : Joi.string().alphanum().min(5).max(20).required(),
        password : Joi.string().min(8).max(30).required(),
        name : Joi.string().min(2).max(20).required(),
        nickname : Joi.string().required()
    });
    
    const result = Joi.validate(ctx.request.body, Request);
    
    if(result.error) {
        console.log("Register - Joi 형식 에러")
        ctx.status = 400;
        ctx.body = {
            "error" : "001"
        }
        return;
    }
    
    //name 중복체크
    const exist = await user.findOne({
        where: {
            name : ctx.request.body.name
        }
    });

    if(exist != null){
        console.log(`존재하는 아이디입니다. / 입력된 아이디 : ${ctx.request.body.name}`);

        ctx.status = 400;
        ctx.body = {
            "error" : "002"
        }
        return;
    }

    const name = ctx.request.body.name;

    const password = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    /*
    password를 해시함수로 암호화
    라이브러리:crypto
    crypto.cretaHmac('sha256/sha512',암호화 key).update(암호화할 변수,대상).digest('hex/base64/latin1...')
    해시함수만으로는 레인보우테이블(해킹) 때문에 안전하게 암호화하기 힘듬 
    so, 암호화된 비밀번호에 salt라는 소금을 뿌려 랜덤 문자열로 변환해서 db에 저장
    */
    
    //데이터베이스에 값을 저장
    await user.create({
        "user_id" : user_id,
        "password" : password,
        "name" : ctx.request.body.name,
        "nickname" : ctx.request.body.nickname
    });

    console.log(`Register - 새로운 회원이 저장되었습니다. / 아이디 : ${id}`);
    
    ctx.status = 200;
    ctx.body = {
        "name" : ctx.request.body.name
    };

    
}
//로그인
export const Login = async (ctx) => {
    
    // Joi 라이브러리를 활용해서 형식을 검사하기 위해 객체를 하나 만들어 줌.
    const Request = Joi.object().keys({
        id : Joi.string().alphanum().min(5).max(50).required(),
        password : Joi.string().min(5).max(50).required()
    });
  
    // 넘어온 body의 형식을 검사한다.
    const Result = Joi.validate(ctx.request.body, Request);
 
    // 만약 형식이 불일치한다면, 그 이후 문장도 실행하지 않는다.
    if(Result.error) {
        console.log(`Login - Joi 형식 에러`);
        ctx.status = 400;
        ctx.body = {
            "error" : "001"
        }
        return;
    }

    // 데이터베이스에 해당하는 아이디가 있는지 검사합니다.
    // user라는 테이블에 기입한 아이디가 있는지 확인
    const founded = await user.findOne({
        where: {
            name : ctx.request.body.name
        }
    });
    
    if(founded == null){
        console.log(`Login - 존재하지 않는 계정입니다. / 입력된 아이디 : ${ctx.request.body.name}`);
        ctx.status = 400;
        ctx.body = {
            "error" : "003"
        }
        return;
    }
    
    // db에 있는 password를  input이란 변수로 바꾸어 password가 일치하는지 확인
    const input = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');
    
    if(founded.password != input){
        console.log(`Login - 비밀번호를 틀렸습니다.`);
        ctx.status = 400;
        ctx.body = {
            "error" : "004"
        }
        return;
    }
   
    const payload = {
        user_id : founded.user_id
    };
    
    let token = null;
    token = await generateToken(payload);

    console.log(`Login - 로그인에 성공하였습니다 : 유저 - ${founded.user_id}`);
        
    ctx.status = 200;
    ctx.body = {
        "token" : token
    };
}

//유저 일반 정보 반환
export const CheckUser = async (ctx) => {
    const token = ctx.header.token;

    const decoded = await decodeToken(token);

    console.log(`CheckUserValidate - 접속한 유저 키 : ${decoded.user_id}`);
    
    const founded = await user.findOne({
        where : {
            "user_id" : decoded.user_id
        }
    });

    ctx.status = 200;
    ctx.body = {
        "name" : founded.name,
        "password" : founded.password,
        "nickname" : founded.nickname   
    };
}