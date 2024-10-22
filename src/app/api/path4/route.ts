import {createConnection} from '@/utils/db'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {

        const url = new URL(req.url);
        const db = await createConnection();
        
        const developer = url.searchParams.get('developers') || null;
        const publisher = url.searchParams.get('publishers') || null;
        const windows_games = url.searchParams.get('windows_games') || null;
        const mac_games = url.searchParams.get('mac_games') || null;
        const linux_games = url.searchParams.get('linux_games') || null;


        const sql = `SELECT 
                        dp.developers, 
                        dp.publishers,
                        COUNT(CASE WHEN p.windows = 'True' THEN 1 END) AS windows_games,
                        COUNT(CASE WHEN p.mac = 'True' THEN 1 END) AS mac_games,
                        COUNT(CASE WHEN p.linux = 'True' THEN 1 END) AS linux_games
                    FROM developers_publishers dp
                    JOIN games g ON g.dev_pub_id = dp.dev_pub_id
                    JOIN platforms p ON g.platform_id = p.platform_id
                    GROUP BY dp.developers, dp.publishers;
                    `;

        const [games] = await db.query(sql,[developer, publisher, windows_games, mac_games, linux_games]);
        return NextResponse.json(games);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}