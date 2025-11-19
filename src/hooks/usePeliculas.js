import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export function usePeliculas(page = 1, pageSize = 6) {
  const queryClient = useQueryClient();

  const peliculasQuery = useQuery({
    queryKey: ["peliculas", page],
    queryFn: async () => {
      // TOP 6
      const { data: top } = await supabase
        .from("contenidos")
        .select("*")
        .eq("tipo", "pelicula")
        .order("likes", { ascending: false })
        .limit(6);

      // PAGINACIÓN para el resto
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;

      const { data: paginadas } = await supabase
        .from("contenidos")
        .select("*")
        .eq("tipo", "pelicula")
        .order("likes", { ascending: false })
        .range(start + 6, end + 6); // después del top 6

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
      queryClient.invalidateQueries(["peliculas"]);
    },
  });

  return { peliculasQuery, likeMutation };
}
