import { Request, Response } from 'express';
import { userService } from '../services/userService';
import  jwt  from 'jsonwebtoken';
import { UserPayload } from '../../shared/config/types/UserPayload';
const secretKey = process.env.SECRET || "";

export const loginUser = async (req: Request, res: Response) => {

  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    if (!token) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      res.status(200).json({ token });
      const  user = jwt.verify(token, secretKey) as UserPayload;
            res.setHeader('Authorization', token);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.status(200).json({ token, user });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUser = async (_req: Request, res: Response) => {
  try {
    const user = await userService.getAllUser();
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.user_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.addUser(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.modifyUser(parseInt(req.params.user_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await userService.deleteUser(parseInt(req.params.user_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el empleado.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
