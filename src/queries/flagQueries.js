import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";
import { queryKeys } from "./queryKeys";
import {
  checkOrgFlag,
  createOrgFlag,
  deleteOrgFlag,
  getOrgFlags,
  updateOrgFlag,
} from "../services/flag.service";

export function useCheckOrgFlag() {
  return useMutation({
    mutationFn: checkOrgFlag,
  });
}

export function useOrgFlags() {
  return useQuery({
    queryFn: getOrgFlags,
    queryKey: queryKeys.organizations,
  });
}

export function useCreateOrgFlag() {
  return useMutation({
    mutationFn: createOrgFlag,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.orgFlags,
      });
    },
  });
}

export function useUpdateOrgFlag() {
  return useMutation({
    mutationFn: updateOrgFlag,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.orgFlags,
      });
    },
  });
}

export function useDeleteOrgFlag() {
  return useMutation({
    mutationFn: deleteOrgFlag,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.orgFlags,
      });
    },
  });
}
