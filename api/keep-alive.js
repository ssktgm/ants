export default async function handler(req, res) {
    // 1. CRON_SECRET によるセキュリティ検証 (Vercelで CRON_SECRET が設定されている場合)
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
            return res.status(401).json({ error: 'Unauthorized: Invalid CRON_SECRET token' });
        }
    }

    // 2. Supabase の接続情報（環境変数）を取得
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return res.status(500).json({
            error: 'Missing environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY'
        });
    }

    try {
        // 3. Supabase REST API (players テーブル等) への ping リクエスト
        // データベースにアクセスが発生することで、自動サスペンド (Pause) を防止します
        const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/players?select=id&limit=1`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                success: false,
                status: response.status,
                message: 'Supabase request returned non-200 status',
                error: errorText
            });
        }

        const data = await response.json();

        return res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            message: 'Supabase keep-alive ping successful',
            count: Array.isArray(data) ? data.length : 0
        });
    } catch (error) {
        console.error('Keep-alive endpoint error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
}
