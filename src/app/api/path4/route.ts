import {createConnection} from '@/utils/db'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {

        const url = new URL(req.url);
        const db = await createConnection();
        
        const windows_games = url.searchParams.get('windows_games') || null;
        const mac_games = url.searchParams.get('mac_games') || null;
        const linux_games = url.searchParams.get('linux_games') || null;


        const sql = `SELECT 
                        YEAR(gi.release_date) AS release_year,
                        COUNT(CASE WHEN p.windows = 'True' THEN g.app_id END) AS total_windows_games,
                        COUNT(CASE WHEN p.mac = 'True' THEN g.app_id END) AS total_mac_games,
                        COUNT(CASE WHEN p.linux = 'True' THEN g.app_id END) AS total_linux_games
                    FROM 
                        games g
                    JOIN 
                        platforms p ON g.platform_id = p.platform_id
                    JOIN 
                        games_info gi ON g.game_info_id = gi.game_info_id
                    GROUP BY 
                        release_year
                    ORDER BY 
                        release_year ASC;
                    `;

        const [games] = await db.query(sql,[windows_games, mac_games, linux_games]);
        return NextResponse.json(games);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}
