import {Request, Response} from 'express'
import stytch from 'stytch'

export async function stytchAuth(req: Request, res: Response) {

    const token = req.query.token as string

    const client = new stytch.Client({
        project_id: process.env.STYTCH_ID ?? '',
        secret: process.env.STYTCH_SECRET ?? ''
    });

    const params = {
      token,
      session_duration_minutes: 60,
    };

    const something = await client.magicLinks.authenticate(params)
    console.log(something)
    res.send()

}
