import { createClient } from "@base44/sdk";
import { appParams } from "@/lib/app-params";

const { appId, token, functionsVersion } = appParams;

export function getBase44ServerClient() {
  return createClient({
    appId,
    token: token || undefined,
    functionsVersion: functionsVersion || undefined,
    requiresAuth: false,
  });
}
