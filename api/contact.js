import { createClient } from '@supabase/supabase-client';

// Initialize connection using environment variables (keeps your database passwords hidden)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Insert the data into your Supabase table
        const { data, error } = await supabase
            .from('messages') // Name of your database table
            .insert([{ name, email, message, created_at: new Date() }]);

        if (error) throw error;

        return res.status(200).json({ success: true, message: 'Message saved successfully!' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
