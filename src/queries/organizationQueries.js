import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  getPublicOrganizations,
  createOrganization,
} from "../services/organization.service";
import { queryKeys } from "./queryKeys";

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizations,
    queryFn: getOrganizations,
  });
}

export function usePublicOrganizations() {
  return useQuery({
    queryKey: queryKeys.publicOrganizations,
    queryFn: getPublicOrganizations,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.organizations,
      });
    },
  });
}
