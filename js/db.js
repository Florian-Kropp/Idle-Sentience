export class DatabaseService {
    static url = "https://joqciyqboiajvnvlcmep.supabase.co";
    static key = "sb_publishable_D6W9m8xBD24qbqM6zW32gg_P9n5p2GJ";
    static client = supabase.createClient(this.url, this.key);

    static async save(ATableName, AId, AData) {
        try {
            const {error} = await this.client
                .from(ATableName)
                .upsert({ id: AId, content: AData });
            if (error) throw error;
            return {success: true};
        } catch (err) {
            console.error("Speicherfehler: ", err.message);
            return {success: false, error: err.message};
        }
    }

    static async load(ATableName, AId) {
        try {
            const {data, error} = await this.client
                .from(ATableName)
                .select("content")
                .eq("id", AId);
            if (error) throw error;
            return (data && data.length > 0) ? data[0].content : null;
        } catch (err) {
            console.warn("Load-info: No cloud profile found.", err.message);
            return null;
        }     
    }
}