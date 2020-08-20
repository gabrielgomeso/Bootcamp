import { Request, Response } from 'express';
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response){
    const user = createUser({    
        email: 'gabriel@gomes', 
        password: '12345',
        techs: [
            'Node', 
            'React',
            {
                title: 'Javascript',
                experience: 100,
            },
            {
                title: 'HTML',
                experience: 100,
            }
        ]
    });

    return response.json({ message: 'Hello World' });
}