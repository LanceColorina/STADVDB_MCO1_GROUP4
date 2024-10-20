import {createConnection} from '@/utils/db'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {
        const url = new URL(req.url);
        const db = await createConnection();
        const sql = `SELECT gi.game_name AS game_name, 
                            gi.header_image AS header_image, 
                            gi.website AS website, 
                            gi.release_date AS release_date, 
                            gi.price AS price, 
                            s.average_playtime_forever AS average_playtime_forever, 
                            f.positive AS positive, 
                            (f.positive + f.negative) AS total_feedback,
                            (f.positive / (f.positive + f.negative)) * 100 AS positive_feedback_percentage
                        FROM games g
                        JOIN games_info gi ON g.game_info_id = gi.game_info_id
                        JOIN statistics s ON g.statistic_id = s.statistic_id
                        JOIN feedbacks f ON g.feedback_id = f.feedback_id
                        WHERE (f.positive + f.negative) > 0 
                        AND (gi.release_date >= 'INSERT DATE' OR 'INSERT DATE' IS NULL) -- this is the filter for release date
                        AND (gi.price BETWEEN PRICE AND PRICE OR PRICE IS NULL) -- filter for the price range
                        AND (s.average_playtime_forever > PLAYTIME OR PLAYTIME IS NULL) -- filter for the average playtime
                        ORDER BY s.average_playtime_forever DESC, f.positive DESC
                        LIMIT 10;
                    `;
        const [games] = await db.query(sql);
        return NextResponse.json(games);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}