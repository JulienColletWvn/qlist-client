import { getStringHash } from "../../utils/hash";

export const getCacheKey = ({
  service,
  args,
}: {
  service: string;
  args: any;
}) => getStringHash(service + JSON.stringify(args));
