import { useQuery } from "@tanstack/react-query";
import { fetchMe, UserDto } from "@/api/routes/user";

export const useMe = () =>
    useQuery<UserDto>({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 1000 * 60 *10,
        retry: 1,
    })