import { DEFAULT_PAGE } from "@/constant/constants";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export default function useAgentsFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
}
