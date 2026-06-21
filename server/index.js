import express from 'express';import cors from 'cors';
const app=express();app.use(cors());app.use(express.json());
const db={users:[],bodyLogs:[],workouts:[]};
app.get('/api/health',(_,res)=>res.json({status:'ok',database:'sqlite-ready',future:['mysql','postgresql']}));
app.get('/api/routines',(_,res)=>res.json({message:'Routines are served by frontend seed data and can move to DB later.'}));
app.post('/api/users',(req,res)=>{db.users.push(req.body);res.status(201).json(req.body)});
app.post('/api/workouts',(req,res)=>{db.workouts.push(req.body);res.status(201).json(req.body)});
app.listen(process.env.PORT||3000,()=>console.log('FitTrainer API running'));
