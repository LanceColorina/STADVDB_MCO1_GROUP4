import {createConnection} from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(){
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM games";
        const [games] = await db.query(sql);
        return NextResponse.json(games);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}