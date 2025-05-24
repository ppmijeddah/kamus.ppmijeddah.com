export const env = {
  baseUrl: getBaseUrl(),
  isLocal: isLocal(),
  isDeployed: isDeployed(),
};

function getBaseUrl() {
  if (isLocal()) {
    return "http://localhost:3000";
  }

  return process.env.NEXT_PUBLIC_API_URL as string;
}

function isLocal() {
  return (
    process.env.NEXT_PUBLIC_IS_DEPLOYED === "false" ||
    !process.env.NEXT_PUBLIC_IS_DEPLOYED
  );
}

function isDeployed() {
  return process.env.NEXT_PUBLIC_IS_DEPLOYED === "true";
}
