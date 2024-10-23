import {createConnection} from '@/utils/db'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {

        const url = new URL(req.url);
        const db = await createConnection();

        const date = url.searchParams.get('release_date') || null;
        const minPrice = url.searchParams.get('min_price') || null;
        const maxPrice = url.searchParams.get('max_price') || null;
        const metacritic_score = url.searchParams.get('metacritic_score') || null;
        const windows = url.searchParams.get('windows') || null;
        const mac = url.searchParams.get('mac') || null;
        const linux = url.searchParams.get('linux') || null;

        //Unoptimized
        // const sql = `SELECT g.app_id, gi.game_name, gi.release_date, gi.price, f.metacritic_score, p.windows,p.linux,p.mac,gi.header_image,gi.website 
        //             FROM games g
        //             JOIN games_info gi ON g.game_info_id = gi.game_info_id
        //             JOIN feedbacks f ON g.feedback_id = f.feedback_id
        //             JOIN platforms p ON g.platform_id = p.platform_id
        //             WHERE gi.release_date > ? 
        //             AND gi.price BETWEEN ? AND ? 
        //             AND f.metacritic_score > ?
        //             AND p.windows = ?
        //             AND p.mac = ?
        //             AND p.linux = ?;`;

        // const [games] = await db.query(sql,[date,minPrice,maxPrice,metacritic_score,windows,linux,mac]);

        const sql = `SELECT g.app_id, gi.game_name, gi.release_date, gi.price, f.metacritic_score, p.windows,p.linux,p.mac,gi.header_image, gi.website 
                        FROM games g
                        JOIN (SELECT * FROM games_info WHERE release_date > ? AND price BETWEEN ? AND ?) gi ON g.game_info_id = gi.game_info_id
                        JOIN (SELECT * FROM feedbacks WHERE metacritic_score > ?) f ON g.feedback_id = f.feedback_id
                        JOIN (SELECT * FROM platforms WHERE windows = ? AND mac = ? AND linux = ?) p ON g.platform_id = p.platform_id;`;

        const [games] = await db.query(sql,[date,minPrice,maxPrice,metacritic_score,windows,mac,linux]);
        return NextResponse.json(games);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}