export const appParams = {
  appId:
    process.env.NEXT_PUBLIC_BASE44_APP_ID ??
    process.env.BASE44_APP_ID ??
    "6a2d7e54e9b902b7fc9851aa",
  token:
    process.env.BASE44_TOKEN ??
    process.env.NEXT_PUBLIC_BASE44_TOKEN ??
    "",
  functionsVersion:
    process.env.BASE44_FUNCTIONS_VERSION ??
    process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION ??
    "",
};
