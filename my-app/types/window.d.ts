// FingerprintJS types
interface Window {
  FingerprintJS: {
    load(): Promise<{
      get(): Promise<{
        visitorId: string;
      }>;
    }>;
  };
}

