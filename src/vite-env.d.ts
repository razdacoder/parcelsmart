/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_PLACES_API_KEY: string;
  readonly VITE_DOCUMENT_VALUE: number;
  readonly VITE_DOCUMENT_HSCODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
