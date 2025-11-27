import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function useSeries(page = 1, pageSize = 6) {
    const queryClient = useQueryClient();

    const seriesQuery = useQuery({
        queryKey: ["series", page],

        queryFn: async () => {
            //consulta a la tabla contenidos para obtener todas las series ordenadas por cantidad de likes en forma descendente
            const { data: top } = await supabase
                .from("contenidos")
                .select("*")
                .eq("tipo", "serie")
                .order("likes", { ascending: false })
                .limit(6);

            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;


            const { data: paginadas } = await supabase
                .from("contenidos")
                .select("*")
                .eq("tipo", "serie")
                .order("likes", { ascending: false })
                .range(start + 6, end + 6);

            return { top, paginadas };
        },
    });

    const likeMutation = useMutation({
        mutationFn: async ({ id, newLikes }) => {
            await supabase
                .from("contenidos")
                .update({ likes: newLikes })
                .eq("id", id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["series"]);
        },
    });

    return { seriesQuery, likeMutation };
}