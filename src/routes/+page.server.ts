// src/routes/+page.server.ts
import { supabase } from '$lib/supabaseClient.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        // Query the Supabase database
        const { data, error } = await supabase
            .from('matrix')
            .select(`
                transferStatus,
                feederCourses(
                    courseName,
                    courseCode,
                    feederid:feederInstitution!feederId (
                        schoolName
                    )
                ),
                ubCourses(
                    courseName,
                    courseCode
                )
            `);

        if (error) throw error;

        console.log('Raw data from Supabase:', JSON.stringify(data, null, 2)); // Debugging: Log the raw data

        // Return the raw data directly
        return {
            rawData: data
        };
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging: Log any errors
        return {
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            rawData: []
        };
    }
};