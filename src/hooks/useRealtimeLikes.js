import { supabase } from "../supabaseClient";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useRealtimeLikes() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("likes-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "contenidos",
        },
        () => {
          queryClient.invalidateQueries(["peliculas"]);
          queryClient.invalidateQueries(["series"]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);
}
