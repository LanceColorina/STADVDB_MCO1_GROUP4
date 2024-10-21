import {createConnection} from '@/utils/db'
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req: NextRequest){
    try {
        const url = new URL(req.url);
        const db = await createConnection();

        const windows = url.searchParams.get('windows');
        const mac = url.searchParams.get('mac');
        const linux = url.searchParams.get('linux');
        const minPositiveReviews = url.searchParams.get('total_positive_reviews');
        const minNegativeReviews = url.searchParams.get('total_negative_reviews'); 

        const sql = `SELECT p.windows, p.mac, p.linux, 
                        SUM(f.positive) AS total_positive_reviews, 
                        SUM(f.negative) AS total_negative_reviews
                    FROM feedbacks f
                    JOIN games g ON f.feedback_id = g.feedback_id
                    JOIN platforms p ON g.platform_id = p.platform_id
                    GROUP BY p.windows, p.mac, p.linux;
                    `;
        const [games] = await db.query(sql, [
            windows, windows,
            mac, mac,
            linux, linux,
            minPositiveReviews,
            minNegativeReviews
        ]);
        return NextResponse.json(games);

    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}