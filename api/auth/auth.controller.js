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
    
    //아이디 중복체크
    const exist = await user.findOne({
        where: {
            user_id : ctx.request.body.user_id
        }
    });

    if(exist != null){
        console.log(`Register - 이미 존재하는 아이디입니다. / 입력된 아이디 : ${ctx.request.body.id}`);

        ctx.status = 400;
        ctx.body = {
            "error" : "002"
        }
        return;
    }

    const user_id = ctx.request.body.user_id;

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