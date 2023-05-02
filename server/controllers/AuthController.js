import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import  config  from "../config.js";

const generateAccessToken = (id, name) => {
  const payload = {
    id,
    name
  }
  return jwt.sign(payload, config.secret,{expiresIn: "24h"})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({ message:"Ошибка при регистрации ", errors })
      }
      const { name, password } = req.body
      const candidate = await User.findOne({name})
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким Ником уже существует" })
      }
      const hashPassword = bcrypt.hashSync(password,7)
      const friends = []
      const moneysOperations = []
      const moneys = {'EUR': 1000,
                      'RUB': 1000,
                      'USD': 1000,
                      'JPY': 1000 }
      const user = new User({ name, password:hashPassword, friends, moneys, moneysOperations })
      await user.save()
      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Registration Error"});
    } 
  }
  async login(req, res) {
    try {
      const { name, password } = req.body
      const user = await User.findOne({name})
      if (!user) {
        return res.status(400).json({message:`Пользователь ${name} не найден `})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Введен неверный пароль'})
      }
      const token = generateAccessToken(user._id, user.name)
      return res.json({
        id:user._id,
        name:user.name,
        moneys:user.moneys,
        friends: user.friends,
        token})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Login Error"});
    }
  }
  async getAllUsers(req,res) {
    try{
      const Users = await User.find()
      return res.json(Users.map((item) => { 
        return {id:item._id, name: item.name, moneys: item.moneys }
      }));
    } catch (e){
      res.status(400).json({message: "Login Error"});
    }
  }

  async sendMoneys(req, res) {
    try{
      const user = await User.findById(req.body.sendId)
      const friend = await User.findById(req.body.getId)
      user.moneys[req.body.value] = user.moneys[req.body.value] - req.body.cost
      user.moneysOperations.push({
        type: 'send', 
        sendName: req.body.sendName,
        sendId: req.body.sendId,
        getName: req.body.getName,
        getid: req.body.getId,
        cost: req.body.cost,
        value: req.body.value
      })
      friend.moneys[req.body.value] = friend.moneys[req.body.value] + req.body.cost
      friend.moneysOperations.push({
        type: 'get', 
        sendName: req.body.sendName,
        sendId: req.body.sendId,
        getName: req.body.getName,
        getid: req.body.getId,
        cost: req.body.cost,
        value: req.body.value
      })

      await User.findByIdAndUpdate(user._id,user,{new:true})
      await User.findByIdAndUpdate(friend._id,friend,{new:true})

      const Users = await User.find()

      return res.json(Users.filter((item) => {
        if (user.friends.find((name) => name === item.name)) {
          return item
        }
      }))

    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getOpertionsHistory(req,res) {
    try{
      const user = await User.findById(req.user.id)
      return res.json(user.moneysOperations)
    } catch (e) {
      res.status(500).json(e)
    }
    
  }
}

export default new AuthController();